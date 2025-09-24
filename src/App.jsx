import Header from "./components/Header";
import Footer from "./components/Footer";
import PromoBanner from "./components/PromoBanner";

import Hero from "./sections/Hero";
import Carousel from "./sections/Carousel";
import Products from "./sections/Products";
import Collections from "./sections/Collections";
import Blog from "./sections/Blog";

function App() {
  return (
    <div className="font-sans text-gray-900">
      {/* Banner chạy nền */}
      <PromoBanner />

      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main>
        <Carousel />
        <Products />
        <Collections />
        <Blog />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
