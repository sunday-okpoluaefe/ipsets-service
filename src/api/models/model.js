const _ = require('lodash');
const mongoose = require('mongoose');
const paginate = require('mongoose-aggregate-paginate-v2');
const { Pagination } = require('../helpers/pagination');

class Model {
  static create(name, schema) {
    Object.assign(schema.methods, methods);
    Object.assign(schema.statics, statics);

    schema.plugin(paginate);

    return mongoose.model(name, schema);
  }
}

module.exports.Model = Model;

/**
 * Helper methods for mongoose models
 */
const methods = {
  /**
     * Select keys from object
     * @param {Array} select
     * @returns {Object}
     */
  pick(...select) {
    return _.pick(this.getLean(), select);
  },

  /**
     * Omit keys from object
     * @param {Array} select
     * @returns {Object}
     */
  omit(...select) {
    return _.omit(this.getLean(), select);
  },

  getLean() {
    return this.toObject({ getters: true, flattenMaps: true });
  },

  /**
     * Update values of model
     * @param {Array} arr
     * @returns {Model}
     */
  patch(arr) {
    for (const key in arr) {
      if (Array.isArray(this[key])) {
        if (Array.isArray(arr[key])) {
          this[key] = arr[key];
        } else {
          this[key].push(...arr[key]);
        }
      } else this[key] = arr[key];
    }
    return this;
  },
};

/**
 * Static helper methods for mongoose models
 */
const statics = {
  /**
     * Find By Id
     * @param {*} id
     * @param preserveNull
     */
  async retrieveById(id) {
    // retrieve one by id
    const results = await this.retrieve({ match: { _id: mongoose.Types.ObjectId(id) } });
    if (!Array.isArray(results) || results.length !== 1) return null;
    return results[0];
  },

  /**
     * Find One
     * @param {Object} match
     * @param preserveNull
     * @returns {Object}
     */
  async retrieveOne(match, preserveNull) {
    // retrieve one
    const results = await this.retrieve({ match });
    if (!Array.isArray(results) || results.length < 1) return null;
    return results[0];
  },

  /**
     * Set retrieve aggregation
     * @param {Object} data
     * @param {Boolean} paged
     * @returns {Array}
     */
  initRetrieveAggregation(data) {
    const aggregation = [];
    const {
      skip, limit, order, sort,
    } = Pagination(data);

    if (data && data.match) aggregation.push({ $match: data.match });
    if (order) aggregation.push({ $sort: { createdAt: order } });
    if (sort) aggregation.push({ $sort: sort });
    if (skip) aggregation.push({ $skip: skip });
    if (limit) aggregation.push({ $limit: limit });

    return aggregation;
  },

  addLookupToAggregation(aggregation, data) {
    let {
      collection, model, localField, foreignField, asField, unwind, lookupLet, pipeline, match, project, reject, preserveNullAndEmptyArrays,
    } = data;
    if (model) {
      collection = mongoose.model(model).collection.collectionName;
      if (!localField) localField = model.toLowerCase();
    }

    if (!foreignField) foreignField = '_id';
    if (!asField) asField = localField;

    if (!lookupLet) lookupLet = { localField: `$${localField}` };

    if (!match) {
      match = {
        $match: {
          $expr: {
            $and: [
              { $eq: [`$${foreignField}`, '$$localField'] },
            ],
          },
        },
      };
    }

    if (!pipeline) pipeline = [match];

    if (project) pipeline.push({ $project: project });

    aggregation.push({
      $lookup: {
        from: collection,
        let: lookupLet,
        pipeline,
        as: asField,
      },
    });

    if (preserveNullAndEmptyArrays !== false) preserveNullAndEmptyArrays = true;

    if (unwind !== false) {
      aggregation.push({
        $unwind: {
          path: `$${asField}`,
          preserveNullAndEmptyArrays,
        },
      });
    }

    if (reject) aggregation.push({ $project: reject });
    return aggregation;
  },

  /**
     * Mongoose objectId
     * @param {String} id
     * @returns {ObjectId}
     */
  objectId(id) {
    return mongoose.Types.ObjectId(id);
  },

  /**
     * Get username
     * @param {String} username
     */
  async getUsername(username) {
    const docs = await this.find({ username: { $regex: new RegExp(`^${username}\\d*$`, 'i') } }).sort({ username: -1 });
    if (docs.length < 1) return username;

    if (!docs.find((doc) => doc.username === username)) return username;

    docs.sort((a, b) => {
      const patt = /\d+$/;
      const aMatch = a.username.match(patt);
      const bMatch = b.username.match(patt);

      const aEnding = (aMatch) ? parseInt(aMatch[0]) : 0;
      const bEnding = (bMatch) ? parseInt(bMatch[0]) : 0;

      return bEnding - aEnding;
    });

    const doc = docs[0];
    let count = 0;
    const match = doc.username.match(/\d+$/);
    if (match) count = parseInt(match[0]);

    return `${username}${++count}`;
  },
};
