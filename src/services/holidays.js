import { useQuery } from "react-query";
import axiosInstance from "./axios";
import { useSingleSalon } from "./salon";

export const useGetHolidays = () => {
  const { data: salon } = useSingleSalon();
  const id = salon?.salon?._id;
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  return useQuery({
    queryKey: [salon, id],
    queryFn: async () => {
      let url = `holidays/${id}/getHolidays`;

      const { data } = await axiosInstance.get(url, {
        headers,
      });
      console.log(data);
      return data;
    },
  });
};
