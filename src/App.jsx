import { Rating } from "@smastrom/react-rating";
import { useEffect, useState } from "react";
import { IoCart, IoSearch } from "react-icons/io5";
import '@smastrom/react-rating/style.css'

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);

  const addToCart = () => {
    setCartCount(cartCount + 1);
  }

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div>
      <nav className="sticky top-0 z-50 flex justify-between items-center p-3 md:px-8 bg-amber-300">
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

      {/* Products section */}
      <section className="px-8">
        <h2 className="text-3xl font-semibold my-5">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            products.map(product => (
              <div key={product.id} className="border p-5 shadow-lg rounded-md">
                <div className="h-[200px] w-[200px] mx-auto">
                  <img className="h-full w-full" src={product.image} alt="" />
                </div>
                <h2 className="text-2xl font-semibold truncate mt-2">{product.title}</h2>
                <div className="flex items-center">
                  <p className="mr-8">${product.price}</p>
                  <Rating style={{ maxWidth: 80 }} value={product.rating.rate} readOnly></Rating>
                  <span>({product.rating.count})</span>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default App
