import './App.css';
import Register from './register';
import Login from './login';

function App() {
  return (
    <main className="App"> {/*using main insteed div is semantically correct */} 
      <Register />
    </main>
  );
}

export default App;
