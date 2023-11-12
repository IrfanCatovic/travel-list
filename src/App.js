import { useState } from "react";
import "./App.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
  { id: 4, description: "Toothpaste", quantity: 5, packed: true },
];

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
      <FlashCards />
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

//------------------------------------------------------------------------
//------------------------------------------------------------------------

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);

  function handleClick(id) {
    setSelectedId(id !== selectedId ? id : null);
    //mi smo sa className proverili da li je id koji je kliknut jednak selektovanom id
    //on kroz loop proverava koji smo kliknuli
    //kada kroz loop nadje koji je kliknut taj ce da pocrveni, ne mogu da crvene dva u isto vreme
    //isto vazi i za pitanje i odgovor u <p>
    //a sa nullish operatorom proveravamo ako id nije jedan novom selektovanom id onda ce da primi taj drugi ID i drugi ce da pocrveni
    //samim tim ce use state da refresuje komponentu i novi div ce da promeni boju
    //ukoliko je id jednak novom selektovanom id onda ce da vrati rezultat null i da vrati sve u prvobitno stanje
  }

  return (
    <div className="flashcards">
      {questions.map((item) => (
        <div
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={item.id === selectedId ? "selected" : ""}
        >
          <p>{item.id === selectedId ? item.answer : item.question}</p>
        </div>
      ))}
    </div>
  );
}
