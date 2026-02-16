import json
import os

# Path ledger
ledger_path = os.path.expanduser("~/HAPA_Public/ledger_sample/ledger_sample.json")

# Baca ledger
with open(ledger_path, "r") as f:
    ledger = json.load(f)

# Hitung total Hapa
total_hapa = 0
for block in ledger:
    total_hapa += block.get("amount", 0)

print(f"Jumlah block: {len(ledger)}")
print(f"Total Hapa: {total_hapa}")
