import { useState } from "react";

export default function FriendsTip({ friTip, onFriTips }) {
  return (
    <div>
      <span>
        How did your friend like the service?
        <select
          value={friTip}
          onChange={(e) => onFriTips(Number(e.target.value))}
        >
          <option value={0}>Dissatisfied (0%)</option>
          <option value={5}>It was okey! (5%)</option>
          <option value={10}>It was okey! (10%)</option>
          <option value={20}>It was okey! (20%)</option>
        </select>
      </span>
    </div>
  );
}
