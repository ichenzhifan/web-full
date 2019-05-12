import axios from 'axios';

export default {
  login(user) {
    return new Promise((resolve, reject) => {
      axios.get('/api/login', { params: user })
        .then(({ data }) => {
          if (data.code === 200) {
            resolve(data);
          } else {
            reject(data);
          }
        }).catch(error => {
          reject(error);
        })
    });

  }
}