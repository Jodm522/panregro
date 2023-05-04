'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ingredient.init({
    name: DataTypes.STRING,
    category: DataTypes.INTEGER,
    ozInCup: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Ingredient',
  });


Ingredient.add = async function({
  name,
  category,
  ozInCup,
}){
  const ingredient = await Ingredient.create({
    name,
    category,
    ozInCup
  });
  return ingredient
}

  return Ingredient;
};