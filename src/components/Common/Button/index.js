import React from 'react'
import "./styles.css"
function Button({text,onclick,outlined}) {
  return (
    <div className={outlined?"outline-btn":"btn"} onClick={()=>onclick()}>
      {text}
    </div>
  )
}

export default Button;
