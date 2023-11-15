import { useState } from "react";
import "./App.css";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
//   { id: 4, description: "Toothpaste", quantity: 5, packed: true },
// ];

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
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleToggleItem(id) {
    setItems(
      (items) =>
        items.map((item) =>
          item.id === id ? { ...item, packed: !item.packed } : item
        ) // ovo ide kroz ceo array item i proverava da li odgovara id unetom id
      // kada nadje taj id koji odgovara onda vraca sve elemente niza i tom itemu menja properti packed u njemu suprotan pa kakav god da je
      //u drugom slucaju vraca sve iteme kakvi su bili
    );
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    //funckija filter prodje kroz ceo array items i proverava da li dobijeni id nije jednak id u nizu
    //ako nije jednak onda moze da nastavi u novi kreirani niz
    //ako je jednak on ne moze u novi niz nego bude izbrisan
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />

      <FlashCards />
    </div>
  );
}

function Logo() {
  return <h1>🚢 Far away bag 🧳</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSumbit(e) {
    e.preventDefault(); //ovo je da bismo onemogucili refresovanje stranice sto je po prirodi HTML kada pritisnemo submit button

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          /> //ovde dobijamo onDeleteItem i saljemo ga dalje u item
          //prvi item je ima komponente, drugi item je prop koji cemo da posaljemo, i treci item u zagradama je objekat koji smo izlistali iz initialItems
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      {/* Pravimo kontrol element 
      prvo mu dajemo vrednost
      drugo onchangehandler da bi se update kada god kliknemo */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
      {/* Ovde dobijamo onDeleteItem */}
    </li>
  );
}

function Stats({ items }) {
  //ovo radimo da ne bismo radili useState 2x bez potrebe
  const numItems = items.length;

  const numPacked = items.filter((item) => item.packed).length;

  const percentage = Math.round((numPacked / numItems) * 100);

  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 📃</em>
      </p>
    );
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You have got everything! Ready to go ✅ "
          : `You have ${numItems} on your list, and you already packed X (${percentage}% ))`}
      </em>
    </footer>
  );
}

//------------------------------------------------------------------------
//------------------------------------------------------------------------

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);

  function handleClick(id) {
    setSelectedId(id !== selectedId ? id : null);
    //ID je novi id koji primamo selectedId je onaj koji je zapamcen uz useState
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

//TWO TYPES OF STATE
//Global:
//Many components might need and it's shared in every component
//-----------------
//Local:
//Need in one or few components - where is defined and child components

//When and where to place state
//first question - will data change at some point
