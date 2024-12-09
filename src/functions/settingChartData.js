import { convertDate } from "./convertDate";
export const settingChartData=(setchartData,prices)=>{
    setchartData({
        labels:prices.map((price)=>convertDate(price[0])),
        datasets:[
            {
                data:prices.map((price)=>price[1]),
                borderColor:"#3a80e9",
                borderWidth:2, //width of the trendline
                fill:true,
                tension:0.20, //the curveness of the trendline
                backgroundColor:"rgba(58,128,233,0.1)",
                borderColor:"#3a80e9",
                pointRadius:0,//the radius of the day points on trendline
            },
        ],
    });
}