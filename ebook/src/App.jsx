import axios from "axios";
import { useState } from "react";

function App() {

  /* ================= PRODUCT DATA ================= */

  let get=()=>{
    axios.get("https://codingshika.com/MYAPP/API/ebook.php?nm=")
    .then(res=>{
      console.log(res.data)
    })

  }


  const productList = [
    {
      id: 1,
      name: "Laptop",
      price: 55000,
      category: "Electronics",
      image: "https://via.placeholder.com/300",
      description: "High performance laptop for professionals"
    },
    {
      id: 2,
      name: "Mobile",
      price: 25000,
      category: "Electronics",
      image: "https://via.placeholder.com/300",
      description: "5G smartphone with powerful camera"
    },
    {
      id: 3,
      name: "Headphones",
      price: 3500,
      category: "Accessories",
      image: "https://via.placeholder.com/300",
      description: "Noise cancelling wireless headphones"
    },
    {
      id: 4,
      name: "Shoes",
      price: 4000,
      category: "Fashion",
      image: "https://via.placeholder.com/300",
      description: "Comfortable running shoes"
    }
  ];

  /* ================= STATES ================= */
  const [products] = useState(productList);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);

  /* ================= CART LOGIC ================= */
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, type) => {
    setCart(
      cart
        .map(item =>
          item.id === id
            ? { ...item, qty: type === "inc" ? item.qty + 1 : item.qty - 1 }
            : item
        )
        .filter(item => item.qty > 0)
    );
  };

  const clearCart = () => setCart([]);

  /* ================= BILLING ================= */
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  /* ================= FILTER ================= */
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || p.category === category)
  );

  return (
    <div className="container mt-4">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded px-3 mb-4">
        <span className="navbar-brand fw-bold">ShopPro</span>
        <div className="ms-auto">
          <button className="btn btn-outline-warning" onClick={() => setShowCart(true)}>
            Cart ({cart.reduce((a, c) => a + c.qty, 0)})
          </button>
        </div>
      </nav>

      {/* ================= SEARCH & FILTER ================= */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select className="form-select" onChange={(e) => setCategory(e.target.value)}>
            <option>All</option>
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Fashion</option>
          </select>
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="row">
        {filteredProducts.map(p => (
          <div className="col-md-3 mb-4" key={p.id}>
            <div className="card h-100 shadow-sm">
              <img src={p.image} className="card-img-top" />
              <div className="card-body text-center">
                <span className="badge bg-secondary mb-2">{p.category}</span>
                <h6>{p.name}</h6>
                <p className="fw-bold text-success">₹{p.price}</p>
                <button
                  className="btn btn-sm btn-outline-info me-2"
                  onClick={() => setSelectedProduct(p)}
                >
                  View
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => addToCart(p)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= PRODUCT MODAL ================= */}
      {selectedProduct && (
        <div className="modal show d-block" style={{ background: "#00000080" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>{selectedProduct.name}</h5>
                <button className="btn-close" onClick={() => setSelectedProduct(null)} />
              </div>
              <div className="modal-body">
                <img src={selectedProduct.image} className="img-fluid mb-3" />
                <p>{selectedProduct.description}</p>
                <h6>₹{selectedProduct.price}</h6>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={() => addToCart(selectedProduct)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CART MODAL ================= */}
      {showCart && (
        <div className="modal show d-block" style={{ background: "#00000080" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Cart Summary</h5>
                <button className="btn-close" onClick={() => setShowCart(false)} />
              </div>
              <div className="modal-body">

                {cart.length === 0 ? <p>Cart is empty</p> : (
                  <>
                    <table className="table align-middle">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Qty</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map(item => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                              <button className="btn btn-sm btn-secondary me-1"
                                onClick={() => updateQty(item.id, "dec")}>-</button>
                              {item.qty}
                              <button className="btn btn-sm btn-secondary ms-1"
                                onClick={() => updateQty(item.id, "inc")}>+</button>
                            </td>
                            <td>₹{item.price * item.qty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="card">
                      <div className="card-body">
                        <p>Subtotal: ₹{subtotal}</p>
                        <p>GST (18%): ₹{gst.toFixed(2)}</p>
                        <h6 className="text-success">Total: ₹{total.toFixed(2)}</h6>
                        <button className="btn btn-danger mt-2" onClick={clearCart}>
                          Clear Cart
                        </button>
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;