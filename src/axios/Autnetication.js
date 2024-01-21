import axios from 'axios';

class Authentication {
  constructor() {
    this.baseURL = 'http://localhost:8080';
  }

  async login(data) {
    try {
      const response = await axios.post(`${this.baseURL}/auth/login`, data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
}

export default new Authentication();
