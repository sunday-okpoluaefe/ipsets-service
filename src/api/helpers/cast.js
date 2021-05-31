/**
 * Helper Sanitizer functions
 */
const mongoose = require('mongoose');

module.exports.Cast = {
  /**
     * Cast argument to number
     * @param {String} num
     * @returns {Number}
     */
  number: (num) => Number(num),

  /**
     * Cast argument to ISO Date
     * @param {Date} date
     * @returns {Date}
     */
  isoDate: (date) => {
    const d = new Date(date);
    return d.toISOString();
  },

  /**
     * Cast argument to ObjectId
     * @param {String} id
     * @returns {ObjectId}
     */
  objectId: (id) => mongoose.Types.ObjectId(id),
};
