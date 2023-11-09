export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
    </div>
  );
}

function Logo() {
  return <h1>🏝 Far away 💼</h1>;
}

function Form() {
  return (
    <div className="add-form">
      <h3>What do you need for your 😍 trip?</h3>
    </div>
  );
}

function PackingList() {
  return <div className="list">List</div>;
}

function Stats() {
  return (
    <footer>
      <em>💼 You have X items on your lsit and you already packed X (X%)</em>
    </footer>
  );
}
