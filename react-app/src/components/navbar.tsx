import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/About">About</Link>
      <Link to="/Books">Books</Link>
      <Link to="/Dogs">Dogs</Link>
    </div>
  );
};

export default Navbar;
