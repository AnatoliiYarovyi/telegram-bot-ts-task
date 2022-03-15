import axios from 'axios';
const { TELEGRAM_URL } = process.env;

import addUser from './addUser';
import ResReqObj from '../interface/interface';

const startCommand = async (
  res: ResReqObj,
  chat_id: number,
  userName: string | undefined,
) => {
  try {
    await addUser(chat_id, userName);
    const text: string = `Hi, ${
      userName || 'my friend'
    }! Type /help to see what I can!`;
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

export default startCommand;
