import axios from "axios";

export const fetchIPInfo = async () => {
    try {
      const response = await axios.get('https://ipinfo.io/json?token=50137db41bcd12');
      const jsonResponse = response.data;
      return { response: jsonResponse, error: null };
    } catch (error) {
      console.error(error);
      return { response: null, error: error };
    }
  };
  