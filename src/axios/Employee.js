import axios from 'axios';

class EmployeesApi {
  constructor() {
    this.baseURL = 'http://localhost:8080';
  }

  async getAllEmployees(data) {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${this.baseURL}/user/getallemployees`, data, {
        headers: headers,
      });

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
  async AddEmployees(data) {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${this.baseURL}/user/addemployee`, data,{
        headers: headers,
      });

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
  async UpdateEmployees(data) {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${this.baseURL}/user/updatedetailsfrommanager`, data,{
        headers: headers,
      });

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
  async DeleteEmployees(data) {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${this.baseURL}/user/deleteuserdetailsfrommanager`, data,{
        headers: headers,
      });

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
  async DeleteEmployeesuserfromDept(data) {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${this.baseURL}/dept/deleteuserfromdepts`, data,{
        headers: headers,
      });

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
  async GetUserownInfo(data) {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${this.baseURL}/user/me`, data,{
        headers: headers,
      });

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
  async UpdateOwnInfo(data) {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${this.baseURL}/user/updatedetails`, data,{
        headers: headers,
      });

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
}

export default new EmployeesApi();
