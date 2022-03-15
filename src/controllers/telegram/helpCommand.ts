import axios from 'axios';
const { TELEGRAM_URL } = process.env;

import ResReqObj from '../interface/interface';

const helpCommand = async (res: ResReqObj, chat_id: number) => {
  try {
    const text: string = `I am a cryptocurrency bot!\nI display the price of cryptocurrency! You can use commands like this:\n/listRecent --> get a list of popular cryptocurrencies;\n/{currency_symbol} --> get detailed information about cryptocurrency;\n/listFavourite --> returns a list of Favourite crypts;
  \nand you can adds or remove a crypt to the "favorites" section`;

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

export default helpCommand;
