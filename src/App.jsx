import { useEffect } from "react";
import Header from "./components/Header.jsx";
import CategoryList from "./components/CategoryList.jsx";
import Hero from "./components/Hero.jsx";
import Benefits from "./components/Benefits.jsx";
import Categories from "./components/Categories.jsx";
import Advantages from "./components/Advantages.jsx";
import About from "./components/About.jsx";
import PageHeader from "./components/PageHeader.jsx";
import Products from "./components/Products.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import ProductPage from "./components/ProductPage.jsx";
import Order from "./components/Order.jsx";
import Footer from "./components/Footer.jsx";
import { getProduct } from "./data.js";
import { scrollToHash, useLocation } from "./router.js";

const HOME_TITLE = "Blue Rigel — Эко брусс, цутгалтын хавтан";

const TITLES = {
  "/products": "Бүтээгдэхүүн",
  "/order": "Үнийн санал авах",
};

export default function App() {
  const { path, search, hash } = useLocation();
  const query = new URLSearchParams(search).get("q") ?? "";
  // "/products/std" -> бүтээгдэхүүний дэлгэрэнгүй + үнийн саналын маягт
  const product = path.startsWith("/products/") ? getProduct(path.split("/")[2]) : null;
  const isList = path === "/products" || (path.startsWith("/products/") && !product); // буруу id -> жагсаалт
  const pageTitle = product?.title ?? TITLES[isList ? "/products" : path];

  // Хуудас солигдоход дээш нь гүйлгэнэ, "/#about" мэт холбоос бол тухайн хэсэг рүү очно
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | Blue Rigel` : HOME_TITLE;
    if (hash) requestAnimationFrame(() => scrollToHash(hash));
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [path, search, hash, pageTitle]);

  const isHome = !pageTitle;
  let page;

  if (product) {
    page = (
      <>
        <PageHeader title={product.title} crumbs={[{ label: "Үнийн санал авах", href: "/order" }]} />
        <main className="container">
          {/* key: өөр бүтээгдэхүүн рүү шилжихэд маягтыг шинэчилнэ */}
          <ProductPage key={product.id} product={product} />
        </main>
      </>
    );
  } else if (isList) {
    page = (
      <>
        <PageHeader title={TITLES["/products"]} />
        <main className="container">
          <Products query={query} />
          <ProductDetail />
        </main>
      </>
    );
  } else if (path === "/order") {
    page = (
      <>
        <PageHeader title={TITLES[path]} />
        <main className="container">
          <Order />
        </main>
      </>
    );
  } else {
    page = (
      <main className="container">
        <div className="home-top">
          <CategoryList className="cat-side" />
          <Hero />
        </div>
        <Benefits />
        <Categories />
        <Products
          title="Бүтээгдэхүүн"
          linkHref="/products"
          linkLabel="Бүх бүтээгдэхүүн"
        />
        <Advantages />
        <About />
      </main>
    );
  }

  return (
    <>
      <Header
        path={path}
        query={query}
        home={isHome}
      />
      {page}
      <Footer />
    </>
  );
}
