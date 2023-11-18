import { useState } from "react";
import Bill from "./Bill";
import MyTip from "./MyTip";
import FriendsTip from "./FriendsTip";
import Total from "./Total";

export default function TipCalculate() {
  const [friTip, setFriTip] = useState(null);
  const [bill, setBill] = useState(null);
  const [myTip, setMyTip] = useState(null);

  function handleFriTips(tip) {
    setFriTip(tip);
  }

  function handleBill(bill) {
    setBill(bill);
  }

  function handleMyTip(tip) {
    setMyTip(tip);
  }

  function handleReset() {
    setMyTip("");
    setBill(0);
    setFriTip(0);
  }
  return (
    <div>
      <Bill onHandleBill={handleBill} bill={bill} />
      <MyTip onHandleMyTip={handleMyTip} myTip={myTip} />
      <FriendsTip onFriTips={handleFriTips} friTip={friTip} />
      <Total friTip={friTip} bill={bill} myTip={myTip} onReset={handleReset} />
    </div>
  );
}
