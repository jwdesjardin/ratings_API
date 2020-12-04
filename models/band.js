'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Band extends Sequelize.Model {}
  Band.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING,
    },
  }, { sequelize });

  

  Band.associate = (models) => {   
    Band.hasMany(models.Album);    
  };

  return Band;
};