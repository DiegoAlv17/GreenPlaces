import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";
import About from "./components/About.jsx";
import Education from "./components/Education.jsx";
import Events from "./components/Events.jsx";
import Areas from "./components/Areas.jsx";
import Tips from "./components/Tips.jsx";
import Shop from "./components/Shop.jsx";
import Cart from "./components/Cart.jsx";


export default function App() {
  return (
    <div className="min-h-screen bg-white">
    <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <About />
              <Education />
              <Events />
              <Areas />
              <Tips />
            </main>
          }
        />
        <Route path="/shop" element={
          <Shop />
        } />
        <Route path="/cart" element={
          <Cart />
        } />
      </Routes>
      <Footer />
    </div>
  );
}

