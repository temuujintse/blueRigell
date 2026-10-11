import { USE_CASES } from "../data.js";
import SectionHeader from "./SectionHeader.jsx";

export default function About() {
  return (
    <section className="section" id="about">
      <SectionHeader title="Бидний тухай" />
      <div className="layout layout-about">
        <div>
          <p className="lead">
            Blue Rigel нь Монголын барилгын салбарт зориулсан байгаль орчинд ээлтэй, ногоон
            технологийн барилгын материал нийлүүлэгч компани юм. Бид барилгын талбайн хуучин
            модон хаягдлыг дахин боловсруулж, өндөр даралтат полимер бүрхүүлтэй болгон
            үйлдвэрлэсэн Эко брусс бүтээгдэхүүнийг гэрчилгээтэйгээр Монголд албан ёсны
            хувиарлагчаар нийлүүлдэг.
          </p>
          <p className="lead">
            Уламжлалт модон болон ган хийцийг орлон, цутгалтын ажлын аюулгүй байдал, хугацаа,
            зардлыг эрс сайжруулах зорилготой.
          </p>
        </div>
        <div className="card card-padded" id="projects">
          <h3 className="card-title">Ашиглагдаж буй чиглэлүүд</h3>
          <ul className="use-cases">
            {USE_CASES.map((u) => (
              <li key={u.text}>
                <span aria-hidden="true">{u.icon}</span> {u.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
