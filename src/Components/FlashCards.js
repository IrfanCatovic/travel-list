import { useState } from "react";

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

export default function FlashCards() {
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
