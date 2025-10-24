@app.get("/tasks/latest")
def task_latest():
tid = market.functions.nextTaskId().call()
if tid == 0:
return jsonify({"ok": False, "error": "No tasks yet"}), 404
t = market.functions.tasks(tid).call()
return jsonify({
"id": t[0],
"consumer": t[1],
"provider": t[2],
"price": str(t[3]),
"status": t[4],
"statusName": ["Created","Accepted","Running","Submitted","Verified","Cancelled"][t[4]],
"datasetCID": t[5],
"resultCID": t[6],
"deadline": t[7],
})

@app.get("/tasks/int:task_id
/status")
def task_status_only(task_id):
st = market.functions.tasks(task_id).call()[4]
name = ["Created","Accepted","Running","Submitted","Verified","Cancelled"][st]
return jsonify({"id": task_id, "status": st, "statusName": name})
