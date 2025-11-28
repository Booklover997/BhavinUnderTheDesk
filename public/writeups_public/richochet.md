# Richochet
This challenge sets up a radio communication between a robot and a controller. Looking at the code one thing was made very clear. 
```python
            # To avoid the bootstrapping problem, changing the address needs to
            # be an unauthenticated operation
            if msg_type == "set_addr":
                self.address = int(msg["new_addr"]) & 0xFF
                self.send_message({
                    "msg_type": "ack_set_addr",
                    "src": self.address,
                    "dst": msg["src"]
                })
```

> [!Tip]
> In situations like this where you have to deal with multiple different entities I like to use classes to represent each entity.


This seems to be a very clear indication that this is a mitm attack challenge. Making a script to do this works and clearly shows that we are able to intercept communications. 

The second step would be to exchange public keys and do a dh exchange with both the robot and controller. This allows us to decrypt the information, check it, and encrypt it going the other way.

```python
def key_exchange(messages):
    ke = messages
    ke["src"] = middle.port
    ke["dst"] = controller.port
    robot.public_key = bytes.fromhex(ke["key"])
    ke["key"] = monocypher.compute_key_exchange_public_key(middle.dh_key_priv_controller).hex()
    radio.inject_radio_message(ke)
    robot.shared_key = monocypher.key_exchange(middle.dh_key_priv_robot, robot.public_key)

def ack_key_exchange(messages):
    ake = messages
    ake["src"] = middle.port
    ake["dst"] = robot.port
    controller.public_key = bytes.fromhex(ake["key"])
    ake["key"] = monocypher.compute_key_exchange_public_key(middle.dh_key_priv_robot).hex()
    radio.inject_radio_message(ake)
    controller.shared_key = monocypher.key_exchange(middle.dh_key_priv_controller, controller.public_key)
```

Initially I thought that we could just change the command, however, the hmac valdiation checks the nonce, and command. Looking at the code it used blake2b, which is extremely secure and most noteably not vulnerable to any length extension attacks. Even it if was vulnerable the program is hashed mutliple times completely ruling this line of attack. 

Thinking about a solve path we would need to find a way to:
1. Increment the nonce to skip commands we don't want
2. Make sure that the robot and controller stay synchronized
3. That we don't run out of messages

Taking another look through the code we see:

```python 
    async def recv_secure_data(self):
        # Zero length packet as a secure data request
        msg_encrypted = self.hmac_and_encrypt("", self.nonce)
        self.send_message({
            "msg_type": "secure_data_request",
            "src": self.address,
            "dst": ROBOT_ADDRESS,
            "encrypted": msg_encrypted
        })

        response = await self.wait_message("secure_data_response")
        response_decrypted = self.decrypt_and_check_hmac(response["encrypted"], self.nonce)

        if response_decrypted is None:
            self.debug("response failed to validate")
            return

        self.nonce += 1

        return response_decrypted

    async def read_command(self):
        await self.send_secure_data("get_movement")
        await asyncio.sleep(0.2)

        while True:
            resp = await self.recv_secure_data()
            if resp != "":
                return resp
```

One thing that is apparent after seeing this is that we have empty "packets" for every single nonce as that is what is sent in the secure_ack and secure_request. This means that the one thing we can always do is send a valid empty message. Looking at the code above when an empty message is received, it stays in a loop but most importantly calls recv_secure_data which **increments the nonce** from there, the solve is just scripting. 

We generated a list of all "packets" sent by the entities in a normal environment and saved them to a json file. In this format:

