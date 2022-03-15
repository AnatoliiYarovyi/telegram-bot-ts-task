import axios from 'axios';
const { SERVER_URL } = process.env;

const getAllCoins = async () => {
  try {
    const resData = await axios.get(SERVER_URL).then(res => {
      const data = res.data.data;
      return data;
    });

    return resData;
  } catch (error) {
    console.log(error);
  }
};

export default getAllCoins;
