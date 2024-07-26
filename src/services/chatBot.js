import axiosInstance from './axios'


export const GetAnswers = async (que) => {
   
      try {
       
        const res = await axiosInstance.get(`/chatbot/virtualchat?question=${que}`);
   //  console.log(res);
        return { res: res.data, err: null };
      } catch (error) {
        return { err: error, res: null };
      }
}