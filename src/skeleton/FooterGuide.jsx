import React from "react";
import "./FooterGuide.css";

const FooterGuide = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="guide-footer">
      <p>© {currentYear} All rights reserved</p>
    </footer>
  );
};

export default FooterGuide;
