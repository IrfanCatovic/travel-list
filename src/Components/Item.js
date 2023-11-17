import { useState } from "react";

export default function Item({ item, onDeleteItem, onToggleItem }) {
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
