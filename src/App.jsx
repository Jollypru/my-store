import { useState } from "react";
import { IoCart, IoSearch } from "react-icons/io5";
function App() {
  const [cartCount, setCartCount] = useState(0);
  const addToCart = () => {
    setCartCount(cartCount + 1);
  }

  return (
    <div>
      <nav className="flex justify-between items-center p-3 md:px-8 bg-amber-300">
        <h1 className="text-2xl">MyStore</h1>
        <div className="flex items-center gap-3">
          <div className="relative w-60">
            <input type="text" placeholder="What are you looking for?" className="border rounded-lg px-4 py-2 w-full" />
            <IoSearch className="absolute right-3 top-1/2 transform -translate-y-2 text-gray-400 text-xl"></IoSearch>
          </div>
          <button className="text-2xl relative"><IoCart />
            <span className="absolute -top-2 -right-2 bg-[#db7137] text-white text-xs px-1 rounded-full">{cartCount}</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default App
