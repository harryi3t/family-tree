/**
 * Siblings.js
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
    personIds: {
      collection: 'person',
      via: 'siblings'
    }
  },

  beforeCreate: function(newSiblings, next) {
    Siblings.count().exec(function(err, count){
        if(err) next(err);
        else{
            newSiblings['id'] = count + 1;
            next(null);
        }
    })
  }
};

