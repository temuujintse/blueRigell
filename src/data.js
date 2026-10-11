import heroBg1 from "./assets/hero-bg.jpg";
import heroBg2 from "./assets/hero-bg-2.jpg";
import productImg from "./assets/product-hero.png";

export const COMPANY = {
  name: "Blue Rigel",
  tagline: "Эко брусс, цутгалтын хавтан",
  email: "bluerigel88@gmail.com",
  hours: "Ажиллах цаг 09:00–18:00",
  address: "Улаанбаатар хот, Монгол улс",
  website: "www.bluerigel.mn",
  phones: [
    { number: "75758575", label: "Ерөнхий утас" },
    { number: "88104840", label: "Захиалга" },
    { number: "80552222", label: "Захиалга" },
  ],
};

// "75758575" -> "7575 8575"
export const formatPhone = (n) => n.replace(/(\d{4})(\d{4})/, "$1 $2");

export const HERO_SLIDES = [heroBg1, heroBg2];

export const BENEFITS = [
  { icon: "shield", title: "Чанартай бараа", text: "Албан ёсны хувиарлагч" },
  { icon: "percent", title: "Зардал хэмнэнэ", text: "Уламжлалт модноос ~30% хямд" },
  { icon: "headset", title: "Мэргэжлийн зөвлөгөө", text: "Туршлагатай баг" },
];

export const CATEGORIES = [
  { title: "Барилга, сууц", href: "#projects" },
  { title: "Гүүр, зам", href: "#projects" },
  { title: "Худаг, шугам", href: "#projects" },
  { title: "Усны байгууламж", href: "#projects" },
  { title: "Тавцан, тавиур", href: "#projects" },
  { title: "Захиалгын хэмжээ", href: "#order" },
].map((c) => ({ ...c, image: productImg }));

// type "cart" -> сагсанд нэмэх товч, type "link" -> захиалгын хэсэг рүү холбоос
export const PRODUCTS = [
  {
    id: "std",
    title: "Эко брусс — стандарт хэмжээ",
    cartName: "Эко брусс — стандарт хэмжээ (300×5×7см)",
    desc: "300 × 5 × 7 см · барилгын түгээмэл хэрэглээнд бэлэн хэмжээ",
    price: "Ханшийг лавлана уу",
    type: "cart",
  },
  {
    id: "custom",
    title: "Эко брусс — захиалгын хэмжээгээр",
    cartName: "Эко брусс — захиалгын хэмжээгээр",
    desc: "Таны төслийн шаардлагаар тусгай хэмжээгээр үйлдвэрлэнэ",
    price: "Ханшийг лавлана уу",
    type: "cart",
  },
  {
    id: "accessories",
    title: "Дагалдах хэрэгсэл",
    desc: "Холбогч, бэхэлгээ зэрэг дагалдах хэрэгслийн талаар лавлана уу",
    price: "Захиалгаар",
    type: "link",
    linkLabel: "Асуух →",
  },
  {
    id: "wholesale",
    title: "Бөөний захиалга",
    desc: "Их хэмжээний захиалгад тусгай нөхцөл санал болгоно",
    price: "Тохиролцоно",
    type: "link",
    linkLabel: "Холбогдох →",
  },
].map((p) => ({ ...p, image: productImg }));

export const PRODUCT_IMAGE = productImg;

export const SPECS = [
  ["Гадна давхарга", "Өндөр молекуль полимер бүрхүүл"],
  ["Дотор цөм", "Дахин боловсруулсан модон материал"],
  ["Стандарт хэмжээ", "300 × 5 × 7 см"],
  ["Жин", "2–2.1 кг/метр"],
  ["Дахин ашиглалт", "100–150 удаа"],
  ["Ашиглалтын хугацаа", "3+ жил"],
];

export const COMPARE = {
  columns: ["Эко брусс", "Энгийн мод", "Ган хийц"],
  rows: [
    ["10м унагаах туршилт", "Эвдрэхгүй", "Хугардаг", "Хэлбэр алддаг"],
    ["Ус шингээлт", "Шингээдэггүй", "Хэлбэр алддаг", "Зэвэрдэг"],
    ["Засвар үйлчилгээ", "Шаардлагагүй", "Байнга", "Шаардлагатай"],
    ["Дахин ашиглалт", "100–150 удаа", "20–30 удаа", "50–80 удаа"],
  ],
};

export const USE_CASES = [
  { icon: "🏢", text: "Орон сууц, инженерийн байгууламж" },
  { icon: "🌉", text: "Гүүр, авто зам" },
  { icon: "🔧", text: "Худаг, инженерийн шугам сүлжээ" },
  { icon: "💧", text: "Далан хана, усан сан" },
];

export const NAV_LINKS = [
  { label: "Нүүр", href: "#top" },
  { label: "Бүтээгдэхүүн", href: "#products" },
  { label: "Бидний тухай", href: "#about" },
  { label: "Захиалга өгөх", href: "#order" },
];
