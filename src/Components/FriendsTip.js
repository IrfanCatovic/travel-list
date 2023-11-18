export default function FriendsTip() {
  return (
    <div>
      <span>
        How did your friend like the service?
        <select>
          <option value={0}>Dissatisfied (0%)</option>
          <option value={5}>It was okey! (5%)</option>
          <option value={10}>It was okey! (10%)</option>
          <option value={20}>It was okey! (20%)</option>
        </select>
      </span>
    </div>
  );
}
