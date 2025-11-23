import os, json

# Load ABIs from backend/abis folder (must exist and contain ComputeMarket.json, Token.json, ReputationSBT.json)
BASE = os.path.dirname(__file__)
ABI_FOLDER = os.path.join(BASE, "abis")

def _load(name):
    path = os.path.join(ABI_FOLDER, name)
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f).get("abi", [])
    except Exception:
        return []

# Primary ABIs
MARKET_ABI = _load("ComputeMarket.json")
TOKEN_ABI = _load("Token.json")
SBT_ABI = _load("ReputationSBT.json")
