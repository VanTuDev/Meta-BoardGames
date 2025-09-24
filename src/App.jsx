import Header from "./components/Header";
import Footer from "./components/Footer";
import PromoBanner from "./components/PromoBanner";

import Carousel from "./sections/Carousel";
import Products from "./sections/Products";
import Collections from "./sections/Collections";
import Blog from "./sections/Blog";
import Benefits from "./sections/Benefits";
import MarqueeText from "./sections/MarqueeText";
import HeroParallax from "./sections/HeroParallax";
import ChatWidget from "./components/ChatWidget";

function App() {
  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">
      {/* Banner chạy nền */}
      <PromoBanner />

      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main>
        <Carousel />
        <Products />
        <Collections />
        <Benefits />
        <MarqueeText />
        <HeroParallax />
        <Blog />
      </main>

      {/* Footer */}
      <Footer />

      {/* Chat floating widget */}
      <ChatWidget />
    </div>
  );
}

export default App;
