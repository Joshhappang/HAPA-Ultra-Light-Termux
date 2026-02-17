#!/usr/bin/env python3
import json, glob, time
from datetime import datetime

# ----- ANSI color codes -----
RED = "\033[91m"
YELLOW = "\033[93m"
BLUE = "\033[94m"
RESET = "\033[0m"

ledger_path = "~/HAPA_Public/ledger_sample"

# ----- Parameter Gradual Rollout 0,5 HAPA -----
GRADUAL_STEPS = [
    {"percent": 20, "mine": 0.5, "stake": 0.5, "interval": 600},
    {"percent": 50, "mine": 0.5, "stake": 0.5, "interval": 600},
    {"percent":100, "mine": 0.5, "stake": 0.5, "interval": 300}
]

# ----- Update wallet -----
def update_wallet(wallet_file, amount=0, points=0):
    with open(wallet_file,"r") as f: w=json.load(f)
    w["balance"] += amount
    w["points"] = w.get("points",0) + points
    w["last_reward_time"] = int(time.time())
    with open(wallet_file,"w") as f: json.dump(w,f,indent=4)

# ----- Rate-limit check -----
def can_reward(wallet_file, cooldown=300):
    with open(wallet_file,"r") as f: w=json.load(f)
    return (int(time.time()) - w.get("last_reward_time",0)) >= cooldown

# ----- Mining & Staking gradual -----
def mine_and_stake(step):
    wallets = {
        "mining": f"{ledger_path}/WALLET_C.json",
        "staking": [f"{ledger_path}/WALLET_A.json", f"{ledger_path}/WALLET_B.json"]
    }
    reward_mine = step["mine"]
    reward_stake = step["stake"]
    with open(f"{ledger_path}/distribution.json","r") as f: dist=json.load(f)

    # Mining
    if can_reward(wallets["mining"]):
        if dist["mining_pool"] >= reward_mine:
            dist["mining_pool"] -= reward_mine
            dist["circulating_supply"] += reward_mine
            update_wallet(wallets["mining"],reward_mine)
        elif dist["security_pool"] >= reward_mine:
            dist["security_pool"] -= reward_mine
            dist["circulating_supply"] += reward_mine
            update_wallet(wallets["mining"],reward_mine)
        else:
            update_wallet(wallets["mining"],points=1)

    # Staking
    for w_file in wallets["staking"]:
        if can_reward(w_file):
            if dist["staking_pool"] >= reward_stake:
                dist["staking_pool"] -= reward_stake
                dist["circulating_supply"] += reward_stake
                update_wallet(w_file,reward_stake)
            elif dist["security_pool"] >= reward_stake:
                dist["security_pool"] -= reward_stake
                dist["circulating_supply"] += reward_stake
                update_wallet(w_file,reward_stake)
            else:
                update_wallet(w_file,points=1)

    with open(f"{ledger_path}/distribution.json","w") as f: json.dump(dist,f,indent=4)

# ----- Hitung total HAPA -----
def total_hapa():
    total=0
    for w_file in glob.glob(f"{ledger_path}/WALLET_*.json"):
        with open(w_file,"r") as f: total += json.load(f).get("balance",0)
    return total

# ----- Ambil status pool -----
def get_pools():
    with open(f"{ledger_path}/distribution.json","r") as f: dist=json.load(f)
    return dist['mining_pool'], dist['staking_pool'], dist['security_pool'], total_hapa()

# ----- MAIN LOOP -----
try:
    print("🔄 HAPA Ultra-Light Final + Gradual Rollout Publik 0.5 HAPA + Point Digital")
    print("Tekan Ctrl+C untuk berhenti.\n")
    step_index = 0
    while True:
        step = GRADUAL_STEPS[step_index]
        mine_and_stake(step)
        mining, staking, security, total = get_pools()

        timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        status = f"[{timestamp}] Total Wallets: {total} | Mining Pool: {mining} | Staking Pool: {staking} | Security Pool: {security}"
        print(status)

        # Cek naik ke tahap berikutnya
        if total >= 10000 and step_index < len(GRADUAL_STEPS)-1:
            step_index += 1

        time.sleep(step["interval"])
except KeyboardInterrupt:
    print("\n⏹ Automation dihentikan.")
