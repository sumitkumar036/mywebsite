const Footer = () => {
  return (
    <footer className="footer mt-auto py-4 bg-dark text-light">
      <div className="container">
        <div className="row">

          {/* About */}
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p className="small">
              Welcome to My Store — your one-stop destination for quality products and great deals.
            </p>
          </div>

          {/* Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#/home" className="text-light text-decoration-none">Home</a></li>
              <li><a href="#/checkout" className="text-light text-decoration-none">Checkout</a></li>
              <li><a href="#/products/1" className="text-light text-decoration-none">Products</a></li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div className="col-md-4 mb-3">
            <h5>Contact</h5>
            <p className="small mb-1">Email: support@mystore.com</p>
            <p className="small">Phone: +91 809-351-2506</p>

            <div className="social-icons mt-2">
              <a href="#" className="text-light me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light me-3"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-light"><i className="bi bi-twitter"></i></a>
            </div>
          </div>
        </div>

        <hr className="bg-light" />
        <p className="text-center small mb-0">
          &copy; {new Date().getFullYear()} My Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
