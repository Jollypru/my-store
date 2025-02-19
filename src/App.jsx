import { Rating } from "@smastrom/react-rating";
import { useEffect, useState } from "react";
import { IoCart, IoSearch } from "react-icons/io5";
import '@smastrom/react-rating/style.css'
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Services from "./components/Services";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    setCartCount(cartCount + quantity);
    setQuantity(1);
  };

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setAllProducts(data)
      })

    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])

  const openProductModal = (productId) => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(res => res.json())
      .then(data => setSelectedProduct(data))
  };
  const closeModal = () => {
    setSelectedProduct(null);
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      fetch(`https://fakestoreapi.com/products/category/${e.target.value}`)
        .then(res => res.json())
        .then(data => setProducts(data))
    } else {
      setProducts(allProducts);
    }
  }

  const incrementQuantity =() => {
    setQuantity(quantity + 1);
  }
  const decrementQuantity = () => {
    if(quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <div>
      <nav className="sticky top-0 z-50 flex justify-between items-center p-3 md:px-8 bg-amber-400">
        <h1 className="text-2xl font-bold">MyStore</h1>
        <div className="flex items-center gap-3">
          <div className="relative w-60">
            <input onChange={handleSearch} type="text" placeholder="What are you looking for?" list="category-list" className="border rounded-lg px-4 py-2 w-full" />
            <IoSearch className="absolute right-3 top-1/2 transform -translate-y-2 text-gray-400 text-xl"></IoSearch>
            <datalist id="category-list">
              {
                categories.map((category, index) => (
                  <option key={index} value={category}></option>
                ))
              }
            </datalist>
          </div>
          <button className="text-2xl relative"><IoCart />
            <span className="absolute -top-2 -right-2 bg-[#db7137] text-white text-xs px-1 rounded-full">{cartCount}</span>
          </button>
        </div>
      </nav>

      <Banner></Banner>

      <section className="bg-black px-10 py-20 text-white">
        <h2 className="text-4xl mb-3">Discover Your Next Favorite Item</h2>
        <p>Browse our exclusive products and find the perfect product tailored just for you.</p>
        <div className="flex gap-5 mt-8">
          <button className="py-2 px-3 border hover:bg-white hover:text-black font-semibold">Shop</button>
          <button className="py-2 px-3 border hover:bg-white hover:text-black font-semibold">Learn More</button>
        </div>
      </section>

      {/* Products section */}
      <section className="px-8 my-10">
        <h2 className="text-4xl font-semibold my-5">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            products.map(product => (
              <div key={product.id} onClick={() => openProductModal(product.id)} className="border p-5 shadow-lg rounded-md cursor-pointer">
                <div className="h-[200px] w-[200px] mx-auto">
                  <img className="h-full w-full" src={product.image} alt="" />
                </div>
                <h2 className="text-2xl font-semibold truncate mt-4">{product.title.length > 30 ? product.title.slice(0, 30) + "..." : product.title}</h2>
                <div className="flex items-center">
                  <p className="mr-8 text-amber-700">${product.price}</p>
                  <Rating style={{ maxWidth: 80 }} value={product.rating.rate} readOnly></Rating>
                  <span>({product.rating.count})</span>
                </div>
              </div>
            ))
          }
        </div>
      </section>

      {/* product detail modal */}
      {
        selectedProduct && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
            <div className="relative mx-3 md:w-3/4 p-6 bg-white overflow-y-auto max-h-[90vh]">
              <button onClick={closeModal} className="absolute top-2 right-4 text-2xl">&times;</button>
              <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-3">
                <div className="md:h-[400px] md:w-[500px] lg:w-[400px] border rounded-md shadow-lg">
                  <img className="h-full w-full object-fit" src={selectedProduct.image} alt="" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold">{selectedProduct.title}</h2>
                  <div className="flex items-center text-lg">
                    <Rating style={{ maxWidth: 80 }} value={selectedProduct.rating.rate} readOnly></Rating>
                    <span>({selectedProduct.rating.count})</span>
                  </div>
                  <p className="text-3xl">${selectedProduct.price}</p>
                  <p>{selectedProduct.description}</p>
                  <div className="divider"></div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-8 border border-gray-400 py-2 px-5 text-lg">
                      <button onClick={decrementQuantity}>-</button>
                      <span>{quantity}</span>
                      <button onClick={incrementQuantity}>+</button>
                    </div>
                    <button onClick={addToCart} className="py-2 px-4 bg-amber-700 text-white text-lg">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      <Services></Services>
      <Footer></Footer>
    </div>
  )
}

export default App
