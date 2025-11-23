import PromoBanner from "./components/PromoBanner.jsx";
import Header from "./components/Header.jsx";
import Carousel from "./sections/Carousel.jsx";
import Products from "./sections/Products.jsx";
import Collections from "./sections/Collections.jsx";
import Benefits from "./sections/Benefits.jsx";
import MarqueeText from "./sections/MarqueeText.jsx";
import HeroParallax from "./sections/HeroParallax.jsx";
import Blog from "./sections/Blog.jsx";
import Footer from "./components/Footer.jsx";
import ChatWidget from "./components/ChatWidget.jsx";

function App() {
  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">
      <PromoBanner />
      <Header />

      <main>
        <Carousel />
        <Products />
        <div className="p-0">
          <Collections />
        </div>
        <Benefits />
        <MarqueeText />
        <HeroParallax />
        <Blog />
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;
