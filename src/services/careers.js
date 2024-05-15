
import axiosInstance from './axios'


export const GetPostDetails = async () => {
   
      try {
        const headers = {
          token: localStorage.getItem("jwtToken"),
        };
        const res = await axiosInstance.get(`https://backend.treato.in/api/v1/career/alljobopening`, { headers });
   //  console.log(res);
        return { res: res.data, err: null };
      } catch (error) {
        return { err: error, res: null };
      }
}

export const jobApplicationData = async (formData) => {
  
      console.log(formData);
  const headers = {
    token: localStorage.getItem("jwtToken"),
  };
  try {
    const res = await axiosInstance.post("/career/jobformapply", formData,{headers});

    alert("Job form application submitted successfully.")
    
  } catch (error) {
    alert("Something went wrong")
  }
};









export const contactDetails = async (formData) => {
  console.log(formData);
      try {
      const response = await fetch('https://backend.treato.in/api/v1/reports/contactUs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if neede
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      const res = await response.json()
      console.log("this is form data ",formData)
      console.log("this is backend url","https://backend.treato.in/api/v1/reports/contactUs")
      console.log("this is response form backend ",res)
      // Handle success, e.g., show success message
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error.message);
      // Handle error, e.g., show error message
    }
  
};

