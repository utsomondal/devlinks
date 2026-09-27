const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-100 border-t border-base-300 p-4 text-base-content/60">
      <aside>
        <p className="text-sm">
          © {new Date().getFullYear()} DevLinks — Built for developers
        </p>
      </aside>
    </footer>
  );
};

export default Footer;