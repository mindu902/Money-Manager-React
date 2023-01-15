const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Income = db.income;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");
const { sequelize } = require("../models");

exports.getIncomeByUser = (req, res) => {
  console.log(req.body);
  Income.findAll({
    where: {
      username: req.body.username,
    },
    attributes: [
      "id",
      "category",
      "recorddate",
      "amount",
      "notes",
      [sequelize.literal("'Income'"), "datatype"],
    ],
  })
    .then((income) => {
      res.json(income);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getIncomeByMonth = (req, res) => {
  console.log(req.body);
  Income.findAll({
    where: {
      username: req.body.username,
      recordyear: req.body.year,
      recordmonth: req.body.month,
    },
    attributes: [[Sequelize.fn("SUM", Sequelize.col("amount")), "amounts"]],
  })
    .then((income) => {
      res.json(income);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.addIncome = (req, res) => {
  console.log(req.body);
  Income.create({
    username: req.body.username,
    category: req.body.category,
    recorddate: req.body.recorddate,
    recordyear: req.body.recordyear,
    recordmonth: req.body.recordmonth,
    amount: req.body.amount,
    notes: req.body.notes,
  })
    .then((income) => {
      res.status(200).send({ message: "Income has been added!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//get all Income record given year and month
exports.getAllIncomeByMonth = (req, res) => {
  console.log(req.body);
  Income.findAll({
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
      [sequelize.literal("'Income'"), "datatype"],
    ],
  })
    .then((income) => {
      res.status(200).send({ message: "Success", data: res.json(income) });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//get all income record given year and month
exports.getIncomeByMonthCat = (req, res) => {
  console.log(req.body);
  Income.findAll({
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
    .then((income) => {
      res.json(income);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getIncomeByDate = (req, res) => {
  console.log(req.body);
  Income.findAll({
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
      [sequelize.literal("'Income'"), "datatype"],
    ],
  })
    .then((income) => {
      res.json(income);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//get sum of each day's income given year and month
exports.getSumIncomeByMon = (req, res) => {
  console.log(req.body);
  Income.findAll({
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
    .then((income) => {
      res.json(income);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteIncomebyID = (req, res) => {
  console.log(req);
  Income.destroy({
    where: {
      id: req.body.id,
    },
  })
    .then(() => {
      res.status(200).json({
        message: "Income deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateIncomebyID = (req, res) => {
  console.log("hehe", req.body.updateData);
  Income.update(req.body.updateData, { where: { id: req.body.updateData.id } })
    .then(() => {
      res.status(200).json({
        message: "Income updated successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
