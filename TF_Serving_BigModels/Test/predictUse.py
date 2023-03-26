import requests
import json

res = requests.post("http://localhost:8601/v1/models/email_model:predict", data=json.dumps({"instances": [
                    "Let's meet for dinner tomorrow", "You are awarded a SiPix Digital Camera! call 09061221061 for landline. Delivery within 28 days. T Cs Box177"]}))

print(res.text)
