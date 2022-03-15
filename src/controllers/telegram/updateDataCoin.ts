import axios from 'axios';
const { TELEGRAM_URL } = process.env;
import User from '../../models/user';
import ResReqObj from '../interface/interface';

type UpdateDataCoin = (
  res: ResReqObj,
  chat_id: number,
  symbol: string,
  callback_query_id: string,
  message_id: number,
) => any;

const updateDataCoin: UpdateDataCoin = async (
  res,
  chat_id,
  symbol,
  callback_query_id,
  message_id,
) => {
  try {
    const { coin: userCoin } = await User.findOne({ chatId: chat_id });
    userCoin.includes(symbol)
      ? userCoin.splice(userCoin.indexOf(symbol), 1)
      : userCoin.push(symbol);

    await User.findOneAndUpdate(
      { chatId: chat_id },
      { $set: { coin: userCoin } },
    );

    let text: string = userCoin.includes(symbol)
      ? `/${symbol} add to favorite`
      : `/${symbol} remove from favorite`;

    await axios.post(`${TELEGRAM_URL}/answerCallbackQuery`, {
      callback_query_id,
      text,
    });

    await axios
      .post(`${TELEGRAM_URL}/editMessageText`, {
        chat_id,
        message_id,
        text,
      })
      .then(response => {
        res.status(201).send(response);
      });
  } catch (error) {
    res.send(error);
  }
};

export default updateDataCoin;
