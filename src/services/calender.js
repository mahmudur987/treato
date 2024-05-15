import axiosInstance from './axios'

export const GetCalenderdata = async () => {
   
      try {
        const headers = {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2EzOWI2NmI5NjM4OWFmOTIzN2U4YyIsImlhdCI6MTcxNTc1NzczMCwiZXhwIjoxNzE2MTg5NzMwfQ.ok8GVENylJNje72LAr0tlkXZjiQotU5F5KujkVNS_4s',
        };
        const res = await axiosInstance.get(`https://backend.treato.in/api/v1/reports/calenderReport?date=2024-03-10`, { headers });
    
        return { res: res.data, err: null };
      } catch (error) {
        return { err: error, res: null };
      }
}