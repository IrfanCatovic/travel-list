import "./App.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
  { id: 4, description: "Toothpaste", quantity: 5, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🚢 Far away bag 🧳</h1>;
}

function Form() {
  function handleSumbit(e) {
    e.preventDefault(); //ovo je da bismo onemogucili refresovanje stranice sto je po prirodi HTML kada pritisnemo submit button
  }

  return (
    <form className="add-form" onSubmit={handleSumbit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          //array.from je trenutno nebitna radi nesto kao for petlja prvo je duzina, drugo odakle polazi i da je to broj i trece da prag
          //ovo se sve desava u console
          //kada se istampa ta lista sa .Map moramo da prodjemo kroz nju da izlistamo sve brojeve
          //onda se iz konzole stampa na UI i pomocu OPTION vidimo rezultate liste
          //gde su vrednosti num i specifik key je takodje num jer se isti brojevi nece ponavljat

          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..." />
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
          //prvi item je ima komponente, drugi item je prop koji cemo da posaljemo, i treci item u zagradama je objekat koji smo izlistali iz initialItems
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your lsit and you already packed X (X%)</em>
    </footer>
  );
}
