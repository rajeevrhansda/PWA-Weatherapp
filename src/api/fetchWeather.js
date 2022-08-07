// =====================================WORKING==================================
import axios from "axios";

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '081f7e3597e69e415ea251e278e00a24';     //my key
// const API_KEY = 'f33a484cf794d08d0148764789aaba32'; //youtuber key

//query or name of town we want to search for 
const fetchWeather = async (query)=>{
    //return data
    //get response when we call query
    const {data} = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    });
    console.log(data);
    return data;
}
export default fetchWeather;
