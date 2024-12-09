import React, { useState, useEffect } from 'react'
import Header from '../components/Common/Header'
import SelectCoins from '../components/Compare/SelectCoins'
import SelectDays from '../components/Coin/SelectDays';
import { coinObject } from '../functions/convertObject';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import Loader from '../components/Common/Loader';



function ComparePage() {
    const [crypto1, setCrypto1] = useState("bitcoin");
    const [crypto2, setCrypto2] = useState("ethereum");
    const [crypto1Data, setCrypto1Data] = useState({});
    const [crypto2Data, setCrypto2Data] = useState({});
    const [days, setDays] = useState(30);
    const [isLoading, setisLoading] = useState(true);
    const [priceType, setpriceType] = useState("prices")

    function handleDaysChange(event) {
        setDays(event.target.value)
    }
    useEffect(() => {
        getData();
    }, [])
    // useEffect(() => {
    //     const fetchData = async () => {
    //         await getData();
    //     };
    //     fetchData();
    // }, []);
    


    async function getData() {
        setisLoading(true);
        const data1 = await getCoinData(crypto1);
        const data2 = await getCoinData(crypto2);
        if (data1) {
            coinObject(setCrypto1Data, data1);
        }
        if (data2) {
            coinObject(setCrypto2Data, data2);
        }
        if (data1 && data2) {
            const prices1 = await getCoinPrices(crypto1, days, priceType);
            const prices2 = await getCoinPrices(crypto1, days, priceType);

            if (prices1.length > 0 && prices2.length > 0) {
                // settingChartData(setchartData, prices);
                console.log("Both prices:", prices1, prices2);
                setisLoading(false);

            }

        }
    }

    // const handleCoinChange = async (event, isCoin2) => {
    //     setisLoading(true);
    //     if (isCoin2) {
    //         setCrypto2(event.target.value);
    //         const data2 = await getCoinData(event.target.value);
    //         coinObject(setCrypto2Data, data2);
    //     } else {
    //         setCrypto1(event.target.value);
    //         const data1 = await getCoinData(event.target.value);
    //         coinObject(setCrypto1Data, data1);
    //     }
    //     const prices1 = await getCoinPrices(crypto1, days, priceType);
    //     const prices2 = await getCoinPrices(crypto2, days, priceType);
    //         // settingChartData(setchartData, prices);
    //     if(prices1.length > 0 && prices2.length>0){
    //         console.log("Both prices fetched:", prices1, prices2);
    //         setisLoading(false);
    //     }
    // };
    const handleCoinChange = async (event, isCoin2) => {
        setisLoading(true);
        try {
            const coinId = event.target.value;
            if (isCoin2) {
                setCrypto2(coinId);
                const data2 = await getCoinData(coinId);
                coinObject(setCrypto2Data, data2);
            } else {
                setCrypto1(coinId);
                const data1 = await getCoinData(coinId);
                coinObject(setCrypto1Data, data1);
            }
    
            const prices1 = await getCoinPrices(crypto1, days, priceType);
            const prices2 = await getCoinPrices(crypto2, days, priceType);
    
            if (prices1?.length > 0 && prices2?.length > 0) {
                console.log("Both prices fetched:", prices1, prices2);
            } else {
                console.warn("Prices data is missing.");
            }
        } catch (error) {
            console.error("Error in handleCoinChange:", error);
        } finally {
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
                    <div className='coin-days-flex'>
                        <SelectCoins
                            crypto1={crypto1}
                            crypto2={crypto2}
                            handleCoinChange={handleCoinChange} />
                        <SelectDays
                            days={days}
                            handleDaysChange={handleDaysChange}
                            noPtag={true} />
                    </div>
                </>
            )}
        </div >
    )

}
export default ComparePage
