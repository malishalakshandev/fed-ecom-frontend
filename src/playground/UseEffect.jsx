import { useEffect, useState } from "react";

function UseEffect() {

    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    // 🔄 This logs on every re-render (very important!)
    console.log("🔄 Component re-rendered");


    console.log("🔄 Count when re-rendered:", count);

    // ✅ 1️⃣ useEffect with no dependencies: runs on every render
    useEffect(() => {
        console.log("🔁 useEffect with no dependency (runs on every render)");
    });

    // ✅ 2️⃣ useEffect with empty array: runs once on initial render
    useEffect(() => {
        console.log("✅ useEffect with [] (runs once on initial render)");
    },[]);

    // ✅ 3️⃣ useEffect that runs on initial render and again only after when `count` changes
    useEffect(() =>{
        console.log("📈 useEffect with [count] (runs on initial render and again only after when count changes):", count);
    },[count]);

    // ✅ 4️⃣ useEffect with cleanup example (timer) -> runs before component unmount or before re-run same useEffect due to `count` dependency change
    useEffect(() => {
        console.log("🧠 Timer started");

        const timer = setInterval(() => {
            console.log("⏲️ Tick every 2 seconds");
        },2000);

        return () => {
            clearInterval(timer);
            console.log("🧹 Timer cleared on before unmount or dependency change");
        }

    }, [count]);

    // ✅ Separated function to handle increment
    const handleIncrement = () => {
        console.log("👆 Button clicked: incrementing count");
        setCount((prev) => {
            console.log("📦 Previous count:", prev);
            return prev + 1;
        });
    }



    return (
        <div style={{ padding: "2rem" }}>
            <h1>🧪 useEffect Test</h1>

            <div style={{ marginTop: "1rem" }}>
                <h3>Count: {count}</h3>
                <button onClick={handleIncrement}>➕ Increment</button>
            </div>

            <div style={{ marginTop: "1rem" }}>
                <input 
                    placeholder="Type something"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <p>Text: {text}</p>
            </div>
        </div>
    );


}

export default UseEffect;