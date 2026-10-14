import { useEffect } from "react";
import Hero from "./components/Hero.jsx";
import PageHeader from "./components/PageHeader.jsx";
import Benefits from "./components/Benefits.jsx";
import Categories from "./components/Categories.jsx";
import Products from "./components/Products.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Advantages from "./components/Advantages.jsx";
import VideoSection from "./components/VideoSection.jsx";
import About from "./components/About.jsx";
import Order from "./components/Order.jsx";
import Footer from "./components/Footer.jsx";
import { useCart } from "./hooks/useCart.js";
import { navigate, scrollToHash, useLocation } from "./router.js";

const HOME_TITLE = "Blue Rigel — Эко брусс, цутгалтын хавтан";

const TITLES = {
  "/products": "Бүтээгдэхүүн",
  "/order": "Захиалга өгөх",
};

export default function App() {
  const { count, summary, addItem, clear } = useCart();
  const { path, hash } = useLocation();

  const goToOrder = () => navigate("/order");

  // Хуудас солигдоход дээш нь гүйлгэнэ, "/#about" мэт холбоос бол тухайн хэсэг рүү очно
  useEffect(() => {
    document.title = TITLES[path] ? `${TITLES[path]} | Blue Rigel` : HOME_TITLE;
    if (hash) requestAnimationFrame(() => scrollToHash(hash));
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [path, hash]);

  let page;

  if (path === "/products") {
    page = (
      <>
        <PageHeader title={TITLES[path]} cartCount={count} onCartClick={goToOrder} />
        <main>
          <Products onAdd={addItem} />
          <ProductDetail />
        </main>
      </>
    );
  } else if (path === "/order") {
    page = (
      <>
        <PageHeader title={TITLES[path]} cartCount={count} onCartClick={goToOrder} />
        <main>
          <Order cartSummary={summary} onClearCart={clear} />
        </main>
      </>
    );
  } else {
    page = (
      <>
        <Hero cartCount={count} onCartClick={goToOrder} />
        <main id="top">
          <Benefits />
          <Categories />
          <Products onAdd={addItem} />
          <ProductDetail />
          <Advantages />
          <VideoSection />
          <About />
          <Order cartSummary={summary} onClearCart={clear} />
        </main>
      </>
    );
  }

  return (
    <>
      {page}
      <Footer />
    </>
  );
}
