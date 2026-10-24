import { COMPANY } from "./data.js";

// Захиалгын дугаар: BR-251024-4821 (огноо + санамсаргүй 4 орон)
export function makeOrderNumber(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  const ymd = `${String(date.getFullYear()).slice(2)}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `BR-${ymd}-${rand}`;
}

// Хүсэлтийн бүтэн текст (имэйлийн бие болон "хуулах" товчинд ашиглана)
export function buildOrderText({ orderNo, product, details, contact }) {
  const lines = [
    `Захиалгын дугаар: ${orderNo}`,
    "",
    "— Захиалагч —",
    `Нэр / Компани: ${contact.name || "-"}`,
    `Утас / Имэйл: ${contact.reach}`,
    `Хүлээн авах: ${contact.delivery === "delivery" ? "Хүргүүлэх" : "Оффисоос авах"}`,
  ];

  if (contact.delivery === "delivery") {
    lines.push(`Дүүрэг: ${contact.district}`, `Хаяг: ${contact.address || "-"}`);
    if (contact.recipientPhone) lines.push(`Хүлээн авагчийн утас: ${contact.recipientPhone}`);
  }

  if (contact.vat) {
    lines.push(
      `e-Barimt: ${contact.vatType === "organization" ? "Байгууллага" : "Хувь хүн"}`,
      `Регистр / ТТД: ${contact.vatId || "-"}`
    );
  }

  lines.push("", "— Захиалгын дэлгэрэнгүй —", `Бүтээгдэхүүн: ${product}`);
  details.forEach(({ label, value }) => lines.push(`${label}: ${value}`));

  return lines.join("\n");
}

export function openOrderEmail(orderNo, product, text) {
  window.location.href =
    `mailto:${COMPANY.email}` +
    `?subject=${encodeURIComponent(`Үнийн санал ${orderNo} — ${product}`)}` +
    `&body=${encodeURIComponent(text)}`;
}
