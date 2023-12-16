import axios from 'axios';

async function GetAllFeedbacks(pagination, page) {
  try {
    if (!pagination) {
      let response = await axios.get('http://127.0.0.1:8000/api/User/feedback/');
      let data = [response.data.results];

      do {
        if (response.data.next === null) {
          break;
        } else {
          response = await axios.get(response.data.next);
          data.push(response.data.results);
        }
      } while (true);

      
      data = data.flat();
      return data;
    } else {
      if (page === null) {
        page = 1;
      }
      const response = await axios.get(`http://127.0.0.1:8000/api/User/feedback/?page=${page}`);
      return response.data;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default GetAllFeedbacks;

