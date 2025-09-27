import { useState } from "react";
import "./App.css";
import Logo from "./Components/logo";
import Form from "./Components/Form";
import Stats from "./Components/Stats";
import PackingList from "./Components/PackingList";
import FlashCards from "./Components/FlashCards";
import Accordion from "./Components/Accordion";
import TipCalculate from "./Components/TipCalculate";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
//   { id: 4, description: "Toothpaste", quantity: 5, packed: true },
// ];

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
        onClearList={handleClearList}
        // ovu funkciju smo morali da posaljemo jer se ne nalazi u komponenti nego je iznad svega
        //morala je da bude iznad svega jer smo menjali iteme koji se nalaze u globalnom appu

        //lift state up
        //salje se state u najblizi parent, pa se prosledi state u sve komponente koje ce da koriste
        //ali nece da je menjaju samo im treba za rad
        //i funkciju onClearList={handleClearList} saljemo u tu jednu komponentu koja moze da menja state
      />
      <Stats items={items} />

      {/* <FlashCards /> */}

      {/* <Accordion data={faqs} /> */}

      {/* <TipCalculate /> */}
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