```json
[
  {
    "index": 1,
    "direction": "Robot \u2192 Controller",
    "timestamp": 1741797535.714323,
    "msg_type": "secure_data",
    "src": "0x20",
    "dst": "0x10",
    "encrypted": "3fd45535fde010fe46dd5633bd83fc1df69ba0f6902909bda8e1b02cb548dfb7dbcd23f16a50080338991a72a2999189e4cd2621ce15e73d03911e98d0f41504f1b8256b6b966b0544debcc375c7c0e609e95a5f5b809619ed8be4658085fdaef0de213dfbb06652f6fc739c90ef979807c084c61376c73989fd159f483a7451f8dfbeb86ea79dafb3a7604da6ce6635b716222a58a200a9eedda6cc06fa600f3f95204972c36f1260ff4a41c7fbc87053f8fe;c50b874f2c5f8fdbe39b3723ddb3f537;6840ca936a48fd8362bac5af9cb99585110b95dca06b0fc6",
    "data": {
      "message": "get_movement",
      "nonce": 0,
      "hmac": "1518a429592509bde4c1fffd735f5008b8e4f706e45c2b573bb545df09b0b7e1447bda3901ee33ef7167cfcd6b005016d637b135d74081fe01b6b68d8da8d0c9"
    }
  },
  {
    "index": 2,
    "direction": "Controller \u2192 Robot",
    "timestamp": 1741797536.014781,
    "msg_type": "secure_data_ack",
    "src": "0x30",
    "dst": "0x10",
    "encrypted": "0c5df4a25db6db9e1046efb6840bf812998b15fcfa8fa35045a52b16c62cf8932db88a25863f3802ef5cd522e6bf7ad5ae4d606c4a28cad216447706eaadc4f67eb04e579b71991bca7431652c22773b1cd15997c4e38bb58b36e4c3a05f99de025817e7e247f0828abcfc8a97313f631496451aeed03fa40317f17608299795ecfa3a5bf9121e9f3d90ef35d08c35755091a998069a054436088a9c0d6a68a8489a43234b32c2;feeae2bb67393c161977ea39b823e904;735f83f7822294b76d71b9bab4216e4803cd47753ed9cefd",
    "data": {
      "message": "",
      "nonce": 0,
      "hmac": "22e192439f615f06194ec174776e023aa2335af2a9e129cf027d71cd0b24aae36d2aa72f32dd8af15ea5c9eb55b351f781fb0f71715dcb39cde36fcb3b4777a2"
    }
  }
```

Something we didn't account for is that when incrementing the nonce we will get new "packets" we didn't previously get, however, these helped us solve faster as without them it would take >40 nonce's which we did not have previously and would have had to collect. See below for the full solve script.

