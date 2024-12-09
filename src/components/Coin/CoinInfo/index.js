import React from 'react'
import "./styles.css"
import { useState } from 'react';
function CoinInfo({heading,desc}) {
const shortDesc=desc.slice(0,270) +"<p style='color:var(--grey)'>  Read More...</p>"
const longDesc=desc +"<p style='color:var(--grey)'>  Read Less...</p>";
const [flag, setflag] = useState(false)
  return (
    <div className='grey-wrapper'>
        <h2 className='coin-info-heading'>{heading}</h2>
        {desc.length>270?(
          <p
          onClick={()=>setflag(!flag)}
          className='coin-info-desc'
          dangerouslySetInnerHTML={{__html:!flag?shortDesc:longDesc}}
          />
        ):(
          <p className='coin-info-desc'
          dangerouslySetInnerHTML={{__html:desc}}/>
        )}
        
    </div>
  )
}

export default CoinInfo;
