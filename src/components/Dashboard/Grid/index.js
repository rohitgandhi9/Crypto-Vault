import React, { useState } from 'react'
import "./styles.css"
import { motion } from "framer-motion";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Link } from 'react-router-dom';
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";
import StarIcon from "@mui/icons-material/Star";
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";


function Grid({ coin }) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));
  return (
    <Link to={`/coin/${coin.id}`}>
      <motion.div
        className={`grid-container ${coin.market_cap_change_percentage_24h < 0 && "grid-container-red"}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5,delay:0.3 }}
      >
        <div className="info-flex">
          <div className='info'>
            <img src={coin.image} className='coin-image' />
            <div className='name-col'>
              <p className='coin-symbol'>{coin.symbol}</p>
              <p className='coin-name'>{coin.name}</p>
            </div>
          </div>
          <div
            className={`watchlist-icon ${coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
              }`}
            onClick={(e) => {
              if (isCoinAdded) {
                // remove coin

                removeItemToWatchlist(e, coin.id, setIsCoinAdded);
              } else {
                setIsCoinAdded(true);
                saveItemToWatchlist(e, coin.id);
              }
            }}
          >
            {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
          </div>
        </div>
        {coin.market_cap_change_percentage_24h > 0 ? ( //standard if else condition case using the ternary operator
          <div className="chip-flex">
            <div className="price-chip">
              {coin.market_cap_change_percentage_24h.toFixed(2)} %
            </div>
            <div className='icon-chip'>
              <TrendingUpRoundedIcon />
            </div>
          </div>
        ) : (
          <div className="chip-flex">
            <div className="price-chip chip-red">
              {coin.market_cap_change_percentage_24h.toFixed(2)} %
            </div>
            <div className='icon-chip chip-red'>
              <TrendingDownRoundedIcon />
            </div>
          </div>

        )}
        <div className='info-container'>
          <h3 className='price-coin' style={{   //inline if-else conditon using the ternary opeartor
            color:
              coin.market_cap_change_percentage_24h < 0
                ? "var(--red)"
                : "var(--green)",
          }}>$
            {coin.current_price.toLocaleString()}
          </h3>
          <p className="total_volume">
            Total Volume : {coin.total_volume.toLocaleString()}
          </p>
          <p className="market_cap">
            Market Cap : {coin.market_cap.toLocaleString()}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}

export default Grid;
