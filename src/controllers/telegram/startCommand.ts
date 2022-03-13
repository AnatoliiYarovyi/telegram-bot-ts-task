import axios from 'axios';
const { TELEGRAM_URL } = process.env;

import addUser from './addUser';

const startCommand = async (
  res,
  chat_id: number,
  userName: string | undefined,
) => {
  await addUser(chat_id, userName);
  const text: string = `Hi, ${
    userName || 'my friend'
  }! Type /help to see what I can!`;
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

export default startCommand;
