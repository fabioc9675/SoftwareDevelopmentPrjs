var Sequelize = require("sequelize"); //import sequelize
var database = require("./database"); // importing connection database
const bcrypt = require("bcrypt"); // Use to encryp or hash the password

var User = database.define(
  "USERs",
  {
    USER_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    USER_NAME: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false,
      unique: true,
      validate: {
        is: /^[a-z]+$/i, // matches this RegExp
        notNull: { args: [true], msg: "Username cannot be null" }, // won't allow null
        notEmpty: { args: [true], msg: "Username cannot be empty" }, // don't allow empty strings
        len: { args: [5, 40], msg: "Username length must be greater than 5" }, // only allow values with length between 2 and 10
      },
    },
    USER_PASS: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: { args: [true], msg: "Password cannot be null" }, // won't allow null
        notEmpty: { args: [true], msg: "Password cannot be empty" }, // don't allow empty strings
        len: { args: [5, 40], msg: "Password length must be greater than 5" }, // only allow values with length between 2 and 10
      },
    },
    USER_TOKEN: Sequelize.STRING,
    USER_MAIL: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { args: [true], msg: "Email is invalid" },
      },
    },
  },
  {
    hooks: {
      // provdide events in the interaction with database
      beforeValidate: function () {
        console.log("before Validate");
      },
      afterValidate: function (req) {
        console.log("after Validate");
        console.log(req.dataValues.USER_NAME);
      },
      beforeCreate: function (req) {
        console.log("before Create");
        console.log(req.dataValues.USER_MAIL);
      },
      afterCreate: function () {
        console.log("after Create");
      },
      beforeSave: async function (req) {
        // crypting the password
        const salt = await bcrypt.genSalt();

        console.log("before Save");
        // console.log(req.dataValues.USER_PASS);
        // console.log(salt);

        req.dataValues.USER_PASS = await bcrypt.hash(
          req.dataValues.USER_PASS,
          salt
        );
        // console.log(req.dataValues.USER_PASS);
      },
      afterSave: function () {
        console.log("after Save");
      },
    },
  }
);

// static method to login user
User.login = async function (username, userpass, usermail) {
  console.log("Hola Fabian");
  // console.log(username + ": " + userpass + ": " + usermail);

  // ask for user information
  const user = await this.findOne({
    where: { USER_NAME: username, USER_MAIL: usermail },
  });

  // compare password
  if (user) {
    console.log(user);
    const auth = await bcrypt.compare(userpass, user.USER_PASS);
    // if thre is authentication
    if (auth) {
      console.log("correct password");
      return user;
    }
    throw Error("incorrect Password");
  }
  throw Error("incorrect User or Email");
};

module.exports = User;

/* 
https://sequelize.org/master/manual/validations-and-constraints.html
sequelize.define('foo', {
  bar: {
    type: DataTypes.STRING,
    validate: {
      is: /^[a-z]+$/i,          // matches this RegExp
      is: ["^[a-z]+$",'i'],     // same as above, but constructing the RegExp from a string
      not: /^[a-z]+$/i,         // does not match this RegExp
      not: ["^[a-z]+$",'i'],    // same as above, but constructing the RegExp from a string
      isEmail: true,            // checks for email format (foo@bar.com)
      isUrl: true,              // checks for url format (http://foo.com)
      isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
      isIPv4: true,             // checks for IPv4 (129.89.23.1)
      isIPv6: true,             // checks for IPv6 format
      isAlpha: true,            // will only allow letters
      isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
      isNumeric: true,          // will only allow numbers
      isInt: true,              // checks for valid integers
      isFloat: true,            // checks for valid floating point numbers
      isDecimal: true,          // checks for any numbers
      isLowercase: true,        // checks for lowercase
      isUppercase: true,        // checks for uppercase
      notNull: true,            // won't allow null
      isNull: true,             // only allows null
      notEmpty: true,           // don't allow empty strings
      equals: 'specific value', // only allow a specific value
      contains: 'foo',          // force specific substrings
      notIn: [['foo', 'bar']],  // check the value is not one of these
      isIn: [['foo', 'bar']],   // check the value is one of these
      notContains: 'bar',       // don't allow specific substrings
      len: [2,10],              // only allow values with length between 2 and 10
      isUUID: 4,                // only allow uuids
      isDate: true,             // only allow date strings
      isAfter: "2011-11-05",    // only allow date strings after a specific date
      isBefore: "2011-11-05",   // only allow date strings before a specific date
      max: 23,                  // only allow values <= 23
      min: 23,                  // only allow values >= 23
      isCreditCard: true,       // check for valid credit card numbers

      // Examples of custom validators:
      isEven(value) {
        if (parseInt(value) % 2 !== 0) {
          throw new Error('Only even values are allowed!');
        }
      }
      isGreaterThanOtherField(value) {
        if (parseInt(value) <= parseInt(this.otherField)) {
          throw new Error('Bar must be greater than otherField.');
        }
      }
    }
  }
});
*/
