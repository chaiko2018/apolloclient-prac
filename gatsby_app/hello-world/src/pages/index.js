import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"

const Home = () => {
  return (
    <div style={{ color: `purple` }}>
      <Link to="/">Home</Link>
      <Link to="/about/">About</Link>
      <Header headerText="Hello Gatsby" />
      <p>What a world</p>
      <img src="https://source.unsplash.com/random/400x200" alt="" />
    </div>
  )
}

export default Home
