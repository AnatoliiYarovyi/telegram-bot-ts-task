import axios from 'axios';
const { TELEGRAM_URL } = process.env;

import User from '../../models/user';
import getCurrencyCoins from '../coin/getCurrencyCoins';

const currencySymbolCommand = async (res, chat_id, symbol) => {
  const userData = await User.findOne({ chat_id });
  const symbolCoin = symbol.slice(1);
  const timeInMinutes = [30, 60, 180, 360, 720, 1440];
  let textMessage: string = `/${symbolCoin} average price per: `;

  timeInMinutes.forEach(async (time, i, arr) => {
    const data = await getCurrencyCoins(symbolCoin, time);
    const priceCoin: number | string = Number(data.price).toFixed(2);
    textMessage += `\n${time / 60} hours = ${priceCoin}$`;

    if (i === arr.length - 1) {
      axios
        .post(`${TELEGRAM_URL}/sendMessage`, {
          chat_id,
          text: textMessage,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: userData.coin.includes(symbolCoin)
                    ? 'Remove from favorite'
                    : 'Add to favorite',
                  callback_data: symbolCoin,
                },
              ],
            ],
          },
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

export default currencySymbolCommand;
