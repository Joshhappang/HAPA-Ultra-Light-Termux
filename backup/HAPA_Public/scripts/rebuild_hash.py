import json
import hashlib

def hash_block(block):
    block_copy = block.copy()
    block_copy.pop("hash", None)
    block_string = json.dumps(block_copy, sort_keys=True)
    return hashlib.sha256(block_string.encode()).hexdigest()

with open('../ledger_sample/ledger_sample.json', 'r') as f:
    ledger = json.load(f)

for i in range(len(ledger)):
    if i > 0:
        ledger[i]['previous_hash'] = ledger[i-1]['hash']
    ledger[i]['hash'] = hash_block(ledger[i])

with open('../ledger_sample/ledger_sample.json', 'w') as f:
    json.dump(ledger, f, indent=4)

print("Hash berhasil diperbarui!")
