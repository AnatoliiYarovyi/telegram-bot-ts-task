import axios from 'axios';
const { TELEGRAM_URL } = process.env;

import User from '../../models/user';
import getCurrencyCoins from '../coin/getCurrencyCoins';

const listFavouriteCommand = async (res: any, chat_id: number) => {
  const { coin: userCoin } = await User.findOne({ chatId: chat_id });

  let textMessage: string = `This is your list of favorite crypto coins and their average price per hour.`;
  if (userCoin.length > 0 || !userCoin) {
    userCoin.forEach(async (symbol, i, arr) => {
      const data: {
        symbol: string;
        price: string;
      } = await getCurrencyCoins(symbol);

      const price: string = Number(data.price).toFixed(2);

      textMessage += `\n/${symbol} = ${price}$`;

      if (i === arr.length - 1) {
        axios
          .post(`${TELEGRAM_URL}/sendMessage`, {
            chat_id,
            text: textMessage,
          })
          .then(response => {
            res.status(201).json({
              status: 'success',
              code: 201,
            });
          })
          .catch(err => res.send(err));
      }
    });
  } else {
    textMessage += `\nsorry, but now you don't have your favorite coins\npress /listRecent select your favorite coin and add it to your favorites list`;

    axios
      .post(`${TELEGRAM_URL}/sendMessage`, {
        chat_id,
        text: textMessage,
      })
      .then(response => {
        res.status(201).json({
          status: 'success',
          code: 201,
        });
      })
      .catch(err => res.send(err));
  }
};

export default listFavouriteCommand;
