'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PanItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PanItem.belongsTo(models.Pantry,{foreignKey:"pantryId"}),
      PanItem.belongsTo(models.Ingredient,{foreignKey:"itemId"})
    }
  }
  PanItem.init({
    itemId: DataTypes.INTEGER,
    pantryId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PanItem',
  });
  return PanItem;
};