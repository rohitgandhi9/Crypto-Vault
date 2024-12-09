// import axios from "axios";
// export const getCoinPrices = async (id,days,priceType) => {
//     const prices = await axios
//         .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
//         .then((response) => {
//             console.log( `${priceType}`)
//             return response.data[priceType];
//         })
//         .catch((error) => {
//             console.log("ERROR>>>", error)
//         });
//     return prices;
// }
import axios from 'axios';

export async function getCoinPrices(coinId, days, priceType) {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
            params: { vs_currency: "usd", days, interval: "daily" },
        });
        return response.data[priceType] || [];
    } catch (error) {
        console.error("Error fetching coin prices:", error);
        return [];
    }
}
