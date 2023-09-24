import React, { useEffect, useState } from 'react';
import './App.css';
import { parse } from "./parser/AdverityCalculatorParser";

function App() {
    const [text, setText] = useState('')
    const [output, setOutput] = useState('')

    useEffect(() => {
        try {
            const result = text ? parse(text) as unknown as number[] : [0]
            setOutput(result[0].toFixed(2).toString())
        } catch (e: any) {
            setOutput("Syntax error")
        }
    }, [text])

    return (
        <div className="App">
            <textarea rows={5} style={{ fontSize: 20, fontWeight: 'bold', width: 400, padding: 20, outline: 'none' }}
                autoFocus={true}
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <div style={{ background: 'white', fontSize: 20, marginTop: 20, width: 400, padding: 20, color: 'black', textAlign: 'left' }}>
                { output }
            </div>
        </div>
    );
}

export default App;
