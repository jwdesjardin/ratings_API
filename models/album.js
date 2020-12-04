'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Album extends Sequelize.Model {}
  Album.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    genre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    releaseDate: {
      type: Sequelize.DATE,
    },
    photoURL: {
      type: Sequelize.STRING,
    }
  }, { sequelize });

  
  Album.associate = (models) => {
    Album.belongsTo(models.Band); 
    Album.hasMany(models.Rating);        
      
  };

  return Album;
};