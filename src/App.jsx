import Hero from "./components/Hero.jsx";
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

export default function App() {
  const { count, summary, addItem, clear } = useCart();

  const scrollToOrder = () =>
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <Hero cartCount={count} onCartClick={scrollToOrder} />

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

      <Footer />
    </>
  );
}
