import axiosInstance from './axios'

export const GetCalenderdata = async () => {
   
      try {
        const headers = {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2EzOWI2NmI5NjM4OWFmOTIzN2U4YyIsImlhdCI6MTcxNjI4Mzg3NSwiZXhwIjoxNzE2NzE1ODc1fQ.A4C7Pa4aDxisYA5Ch3v8Ph-TacSlw84J52kQ6MQ6G0k',
        };
        const res = await axiosInstance.get(`/reports/calenderReport`, { headers });
    
        return { res: res.data, err: null };
      } catch (error) {
        return { err: error, res: null };
      }
}