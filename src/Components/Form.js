import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSumbit(e) {
    e.preventDefault(); //ovo je da bismo onemogucili refresovanje stranice sto je po prirodi HTML kada pritisnemo submit button

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);
    //funckija sluzi za slanje podataka u parent iz child

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
