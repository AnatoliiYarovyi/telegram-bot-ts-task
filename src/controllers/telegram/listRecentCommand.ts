import axios from 'axios';
const { TELEGRAM_URL } = process.env;

import getAllCoins from '../coin/getAllCoins';

const listRecentCommand = async (res: any, chat_id: number) => {
  const data: {
    symbol: string;
    price_average: string;
  }[] = await getAllCoins();
  let text: string = `These are 20 popular crypto coins and their average price per hour.`;
  await data.forEach(({ symbol, price_average }) => {
    let price = Number(price_average).toFixed(2);
    text += `\n/${symbol} = ${price}$`;
  });
  axios
    .post(`${TELEGRAM_URL}/sendMessage`, {
      chat_id,
      text,
    })
    .then(response => {
      res.status(201).json({
        status: 'success',
        code: 201,
      });
    })
    .catch(err => res.send(err));
};

export default listRecentCommand;
