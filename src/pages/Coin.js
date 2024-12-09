import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios"
import { useParams } from 'react-router-dom';
import Loader from '../components/Common/Loader';
import Header from '../components/Common/Header';
import { coinObject } from '../functions/convertObject';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import LineChart from '../components/Coin/LineChart';
import { convertDate } from '../functions/convertDate';
import SelectDays from '../components/Coin/SelectDays';
import { settingChartData } from '../functions/settingChartData';
import TogglePriceType from '../components/Coin/PriceType';


function CoinPage() {
    const { id } = useParams();

    const [isLoading, setisLoading] = useState(true)
    const [coinData, setcoinData] = useState()
    const [days, setdays] = useState(30)
    const [chartData, setchartData] = useState([])
    const [priceType, setPriceType] = useState("prices");

    // const [coinlist, setcoinlist] = useState()
    useEffect(() => {
        if (id) {
            getData(id);
        }
    }, [id])

    async function getData(id) {
        const data = await getCoinData(id);
        if (data) {
            coinObject(setcoinData, data);
            const prices = await getCoinPrices(id, days, priceType);
            if (prices.length > 0) { 
                settingChartData(setchartData, prices);
                setisLoading(false);
            }
        }
    };
    const handleDaysChange = async (event) => {
        setisLoading(true);
        setdays(event.target.value);
        const prices = await getCoinPrices(id, event.target.value,priceType);
        if (prices.length > 0) {
            settingChartData(setchartData, prices);
            setisLoading(false);
        }
    };

    const handlePriceTypeChange =  async (event, newType) => {
        setisLoading(true);
        setPriceType(newType);
        const prices = await getCoinPrices(id, days,newType);
        if (prices.length > 0) {
            settingChartData(setchartData, prices);
            setisLoading(false);
        }
    };
    return (
        <div>
            <Header />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
                        <List coin={coinData} />
                    </div>
                    <div className='grey-wrapper'>
                        <SelectDays days={days} handleDaysChange={handleDaysChange} noPtag={false}/>
                        <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
                        <LineChart chartData={chartData} priceType={priceType}/>
                    </div>
                    <CoinInfo heading={coinData.name} desc={coinData.desc} />
                </>
            )}
        </div >
    )
}

export default CoinPage;
