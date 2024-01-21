import axios from 'axios';

class Roles {
  constructor() {
    this.baseURL = 'http://localhost:8080';
  }

  async fecthroles() {
    try {
      const response = await axios.get(`${this.baseURL}/user/getroles`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
}

export default new Roles();
