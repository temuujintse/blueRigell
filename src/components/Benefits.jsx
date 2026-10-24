import { BENEFITS } from "../data.js";
import { Icon } from "./Icons.jsx";

export default function Benefits() {
  return (
    <div className="benefits">
      {BENEFITS.map((b) => (
        <div className="benefit" key={b.title}>
          <Icon name={b.icon} size={30} strokeWidth={1.6} className="benefit-icon" />
          <div>
            <strong>{b.title}</strong>
            <p>{b.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
