/**
 * Partnership.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      primaryKey: true
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
      type: 'array'
    }
  },

  beforeCreate: function(newPartnership, next) {
    Partnership.count().exec(function(err, count){
        if(err) next(err);
        else{
            newPartnership['id'] = count + 1;
            next(null);
        }
    })
  }
};

