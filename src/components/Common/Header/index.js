import React from 'react'
import {Link} from "react-router-dom"
import AnchorTemporaryDrawer from "./drawer"
import "./styles.css"
import Button from "../Button"
function header() {
  return (
    <div className='navbar'>
      <h1 className='logo'>
        CryptoVault<span style={{ color: "var(--blue)" }}>.</span>
      </h1>

      <div className='links'>
        <Link to="/">
          <p className='link'>Home</p>
        </Link>
        {/* <Link to="/compare">
          <p className='link'>Compare</p>
        </Link> */}
        <Link to="/watchlist">
          <p className='link'>Watch List</p>
        </Link>
        <Link to="/dashboard">
          <Button text={"Dashboard"} outlined={false} onclick={()=>console.log("Btn clicked")}/>
        </Link>
      </div>
      <div className="mobile-drawer">
        <AnchorTemporaryDrawer/>
      </div>
    </div>
  )
}

export default header
