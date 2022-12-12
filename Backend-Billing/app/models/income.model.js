module.exports = (sequelize, Sequelize) => {
  const Income = sequelize.define("income", {
    // iid: {
    //   type: Sequelize.INTEGER,
    //   autoIncrement: true,
    // },
    username: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    },
    recorddate: {
      type: Sequelize.DATEONLY,
    },
    recordyear: {
      type: Sequelize.INTEGER,
    },
    recordmonth: {
      type: Sequelize.INTEGER,
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
    },
    notes: {
      type: Sequelize.TEXT,
    },
  });

  return Income;
};
