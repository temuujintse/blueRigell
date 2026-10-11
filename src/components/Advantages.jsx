import { COMPARE } from "../data.js";
import SectionHeader from "./SectionHeader.jsx";

export default function Advantages() {
  return (
    <section className="section" id="advantages">
      <SectionHeader title="Давуу тал" />
      <p className="lead lead-narrow">
        Эко брусс нь материал, ашиглалт, эдийн засгийн үр ашгийн хувьд уламжлалт модон болон ган
        хийцээс тодорхой давуу талтай.
      </p>
      <div className="compare-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th>Үзүүлэлт</th>
              {COMPARE.columns.map((c, i) => (
                <th key={c} className={i === 0 ? "is-ours" : "is-other"}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE.rows.map(([label, ...values]) => (
              <tr key={label}>
                <td className="row-label">{label}</td>
                {values.map((v, i) => (
                  <td key={i} className={i === 0 ? "is-ours" : "is-other"}>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
