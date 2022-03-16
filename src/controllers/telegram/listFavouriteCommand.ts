import axios from 'axios';
const { TELEGRAM_URL } = process.env;

import User from '../../models/user';
import getCurrencyCoins from '../coin/getCurrencyCoins';
import ResReqObj from '../interface/interface';

const listFavouriteCommand = async (res: ResReqObj, chat_id: number) => {
  const { coin: userCoin } = await User.findOne({ chatId: chat_id });

  let textMessage: string = `This is your list of favorite crypto coins and their average price per hour.`;
  if (userCoin.length > 0 || !userCoin) {
    await userCoin.forEach(async (symbol, i, arr) => {
      const data: {
        symbol: string;
        price: string;
      } = await getCurrencyCoins(symbol);

      const price: string = Number(data.price).toFixed(2);

      textMessage += `\n/${symbol} = ${price}$`;

      if (i === arr.length - 1) {
        try {
          await axios
            .post(`${TELEGRAM_URL}/sendMessage`, {
              chat_id,
              text: textMessage,
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
      }
    });
  } else {
    try {
      textMessage += `\nSorry, but now you don't have your favorite coins.\nPress /listRecent select your favorite coin and added it to your favorites list`;

      await axios
        .post(`${TELEGRAM_URL}/sendMessage`, {
          chat_id,
          text: textMessage,
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
  }
};

export default listFavouriteCommand;
