import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        © {new Date().getFullYear()} Art Gallery Explorer — Filip Milosevic
      </p>
    </footer>
  );
}

export default Footer;
