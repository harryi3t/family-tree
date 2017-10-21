/**
 * Partnership.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'objectid',
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    husband: {
      model: 'person',
      via: 'partnership'
    },
    wife: {
      model: 'person',
      via: 'partnership'
    },
    children: {
      collection: 'person'
    }
  }
};

