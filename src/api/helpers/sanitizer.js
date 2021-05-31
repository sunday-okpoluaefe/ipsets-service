/**
 * Helper Sanitizer functions
 */
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.Sanitizer = {
  /**
     * Check if argument is integer
     * Cast argument to number
     * @param {String} num
     * @returns {Number}
     */
  isInteger: (num) => {
    if (num === null) return null;

    if (Number.isInteger(+num)) return true;
    return null;
  },

  /**
     * Check if argument is email
     * @param {String} email
     * @returns {Boolean}
     */
  isEmail: (email) => {
    const { error } = Joi.string().email().validate(email);
    if (error) return null;
    return true;
  },

  /**
     * Check if argument is array
     * @param {Array} arr
     * @returns {Boolean}
     */
  isArray: (arr) => Array.isArray(arr),

  /**
     * Check if argument is ISO Date
     * Cast argument to ISO Date
     * @param {String} date
     * @returns {Date}
     */
  isISODate: (date) => {
    const { error, value } = Joi.date().iso().validate(date);
    if (error) return null;
    return value;
  },

  /**
     * Check if argument is ObjectId
     * @param {String}dateString
     * @returns {boolean}
     */
  isMinor: (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      // eslint-disable-next-line no-plusplus
      age--;
    }

    return age < 18;
  },

  /**
     * Check if argument is ObjectId
     * @param {String} id
     * @returns {ObjectId}
     */
  isObjectId: (id) => {
    const { error, value } = Joi.objectId().validate(id);
    if (error) return null;
    return value;
  },
};
