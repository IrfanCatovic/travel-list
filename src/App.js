import { useState } from "react";
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
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSumbit(e) {
    e.preventDefault(); //ovo je da bismo onemogucili refresovanje stranice sto je po prirodi HTML kada pritisnemo submit button

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSumbit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
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
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        //ovo on change radimo kao treci korak da bi description menjao svoju vrednost, da bi imao gde da je pamti
        //ako to ne bismo uradili onda bi samo pisali u polje description i kada pritisnemo enter nigde se ne zapamti ali se polje isprazni
        //ovo e sto primamo je event, a u ovom slucaju je onChange i dobijamo objekat, a iz tog objekta vadimo sta nam treba
        //u ovom slucaju e.target.value
      />
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
