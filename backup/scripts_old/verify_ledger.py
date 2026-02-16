import json
import hashlib

def hash_block(block):
    block_copy = block.copy()
    block_copy.pop("hash", None)
    block_string = json.dumps(block_copy, sort_keys=True)
    return hashlib.sha256(block_string.encode()).hexdigest()

with open('../ledger_sample/ledger_sample.json', 'r') as f:
    ledger = json.load(f)

print("Jumlah block:", len(ledger))

valid = True

for i in range(1, len(ledger)):
    prev_hash = ledger[i-1]['hash']

    if ledger[i]['previous_hash'] != prev_hash:
        print(f"Block {ledger[i]['id']} invalid! Previous hash mismatch.")
        valid = False

    recalculated_hash = hash_block(ledger[i])
    if ledger[i]['hash'] != recalculated_hash:
        print(f"Block {ledger[i]['id']} invalid! Hash tidak sesuai data.")
        print("Hash file     :", ledger[i]['hash'])
        print("Hash hitung   :", recalculated_hash)
        valid = False

if valid:
    print("Ledger valid!")
else:
    print("Ledger bermasalah!")
