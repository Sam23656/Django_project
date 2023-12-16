import axios from 'axios';

async function GetAllMessages(pagination, page) {
  try {
    if (pagination === undefined){
      const response = await axios.get('http://127.0.0.1:8000/api/Chat/Message/', {
      });
      return response.data.results
    }
    else {
    if (page === null) {
        page = 1;
    }
    let response = await axios.get(`http://127.0.0.1:8000/api/Chat/Message/?page=${page}`, {
    });
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
    }
} catch (error) {
    console.error('Error:', error);
    throw error;
}
}

export default GetAllMessages;