```python
import radio_interface as radio
import monocypher
import os
import crypto
import json

class Robot:
    def __init__(self):
        self.port = 0x20
        self.public_key = None
        self.shared_key = None
        self.nonce = 0
    def decrypt(self, msg):
        msg = crypto.decrypt(msg, self.shared_key)
        return msg
    def encrypt_to_robot(self, msg):
        msg_encrypted = crypto.encrypt(msg, self.shared_key)
        return msg_encrypted

robot = Robot()
class Middle:
    def __init__(self):
        self.port = 0x10
        self.dh_key_priv_robot = os.urandom(32)
        self.dh_key_priv_controller = os.urandom(32)
        self.dh_key_shared_controller = None
        self.curr_index = 0
        self.next_packet = None
        self.directions = ["east", "south", "east","north", "west","south","east","north","east", "south"]
        self.set_next_packet()
    def next_command(self):
        result = self.directions[self.curr_index]
        return result
    def set_next_packet(self):
        with open("all_packets.json", "r") as f:
            packets = json.load(f)
        for packet in packets:
            if packet["data"]["message"] == self.next_command() and packet["data"]["nonce"] >= robot.nonce:
                self.next_packet = packet
                print("[MIDDLE] next packet set", packet["data"])
                return packet
    def increment_command(self):
        self.curr_index += 1

    #return packet to send instead
    def drop_packet(self, nonce):
        with open("all_packets.json", "r") as f:
            packets = json.load(f)
        for packet in packets:
            if packet["data"]["nonce"] == nonce and packet["data"]["message"] == "":
                return packet["data"]


    

class Controller: 
    def __init__(self):
        self.port = 0x30
        self.directions = ["east", "south", "west", "north"]
        self.curr_index = 0
        self.public_key = None
        self.shared_key = None
        self.nonce = 0
    def controller_command(self):
        self.curr_index += 1
        if self.curr_index >= len(self.directions):
            self.curr_index -= len(self.directions)
    def get_controller_command(self):
        result =  self.directions[self.curr_index]
        self.controller_command()
        return result
    def decrypt(self, msg):
        msg = crypto.decrypt(msg, self.shared_key)
        return msg
    def encrypt_to_controller(self, msg):
        msg_encrypted = crypto.encrypt(msg, self.shared_key)
        return msg_encrypted

controller = Controller()
middle = Middle()


def validate(messages):
    og_validate = messages
    og_validate["src"] = middle.port
    og_validate["dst"] = controller.port
    radio.inject_radio_message(og_validate)

def ack_validate(messages):
    av = messages
    av["src"] = middle.port
    av["dst"] = robot.port
    radio.inject_radio_message(av)

def key_exchange(messages):
    ke = messages
    ke["src"] = middle.port
    ke["dst"] = controller.port
    robot.public_key = bytes.fromhex(ke["key"])
    ke["key"] = monocypher.compute_key_exchange_public_key(middle.dh_key_priv_controller).hex()
    radio.inject_radio_message(ke)
    robot.shared_key = monocypher.key_exchange(middle.dh_key_priv_robot, robot.public_key)

def ack_key_exchange(messages):
    ake = messages
    ake["src"] = middle.port
    ake["dst"] = robot.port
    controller.public_key = bytes.fromhex(ake["key"])
    ake["key"] = monocypher.compute_key_exchange_public_key(middle.dh_key_priv_robot).hex()
    radio.inject_radio_message(ake)
    controller.shared_key = monocypher.key_exchange(middle.dh_key_priv_controller, controller.public_key)
def robot_send_secure_imitate(messages):
    messages["encrypted"] = robot.decrypt(messages["encrypted"])
    print("[ROBOT]", messages["encrypted"])
    messages["encrypted"] = controller.encrypt_to_controller(messages["encrypted"])
    rss = messages
    rss["src"] = middle.port
    rss["dst"] = controller.port
    robot.nonce += 1
    radio.inject_radio_message(rss)


def controller_send_secure_imitate(messages):
    messages["encrypted"] = controller.decrypt(messages["encrypted"])
    messages["encrypted"] = json.loads(messages["encrypted"])
    print("[CONTROLLER]", messages["encrypted"])
    print("[LOGIC] ", middle.next_packet)
    print("[LOGIC]", middle.next_command())
    # drop packets not wanted
    if messages["msg_type"]== "secure_data_response" and controller.get_controller_command() != middle.next_command():
        replace_packet = middle.drop_packet(controller.nonce)
        messages["encrypted"] = replace_packet
        print("[MIDDLE] replaced packet")
    # increment command
    if messages["msg_type"]== "secure_data_response" and middle.next_command() == messages["encrypted"]["message"]:
        middle.increment_command()
        middle.set_next_packet()
    elif messages["msg_type"]== "secure_data_response" and middle.next_packet["data"]["nonce"] == messages["encrypted"]["nonce"]:
        messages["encrypted"] = middle.next_packet["data"]
        middle.increment_command()
        middle.set_next_packet()

    messages["encrypted"] = json.dumps(messages["encrypted"])
    messages["encrypted"] = robot.encrypt_to_robot(messages["encrypted"])
    rss = messages
    rss["src"] =  middle.port
    rss["dst"] = robot.port
    controller.nonce += 1
    radio.inject_radio_message(rss)

mitm_priv_key = os.urandom(32)
shared_secret_robot = None
shared_secret_controller = None



radio.inject_radio_message({"msg_type": "set_addr", "new_addr": 0x30, "src": 0x20, "dst": 0x10})
            # if msg_type == "set_addr":
            #     self.address = int(msg["new_addr"]) & 0xFF
            #     self.send_message({
            #         "msg_type": "ack_set_addr",
            #         "src": self.address,
            #         "dst": msg["src"]
            #     })
print(controller.port)
radio.stop_robot()
radio.receive_radio_messages()
radio.start_robot()
x =""
while x != "q":
    rrm = radio.receive_radio_messages(); # change to actually parse messages
    while len(rrm) == 0:
        rrm = radio.receive_radio_messages()
    messages = {}
    for i in rrm:
        if i["msg_type"] != "debug":
            messages = i
            break
    if messages["msg_type"] == "validate":
        validate(messages)
        continue
    elif messages["msg_type"] == "ack_validate":
        ack_validate(messages)
        continue
    elif messages["msg_type"] == "key_exchange":
        key_exchange(messages)
        continue
    elif messages["msg_type"] == "ack_key_exchange":
        ack_key_exchange(messages)
        continue
    elif messages["msg_type"] == "secure_data" or messages["msg_type"] == "secure_data_request":
        robot_send_secure_imitate(messages)
    elif messages["msg_type"] == "secure_data_ack" or messages["msg_type"] == "secure_data_response":
        controller_send_secure_imitate(messages)
    x = input("Press q to stop the robot")
radio.stop_robot()

```