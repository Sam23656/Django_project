import axios from 'axios';

async function getAllUsers(token) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/User/`, {
          headers: {
            Authorization: `TOKEN ${token}`,
          },
        })
        ;
        let data = [response.data.results];
        do {
          if (response.data.next === null) {
            break;
          } else {
            response = await axios.get(response.data.next, {
              headers: {
                Authorization: `TOKEN ${token}`,
              },
            });
            data.push(response.data.results);
          }
        } while (true);
  
        
        data = data.flat();
        return data;
      } catch (error) {
        console.error('Axios Error:', error);
      }
}

export default getAllUsers;