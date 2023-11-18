export default function Total({ bill, friTip, myTip, onReset }) {
  return (
    <div>
      {bill > 0 ? (
        <div>
          {" "}
          <span>{`Bill = ${bill + (bill / 200) * (friTip + myTip)}$ `}</span>
          <p>
            <button onClick={onReset}>Reset</button>
          </p>{" "}
        </div>
      ) : null}
    </div>
  );
}
