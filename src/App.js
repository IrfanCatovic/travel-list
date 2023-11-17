import { useState } from "react";
import "./App.css";
import Logo from "./Components/logo";
import Form from "./Components/Form";
import Stats from "./Components/Stats";
import PackingList from "./Components/PackingList";

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

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  }

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
      <Form
        onAddItems={handleAddItems}
        //ovde saljemo kao prop u form funkciju handleaddItems
      />

      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList} // ovu funkciju smo morali da posaljemo jer se ne nalazi u komponenti nego je iznad svega
        //morala je da bude iznad svega jer smo menjali iteme koji se nalaze u globalnom appu

        //Lift state up
        //prvo moramo da imamo item u zajednicki folder
        //saljemo items kao prop u packing list
      />
      <Stats items={items} />

      <FlashCards />
    </div>
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
