import React, { useEffect, useState } from "react";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://codingshika.com/MYAPP/API/ebook.php?nm=")
      .then((res) => {
        if (res.data?.posts?.post) {
          setBooks(res.data.posts.post);
        } else {
          setBooks([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  const filteredBooks = books.filter((book) =>
    book.NAME.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4 fw-bold">📚 E-Books Library</h3>

      {/* Search Box */}
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="Search book..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Loading */}
      {loading && <p className="text-center">Loading books...</p>}

      {/* Cards */}
      <div className="row g-4">
        {!loading &&
          filteredBooks.map((book) => (
            <div className="col-md-4" key={book.ID}>
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <img
                  src={book.IMG}
                  className="card-img-top p-3"
                  alt={book.NAME}
                  style={{ height: "200px", objectFit: "contain" }}
                />

                <div className="card-body text-center">
                  <h5 className="card-title fw-semibold">{book.NAME}</h5>
                </div>

                <div className="card-footer bg-white border-0 text-center mb-3">
                  <a
                    href={book.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary rounded-pill px-4"
                  >
                    Read PDF
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>

      {!loading && filteredBooks.length === 0 && (
        <p className="text-center text-muted">No books found</p>
      )}
    </div>
  );
};

export default BookList;