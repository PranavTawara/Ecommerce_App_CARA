import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearToken, selectToken } from "../slices/AuthSlice";
import { searchProducts } from "../APIs/ProductsAPI";
import { clearUser } from "../slices/UserSlice";
import '../Styling.css';
import logo from '../images/logo.png';
function Header() {
  const [admin, setAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  // User & token for conditional rendering
  const token = useSelector(selectToken);
  const user = JSON.parse(sessionStorage.getItem("user"));

  // Handeling the search input for searching products
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle search function called onClick of search icon
  const handleSearch = async () => {
    try {
      const response = await searchProducts(searchQuery);
      setSearchResults(response.searchResults);
      setShowModal(true);
      setSearchQuery("");
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  // Closing the modal which shows search results
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Modal Book Img Style
  const modalImgStyle = {
    height: "140px",
    width: "100px",
  };

  // UseEffect to set admin status
  useEffect(() => {
    if (user) {
      setAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <>
      <div className="header" style={{background:"#E3E6F3"}}>
        <nav className="navbar navbar-expand-lg navbar-custom">
          <div className="container-fluid mx-lg-4">
            <Link className="navbar-brand d-inline-flex me-lg-5" to="/">
              <a className="ms-5 navbar-brand" href="#"><img src={logo} alt="logo" /></a>
            </Link>

            <button
              className="navbar-toggler custom-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fa-solid fa-bars fa-lg my-1"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              {/* Search bar */}
              <form className="form-inline my-2 ms-lg-5 mx-sm-0">
                <div className="input-group ms-lg-5">
                  <input
                    type="text"
                    className="form-control text-secondary border-secondary border-end-0"
                    placeholder="Search"
                    value={searchQuery}
                    // Handling search query
                    onChange={handleSearchChange}
                  />
                  <button
                    className="btn btn-outline-secondary border-start-0"
                    type="button"
                    onClick={handleSearch}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>

              {/* Modal including Search Results */}
              <div
                className={`modal fade shadow ${showModal ? "show" : ""}`}
                id="searchModal"
                data-bs-keyboard="false"
                tabIndex="-1"
                data-bs-backdrop="static"
                aria-labelledby="searchModalLabel"
                aria-hidden={!showModal}
                style={{ display: showModal ? "block" : "none" }}
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header bg-secondary">
                      <h5
                        className="modal-title text-white"
                        id="searchModalLabel"
                      >
                        Search Results
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={handleCloseModal}
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body border border-0">
                      {searchResults.length > 0 ? (
                        <ul className="list-group">
                          {searchResults.map((result) => (
                            <li
                              key={result._id}
                              className="list-group-item border-0"
                              onClick={handleCloseModal}
                            >
                              <div className="row">
                                <div className="col-12 col-md-4">
                                  <img
                                    src={result.image}
                                    alt={result.title}
                                    className="rounded shadow-sm"
                                    style={modalImgStyle}
                                  />
                                </div>
                                <div className="col-12 col-md-8">
                                  <Link
                                    to={`/productDetails/${result._id}`}
                                    className="text-secondary text-decoration-none fs-5 fw-semibold"
                                  >
                                    {result.title}
                                  </Link>
                                  <p className="fs-6 text-secondary">
                                    {result.description}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="fs-6 text-secondary fw-semibold">
                          {" "}
                          OOPS! No results found
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <ul className="navbar-nav ms-auto">
                {!token && (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link login-btn allHover mt-3 mt-sm-3 mt-lg-0"
                        to="/login"
                      >
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link login-btn allHover mt-3 mt-sm-3 mt-lg-0"
                        to="/register"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
                {token && (
                  <>
                    <li className="nav-item me-1">
                      <Link
                        className="nav-link login-btn allHover mt-3 mt-sm-3 mt-lg-0"
                        to="/userProfile"
                      >
                        <i className="fa-solid fa-xl fa-user"></i>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link login-btn allHover mt-3 mt-sm-3 mt-lg-0"
                        to="/"
                        onClick={() => {
                          dispatch(clearToken());
                          dispatch(clearUser());
                        }}
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket fa-xl"></i>
                      </Link>
                    </li>
                    {admin && (
                      <>
                        <li className="nav-item bg-secondary text-secondary bg-opacity-10 border border-secondary border-1 rounded me-2">
                          <Link className="nav-link fs-6 px-1" to="/adminPanel">
                            Admin
                          </Link>
                        </li>
                        <li className="nav-item bg-secondary text-secondary bg-opacity-10 border border-secondary border-1 rounded">
                          <Link className="nav-link fs-6 px-1" to="/addProduct">
                            Add Product
                          </Link>
                        </li>
                      </>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* Second Navbar having conditional rendering */}
        <nav className="navbar custom-navbar mb-4 bg-secondary">
          <ul className="nav justify-content-center mx-auto py-0">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white py-0">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/allproducts" className="nav-link text-white py-0">
              All Products
              </Link>
            </li>

            {user && (
              <>
                <li className="nav-item">
                  <Link to="/myOrders" className="nav-link text-white py-0">
                    My Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white py-0" to="/cart">
                    Cart
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
