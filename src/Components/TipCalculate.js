import { useState } from "react";
import Bill from "./Bill";
import MyTip from "./MyTip";
import FriendsTip from "./FriendsTip";

export default function TipCalculate() {
  return (
    <div>
      <Bill />
      <MyTip />
      <FriendsTip />
    </div>
  );
}
