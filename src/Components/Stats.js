import { useState } from "react";

export default function Stats({ items }) {
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
