import axios from "axios";

const API_URL = "http://localhost:8080/api/expense/";

class ExpenseService {
  async getAllExpense(username) {
    return axios.post(API_URL + "all", { username }).then((response) => {
      return response.data;
    });
  }

  async getExpenseByMonth(username, year, month) {
    return axios
      .post(API_URL + "total/month", { username, year, month })
      .then((response) => {
        return response.data;
      });
  }

  async addExpense(
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

  async getExpenseByMonthCat(username, year, month) {
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

  async getExpenseByDate(username, recorddate) {
    return axios
      .post(API_URL + "date", { username, recorddate })
      .then((response) => {
        return response.data;
      });
  }

  async getSumExpenseByMon(username, year, month) {
    return axios
      .post(API_URL + "sum/day", { username, year, month })
      .then((response) => {
        return response.data;
      });
  }

  async deleteExpense(id) {
    return axios
      .delete(API_URL + "delete", { data: { id: id } })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async updateExpense(updateData) {
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

export default new ExpenseService();
