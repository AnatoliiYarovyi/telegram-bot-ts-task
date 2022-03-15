import axios from 'axios';
const { TELEGRAM_URL } = process.env;

import getAllCoins from '../coin/getAllCoins';
import ResReqObj from '../interface/interface';

const listRecentCommand = async (res: ResReqObj, chat_id: number) => {
  try {
    const data: {
      symbol: string;
      price_average: string;
    }[] = await getAllCoins();
    let text: string = `These are 20 popular crypto coins and their average price per hour.`;
    await data.forEach(({ symbol, price_average }) => {
      let price = Number(price_average).toFixed(2);
      text += `\n/${symbol} = ${price}$`;
    });
    await axios
      .post(`${TELEGRAM_URL}/sendMessage`, {
        chat_id,
        text,
      })
      .then(() => {
        res.status(201).json({
          status: 'success',
          code: 201,
        });
      });
  } catch (error) {
    res.send(error);
  }
};

export default listRecentCommand;
