import json
import hashlib
import os

LEDGER_DIR = "ledger_sample"

def load_last_block():
    blocks = [f for f in os.listdir(LEDGER_DIR) if f.startswith("block_")]
    if not blocks:
        return None, 0
    blocks.sort(key=lambda x: int(x.split("_")[1].split(".")[0]))
    last_block_file = os.path.join(LEDGER_DIR, blocks[-1])
    with open(last_block_file, "r") as f:
        data = json.load(f)
    last_id = data['id']
    return data, last_id

def create_block(block_id, data, previous_hash):
    block = {
        "id": block_id,
        "data": data,
        "previous_hash": previous_hash,
    }
    block_str = json.dumps(block, sort_keys=True).encode()
    block_hash = hashlib.sha256(block_str).hexdigest()
    block["hash"] = block_hash
    return block

def save_block(block):
    filename = os.path.join(LEDGER_DIR, f"block_{block['id']}.json")
    with open(filename, "w") as f:
        json.dump(block, f, indent=4)

# --- Main ---
last_block, last_id = load_last_block()
if last_block:
    prev_hash = last_block['hash']
else:
    prev_hash = "0"*64  # genesis block jika ledger kosong
    last_id = 0

# Block 999 (misal mining reward)
block_999 = create_block(last_id + 1, "Mining reward (mining_pool)", prev_hash)
save_block(block_999)

# Block 1000 (misal WALLET_A reward)
block_1000 = create_block(last_id + 2, "WALLET_A reward", block_999['hash'])
save_block(block_1000)

print(f"Blocks {last_id+1} & {last_id+2} berhasil dibuat dan disimpan di {LEDGER_DIR}")
