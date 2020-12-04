'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Rating extends Sequelize.Model {}
  Rating.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    score: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  }, { sequelize });

  Rating.associate = (models) => {
    Rating.belongsTo(models.User);    
    Rating.belongsTo(models.Album);    
  };

  return Rating;
};