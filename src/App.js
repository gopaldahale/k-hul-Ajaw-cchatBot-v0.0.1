import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const [userQuestion, setUserQuestion] = useState("");
  const [answer, setAnswer] = useState('');
  
  async function generateAnswer(e) {
    e.preventDefault();
    setAnswer('loading...');

    const response = await axios({
      url:`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      method: "POST",
      data: {"contents":[{"parts":[{"text": userQuestion }]}]},
    })

    // console.log(response['data']['candidates'][0]['content']['parts'][0]['text']);
    setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
    
  }
  
  return (
    <div>
      <h1>AI Chatbot</h1>
      <form >
        <div className="flex-block">
          <div className="input-container">
            <textarea
              type="text"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="Type your message..."
              style={{ width: 'calc(100% - 22px)', padding: '10px', resize: 'none' }}
            />

          </div>
          <div className="btn-submit">
            <button type="submit" onClick={generateAnswer}>Send</button>
          </div>

          <pre>{answer}</pre>

        </div>
      </form>
      
    </div>
  );
}

export default App;