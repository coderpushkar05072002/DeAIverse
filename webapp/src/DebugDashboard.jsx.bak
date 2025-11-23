import { useEffect, useState } from "react";
import client from "./api/client";

function App() {
  const [health, setHealth] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Health check
    client.get("/health")
      .then((res) => {
        console.log("Health:", res.data);
        setHealth(res.data);
      })
      .catch((err) => {
        console.error("Health error:", err);
      });

    // List tasks
    client.get("/tasks")
      .then((res) => {
        console.log("Tasks:", res.data);
        setTasks(res.data);
      })
      .catch((err) => {
        console.error("Tasks error:", err);
      });
  }, []);

  return (
    <div style={{ padding: "1.5rem", fontFamily: "sans-serif" }}>
      <h1>DeAI-verse Dashboard</h1>

      <section style={{ marginTop: "1rem" }}>
        <h2>Backend / Blockchain Health</h2>
        <pre>{JSON.stringify(health, null, 2)}</pre>
      </section>

      <section style={{ marginTop: "1rem" }}>
        <h2>Tasks</h2>
        <pre>{JSON.stringify(tasks, null, 2)}</pre>
      </section>
    </div>
  );
}

export default App;
