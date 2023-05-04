'use strict';
const { Validator,Model } = require('sequelize');
const bcrypt = require("bcryptjs");


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Pantry,{
        foreignKey: "userId",
        onDelete:"CASCADE",
        hooks:true
      })
    }
  }

  User.init({
    fname:{
     type: DataTypes.STRING,
     allowNull:false,
     validate:{
      len:[3,30],
      isNotEmail(value){
        if(Validator.isEmail(value)){
          throw new Error('Cannot be an email.');
        }
      },
     },
    },
    lname:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
       len:[3,30],
       isNotEmail(value){
         if(Validator.isEmail(value)){
           throw new Error('Cannot be an email.');
         }
       },
      },
     },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,256]
      }
    },
    hashedPassword:{
    type:DataTypes.STRING.BINARY,
    allowNull:false,
  validate:{len:[60,60]
  },
},

  },
  {
    sequelize,
    modelName: 'User',
  },
  {
    defaultScope:{
    attributes:{
      exclude:['hashedPassword','email','createdAt','updatedAt']
    },
  },
  scopes:{
  // currentUser:{
  //     attributes:{exclude:['hashedPassword']},
  //   },
  // loginUser:{attributes:{}
  // },
  },
},
   
  );

  User.addScope('loginUser',{
    attributes:{},
  },)
  User.addScope('currentUser',{
    attributes:{exclude:['hashedPassword']},
  },)
  User.prototype.toSafeObject = function () {
    // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope("currentUser").findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require("sequelize");
    const user = await User.scope("loginUser").findOne({
      where: {
        [Op.or]: {
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  };

  User.signup = async function ({
    email,
    password,
    firstName,
    lastName,
  }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      email,
      hashedPassword,
      fname:firstName,
      lname:lastName,
    });
    return await User.scope("currentUser").findByPk(user.id);
  };

  return User;
};