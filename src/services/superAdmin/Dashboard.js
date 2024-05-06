import { useQuery } from "react-query";
import axiosInstance from "../axios";
export const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTY1OWE0YjM1MjU2OTRiNmIwMzBjZCIsImlhdCI6MTcxNDgyODUzMiwiZXhwIjoxNzE1MjYwNTMyfQ.CE0utRVsBx80cOM79fk7tO4iZrHfrD9GgnDmTkDpWsc";
export const useStatistics = (x) => {
  const headers = {
    token: adminToken,
  };

  return useQuery({
    queryKey: [x],
    queryFn: async () => {
      const { data } = await axiosInstance.post(
        "super/statistics",
        {
          days: Number(x?.slice(5, 7)),
        },
        { headers }
      );

      return data;
    },
  });
};
