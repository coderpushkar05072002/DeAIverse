from flask import Flask, jsonify, request
from flask_cors import CORS
from web3 import Web3
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(override=True)

app = Flask(__name__)
CORS(app)

# Load RPC
RPC_URL = os.getenv("RPC_URL", "http://127.0.0.1:8545")
print(f"Using RPC_URL: {RPC_URL}")

# Web3 init
w3 = Web3(Web3.HTTPProvider(RPC_URL))

# Contract addresses (for Sepolia)
TOKEN_ADDR = os.getenv("TOKEN_ADDRESS", "")
MARKET_ADDR = os.getenv("MARKET_ADDRESS", "")
SBT_ADDR = os.getenv("SBT_ADDRESS", "")

# -------------------------
# HEALTH CHECK
# -------------------------
@app.route("/health")
def health():
    ok = w3.is_connected()

    try:
        accounts = w3.eth.accounts if ok else []
        coinbase = accounts[0] if len(accounts) > 0 else None
    except Exception:
        coinbase = None

    return jsonify({
        "ok": ok,
        "chainId": w3.eth.chain_id if ok else None,
        "coinbase": coinbase,
    })


# -------------------------
# MOCK TASKS (UI DEMO)
# -------------------------
tasks = [
    {
        "id": 1,
        "consumer": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "provider": "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
        "price": "1000000000000000000",
        "status": "Verified",
        "dataset": "ipfs://dataset-abc",
        "result": "ipfs://result-xyz",
    },
    {
        "id": 2,
        "consumer": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "provider": "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
        "price": "1000000000000000000",
        "status": "Verified",
        "dataset": "ipfs://dataset-abc",
        "result": "ipfs://result-xyz",
    }
]


@app.route("/tasks", methods=["GET"])
def list_tasks():
    return jsonify(tasks)


@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json(force=True)
    new_task = {
        "id": len(tasks) + 1,
        "consumer": data.get("consumer", ""),
        "provider": data.get("provider", ""),
        "price": data.get("price", "0"),
        "status": "Pending",
        "dataset": data.get("dataset", ""),
        "result": "",
    }
    tasks.append(new_task)
    return jsonify({"ok": True, "task": new_task})


@app.route("/tasks/<int:task_id>/verify", methods=["POST"])
def verify_task(task_id):
    for t in tasks:
        if t["id"] == task_id:
            t["status"] = "Verified"
            return jsonify({"ok": True, "task": t})
    return jsonify({"ok": False, "error": "Task not found"}), 404


# -------------------------
# CONTRACT ABI TEST
# -------------------------
from abi import MARKET_ABI

@app.route("/test/market", methods=["GET"])
def test_market():
    if not w3.is_connected():
        return jsonify({"ok": False, "error": "Web3 not connected"}), 500

    try:
        market = w3.eth.contract(address=MARKET_ADDR, abi=MARKET_ABI)
        total = market.functions.nextTaskId().call()
        return jsonify({"ok": True, "market": MARKET_ADDR, "nextTaskId": int(total)})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


# -------------------------
# REMOVE CSP + PERMISSIVE CORS
# -------------------------
@app.after_request
def remove_csp_and_allow_cors(response):
    try:
        if 'Content-Security-Policy' in response.headers:
            del response.headers['Content-Security-Policy']
    except Exception:
        pass

    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    return response


# -------------------------
# MAIN
# -------------------------
if __name__ == '__main__':
    print("🚀 Backend running on http://127.0.0.1:5001")
    app.run(host="127.0.0.1", port=5001, debug=True)

