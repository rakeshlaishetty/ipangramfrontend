import axios from "axios";

class Department {
  constructor() {
    this.baseURL = "http://localhost:8080";
  }

  async CreateDept(data) {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.post(
        `${this.baseURL}/dept/createdept`,
        data,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
  async ViewAllDepts(data) {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.post(
        `${this.baseURL}/dept/getdeptdetails`,
        data,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
  async DeleteDept(data) {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${this.baseURL}/dept/deletedeptdetails`, data,{
        headers: headers,
      });

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
  async UpdateDept(data) {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${this.baseURL}/dept/updatedeptdetails`, data,{
        headers: headers,
      });

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
  async GetALLdeptUsers(data) {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${this.baseURL}/dept/getalluserwithdepts`, data,{
        headers: headers,
      });

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
  async AddDeptUser(data) {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${this.baseURL}/user/adddeptstouser`, data,{
        headers: headers,
      });

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
}

export default new Department();
