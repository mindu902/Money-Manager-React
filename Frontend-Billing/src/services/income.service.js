import axios from "axios";

const API_URL = "http://localhost:8080/api/income/";

class IncomeService {
  async getAllIncome(username) {
    return axios.post(API_URL + "all", { username }).then((response) => {
      return response.data;
    });
  }

  async getIncomeByMonth(username, year, month) {
    return axios
      .post(API_URL + "total/month", { username, year, month })
      .then((response) => {
        return response.data;
      });
  }

  async addIncome(
    username,
    category,
    recorddate,
    recordyear,
    recordmonth,
    amount,
    notes
  ) {
    return axios
      .post(API_URL + "add", {
        username,
        category,
        recorddate,
        recordyear,
        recordmonth,
        amount,
        notes,
      })
      .then((response) => {
        return response;
      });
  }

  async getIncomeByMonthCat(username, year, month) {
    return axios
      .post(API_URL + "month/category/all", {
        username,
        year,
        month,
      })
      .then((response) => {
        return response;
      });
  }

  async getIncomeByDate(username, recorddate) {
    return axios
      .post(API_URL + "date", { username, recorddate })
      .then((response) => {
        return response.data;
      });
  }

  async getSumIncomeByMon(username, year, month) {
    return axios
      .post(API_URL + "sum/day", { username, year, month })
      .then((response) => {
        return response.data;
      });
  }

  async deleteIncome(id) {
    return axios
      .delete(API_URL + "delete", { data: { id: id } })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async updateIncome(updateData) {
    return axios
      .put(API_URL + "update", { updateData })
      .then((response) => {
        return response.data.message;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new IncomeService();
