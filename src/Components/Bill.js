import { useState } from "react";

export default function Bill({ onHandleBill, bill }) {
  return (
    <div>
      <span>
        How much was the bill?
        <input
          type="text"
          placeholder="Bill value"
          value={bill}
          onChange={(e) => onHandleBill(Number(e.target.value))}
        ></input>
      </span>
    </div>
  );
}
