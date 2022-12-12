const controller = require("../controllers/income.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/income/all", controller.getIncomeByUser);

  app.post("/api/income/total/month", controller.getIncomeByMonth);

  app.post("/api/income/add", controller.addIncome);

  app.post("/api/income/month/all", controller.getAllIncomeByMonth);

  app.post("/api/income/month/category/all", controller.getIncomeByMonthCat);

  app.post("/api/income/date", controller.getIncomeByDate);

  app.post("/api/income/sum/day", controller.getSumIncomeByMon);
};
