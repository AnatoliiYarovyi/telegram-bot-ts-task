import axios from 'axios';
const { TELEGRAM_URL } = process.env;
import User from '../../models/user';
import getAllCoins from '../coin/getAllCoins';
import ResReqObj from '../interface/interface';

type AddDataCoin = (
  res: ResReqObj,
  chat_id: number,
  symbol: string | undefined,
) => any;

const addDataCoin: AddDataCoin = async (res, chat_id, symbol) => {
  if (symbol === undefined) {
    try {
      await axios
        .post(`${TELEGRAM_URL}/sendMessage`, {
          chat_id,
          text: `Sorry, but the command is not correct. Please enter /addToFavorite and the symbol of the coin. for example "/addToFavorite BTC"`,
        })
        .then(() => {
          res.status(201).send();
        });
      return;
    } catch (error) {
      console.log(error.message);
    }
  }

  const allCoinData: {
    symbol: string;
    price_average: string;
  }[] = await getAllCoins();
  const allCoinName: string[] = allCoinData.reduce((acc, { symbol }) => {
    acc.push(symbol);
    return acc;
  }, []);
  const { coin: userCoin } = await User.findOne({ chatId: chat_id });

  if (userCoin.includes(symbol) === true) {
    try {
      await axios
        .post(`${TELEGRAM_URL}/sendMessage`, {
          chat_id,
          text: `Sorry, but this coin /${symbol} is already on your favorites list`,
        })
        .then(() => {
          res.status(201).send();
        });
      return;
    } catch (error) {
      console.log(error.message);
    }
  } else if (allCoinName.includes(symbol) === false) {
    try {
      await axios
        .post(`${TELEGRAM_URL}/sendMessage`, {
          chat_id,
          text: `Sorry, but this coin /${symbol} was not found in /listRecent.\nPlease enter a valid coin name with /listRecent.`,
        })
        .then(() => {
          res.status(201).send();
        });
      return;
    } catch (error) {
      console.log(error.message);
    }
  } else {
    userCoin.push(symbol);
    await User.findOneAndUpdate(
      { chatId: chat_id },
      { $set: { coin: userCoin } },
    );
    try {
      await axios
        .post(`${TELEGRAM_URL}/sendMessage`, {
          chat_id,
          text: `/${symbol} added to favorite`,
        })
        .then(() => {
          res.status(201).send();
        });
      return;
    } catch (error) {
      console.log(error.message);
    }
  }
  return;
};

export default addDataCoin;
