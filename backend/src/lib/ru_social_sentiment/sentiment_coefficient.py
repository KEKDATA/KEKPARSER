from dostoevsky.tokenization import RegexTokenizer
from dostoevsky.models import FastTextSocialNetworkModel

import sys
import json

tokenizer = RegexTokenizer()

model = FastTextSocialNetworkModel(tokenizer=tokenizer)

texts = json.loads(sys.argv[1])

results = model.predict(texts, k=2)

print(results)

sys.stdout.flush()
