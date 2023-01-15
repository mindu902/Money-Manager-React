const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Expense = db.expense;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");
const { sequelize } = require("../models");

//get all the expense data of the user
exports.getExpenseByUser = (req, res) => {
  console.log(req.body);
  Expense.findAll({
    where: {
      username: req.body.username,
    },
    attributes: [
      "id",
      "category",
      "recorddate",
      "amount",
      "notes",
      [sequelize.literal("'Expense'"), "datatype"],
    ],
  })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//return the total expense amount given year and month
exports.getExpenseByMonth = (req, res) => {
  console.log(req.body);
  Expense.findAll({
    where: {
      username: req.body.username,
      recordyear: req.body.year,
      recordmonth: req.body.month,
    },
    attributes: [[Sequelize.fn("SUM", Sequelize.col("amount")), "amounts"]],
  })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//add expense record
exports.addExpense = (req, res) => {
  console.log(req.body);
  Expense.create({
    username: req.body.username,
    category: req.body.category,
    recorddate: req.body.recorddate,
    recordyear: req.body.recordyear,
    recordmonth: req.body.recordmonth,
    amount: req.body.amount,
    notes: req.body.notes,
  })
    .then((expense) => {
      res.status(200).send({ message: "expense has been added!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//get all expense record given year and month
exports.getAllExpenseByMonth = (req, res) => {
  console.log(req.body);
  Expense.findAll({
    where: {
      username: req.body.username,
      recordyear: req.body.year,
      recordmonth: req.body.month,
    },
    attributes: [
      "id",
      "category",
      "recorddate",
      "amount",
      "notes",
      [sequelize.literal("'Expense'"), "datatype"],
    ],
  })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//get all expense record given year and month
exports.getExpenseByMonthCat = (req, res) => {
  console.log(req.body);
  Expense.findAll({
    where: {
      username: req.body.username,
      recordyear: req.body.year,
      recordmonth: req.body.month,
    },
    attributes: [
      "category",
      [Sequelize.fn("SUM", Sequelize.col("amount")), "amounts"],
    ],
    group: ["category"],
  })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getExpenseByDate = (req, res) => {
  console.log(req.body);
  Expense.findAll({
    where: {
      username: req.body.username,
      recorddate: req.body.recorddate,
    },
    attributes: [
      "id",
      "category",
      "recorddate",
      "amount",
      "notes",
      [sequelize.literal("'Expense'"), "datatype"],
    ],
  })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//get sum of each day's expense given year and month
exports.getSumExpenseByMon = (req, res) => {
  console.log(req.body);
  Expense.findAll({
    where: {
      username: req.body.username,
      recordyear: req.body.year,
      recordmonth: req.body.month,
    },
    attributes: [
      "recorddate",
      [Sequelize.fn("SUM", Sequelize.col("amount")), "amounts"],
    ],
    group: ["recorddate"],
  })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteExpensebyID = (req, res) => {
  console.log(req);
  Expense.destroy({
    where: {
      id: req.body.id,
    },
  })
    .then(() => {
      res.status(200).json({
        message: "Expense deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateExpensebyID = (req, res) => {
  console.log("hehe", req.body.updateData);
  Expense.update(req.body.updateData, { where: { id: req.body.updateData.id } })
    .then(() => {
      res.status(200).json({
        message: "Expense updated successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
