import axios from 'axios';
const { TELEGRAM_URL } = process.env;

import User from '../../models/user';
import getCurrencyCoins from '../coin/getCurrencyCoins';

const listFavouriteCommand = async (res, chat_id) => {
  const { coin: userCoin } = await User.findOne({ chat_id });

  let textMessage: string = `This is your list of favorite crypto coins and their average price per hour.`;
  userCoin.forEach(async (symbol, i, arr) => {
    const data = await getCurrencyCoins(symbol);
    const price = Number(data.price).toFixed(2);
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
};

export default listFavouriteCommand;
