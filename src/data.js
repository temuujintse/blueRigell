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

// Нүүрний слайдууд — зураг бүр өөрийн гарчиг, тексттэй
export const HERO_SLIDES = [
  {
    image: heroBg1,
    tag: "Цутгалтын хавтан",
    title: "Дахин боловсруулсан",
    accent: "мод, ган мэт бат бэх",
    text: "Хуучин модон хаягдлыг полимер бүрхүүлтэй хослуулсан Эко брусс — байгаль орчинд ээлтэй.",
    cta: { label: "Бүтээгдэхүүн үзэх", href: "/products" },
  },
  {
    image: heroBg2,
    tag: "Эко брусс",
    title: "100–150 удаа",
    accent: "дахин ашиглагдана",
    text: "Ус шингээдэггүй, зэвэрдэггүй, засвар үйлчилгээ шаардахгүй — зардлаа хэмнээрэй.",
    cta: { label: "Үнийн санал авах", href: "/order" },
  },
];

export const BENEFITS = [
  { icon: "shield", title: "Чанартай бараа", text: "Албан ёсны хувиарлагч" },
  { icon: "recycle", title: "100–150 удаа", text: "Дахин ашиглагдана" },
  { icon: "percent", title: "Зардал хэмнэнэ", text: "Уламжлалт модноос ~30% хямд" },
  { icon: "headset", title: "Мэргэжлийн зөвлөгөө", text: "Туршлагатай баг" },
];

// image: тухайн ангиллын жинхэнэ зураг байвал энд оруулна (байхгүй бол icon харагдана)
export const CATEGORIES = [
  { title: "Барилга, сууц", icon: "building", href: "/products" },
  { title: "Гүүр, зам", icon: "bridge", href: "/products" },
  { title: "Худаг, шугам", icon: "pipe", href: "/products" },
  { title: "Усны байгууламж", icon: "water", href: "/products" },
  { title: "Тавцан, тавиур", icon: "layers", href: "/products" },
  { title: "Захиалгын хэмжээ", icon: "ruler", href: "/products/custom" },
];

// Захиалгын (үнийн саналын) маягтын талбарууд — бүтээгдэхүүн бүр өөрийн "options"-той.
// type: "select" | "number" | "size" (урт×өргөн×зузаан) | "check"
const QTY = { name: "qty", label: "Тоо ширхэг", type: "number", unit: "ширхэг", presets: [100, 300, 500, 1000], required: true };
const PURPOSE = {
  name: "purpose",
  label: "Ашиглах зориулалт",
  type: "select",
  choices: ["Барилга, сууц", "Гүүр, зам", "Худаг, шугам", "Усны байгууламж", "Тавцан, тавиур", "Бусад"],
};

export const PRODUCTS = [
  {
    id: "std",
    title: "Эко брусс — стандарт хэмжээ",
    desc: "300 × 5 × 7 см · барилгын түгээмэл хэрэглээнд бэлэн хэмжээ",
    longDesc:
      "Барилгын талбайн хуучин модон хаягдлыг цөм болгож, гадна талыг өндөр молекультай полимер материалаар бүрхсэн Эко брусс. 300 × 5 × 7 см стандарт хэмжээтэй, 100–150 удаа дахин ашиглагдана.",
    price: "Ханшийг лавлана уу",
    options: [
      { name: "size", label: "Хэмжээ", type: "select", choices: ["300 × 5 × 7 см (стандарт)"] },
      QTY,
      PURPOSE,
    ],
  },
  {
    id: "custom",
    title: "Эко брусс — захиалгын хэмжээгээр",
    desc: "Таны төслийн шаардлагаар тусгай хэмжээгээр үйлдвэрлэнэ",
    longDesc:
      "Төслийн шаардлагад тохируулан урт, хөндлөн огтлолын хэмжээг захиалгаар үйлдвэрлэнэ. Хэмжээгээ оруулаад хүсэлт илгээвэл бид боломжит хувилбар, үнийн саналыг эргэн мэдэгдэнэ.",
    price: "Ханшийг лавлана уу",
    options: [
      { name: "size", label: "Хэмжээ (см)", type: "size", required: true },
      QTY,
      PURPOSE,
    ],
  },
  {
    id: "accessories",
    title: "Дагалдах хэрэгсэл",
    desc: "Холбогч, бэхэлгээ зэрэг дагалдах хэрэгслийн талаар лавлана уу",
    longDesc: "Эко бруссыг угсрахад шаардлагатай холбогч, бэхэлгээ зэрэг дагалдах хэрэгслийг захиалгаар нийлүүлнэ.",
    price: "Захиалгаар",
    options: [
      { name: "kind", label: "Хэрэгслийн төрөл", type: "select", choices: ["Холбогч", "Бэхэлгээ", "Бусад"] },
      { ...QTY, presets: [50, 100, 500] },
    ],
  },
  {
    id: "wholesale",
    title: "Бөөний захиалга",
    desc: "Их хэмжээний захиалгад тусгай нөхцөл санал болгоно",
    longDesc:
      "Барилгын компани, гүйцэтгэгч байгууллагуудад их хэмжээний захиалгаар тусгай үнэ, нийлүүлэлтийн нөхцөл санал болгоно.",
    price: "Тохиролцоно",
    options: [
      { name: "size", label: "Хэмжээ", type: "select", choices: ["300 × 5 × 7 см (стандарт)", "Захиалгын хэмжээ", "Холимог"] },
      { ...QTY, presets: [1000, 3000, 5000, 10000] },
      PURPOSE,
      { name: "contract", label: "Гэрээгээр, хуваан нийлүүлэх", type: "check" },
    ],
  },
].map((p) => ({ ...p, image: productImg, images: [productImg, heroBg1, heroBg2] }));

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);

// Хүсэлтийн цонхны тохиргоо
export const DISTRICTS = ["Сүхбаатар", "Баянзүрх", "Баянгол", "Хан-Уул", "Сонгинохайрхан", "Чингэлтэй", "Налайх", "Багануур", "Багахангай", "Орон нутаг"];

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
  { icon: "building", text: "Орон сууц, инженерийн байгууламж" },
  { icon: "bridge", text: "Гүүр, авто зам" },
  { icon: "pipe", text: "Худаг, инженерийн шугам сүлжээ" },
  { icon: "water", text: "Далан хана, усан сан" },
];

export const NAV_LINKS = [
  { label: "Нүүр", href: "/" },
  { label: "Бүтээгдэхүүн", href: "/products" },
  { label: "Үнийн санал авах", href: "/order" },
  { label: "Бидний тухай", href: "/#about" },
  { label: "Холбоо барих", href: "#contact" },
];
