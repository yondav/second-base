import axios from 'axios';

const API_URL = '/api/v1';

const authService = {
  // register: (firstName, lastName, email, password) =>
  //   axios.post(API_URL + '/register', {
  //     firstName,
  //     lastName,
  //     email,
  //     password,
  //   }),

  login: (email, password) =>
    axios
      .post(API_URL + '/login', {
        email,
        password,
      })
      .then(res => {
        res.data.accessToken &&
          localStorage.setItem('user', JSON.stringify(res.data));

        return res.data;
      }),

  logout: () => localStorage.removeItem('user'),

  getCurrentUser: () => JSON.parse(localStorage.getItem('user')),
};

export default authService;
