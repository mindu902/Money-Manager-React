const controller = require("../controllers/expense.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/expense/all", controller.getExpenseByUser);

  app.post("/api/expense/total/month", controller.getExpenseByMonth);

  app.post("/api/expense/add", controller.addExpense);

  app.post("/api/expense/month/all", controller.getAllExpenseByMonth);

  app.post("/api/expense/month/category/all", controller.getExpenseByMonthCat);

  app.post("/api/expense/date", controller.getExpenseByDate);

  app.post("/api/expense/sum/day", controller.getSumExpenseByMon);

  app.delete("/api/expense/delete", controller.deleteExpensebyID);

  app.put("/api/expense/update", controller.updateExpensebyID);
};
