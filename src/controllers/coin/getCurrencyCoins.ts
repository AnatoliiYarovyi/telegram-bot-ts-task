import axios from 'axios';
const { SERVER_COIN_URL } = process.env;

const getCurrencyCoins = async (symbol: string, time: number = 60) => {
  return axios
    .get(SERVER_COIN_URL, {
      params: { name: symbol, timeInMinutes: time },
    })
    .then(res => {
      const data = res.data.data;
      return data;
    })
    .catch(err => console.log(err));
};

export default getCurrencyCoins;
