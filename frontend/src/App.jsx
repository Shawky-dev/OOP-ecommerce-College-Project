import { useEffect, useState } from "react";
function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/data/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>{message}</h1>
      <h1>yo</h1>
    </div>
  );
}

export default App;