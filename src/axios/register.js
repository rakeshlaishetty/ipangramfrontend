import axios from 'axios';

class Register {
  constructor() {
    this.baseURL = 'http://localhost:8080';
  }

  async signup(data) {
    try {
      const response = await axios.post(`${this.baseURL}/user/register`, data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
}

export default new Register();
