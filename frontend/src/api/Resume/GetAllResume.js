import axios from 'axios';

async function GetAllResume(pagination, page) {
    try {
        if (pagination == true){
            if (page === null) {
                page = 1;
            }
            const response = await axios.get(`http://127.0.0.1:8000/api/JobSeeker/Resume/?page=${page}`, {
            });
            return response.data
        }
        else {
        let response = await axios.get('http://127.0.0.1:8000/api/JobSeeker/Resume/', {
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

export default GetAllResume;
