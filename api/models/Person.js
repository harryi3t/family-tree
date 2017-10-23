/**
 * Person.js
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
    name: {
      type: 'string',
      required: true
    },
    gender: {
      type: 'string',
      enum: ['m', 'f'],
      defaultsTo: 'm'
    },
    partnership: {
      model: 'partnership'
    },
    siblings: {
      model: 'siblings',
      via: 'personIds'
    }
  },

  beforeCreate: function(newPerson, next){
    Person.count().exec(function(err, count){
        if(err) next(err);
        else{
            newPerson['id'] = count + 1;
            next(null);
        }
    })
  }
};

