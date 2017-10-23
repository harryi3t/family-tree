module.exports = {
    one: function (id, cb) {
      Siblings.findOne({ id: id }).populate('personIds').exec(function (err, siblings) {
        if (err) {
          LogService.logError({
            error: err,
            meta: {
              errorType: 'dbError',
              location: 'SiblingService',
              method: 'one',
              id: id
            }
          });
        }

        return cb(err, siblings);
      });
    },

    find: function (criteria, cb) {
      Siblings.find(criteria).populate('personIds').exec(function (err, arrayOfSiblings) {
        if (err) {
          LogService.logError({
            error: err,
            meta: {
              errorType: 'dbError',
              location: 'SiblingService',
              method: 'find',
              criteria: criteria
            }
          });
        }

        return cb(err, arrayOfSiblings);
      });
    },

    create: function (siblings, cb) {
      Siblings.create(siblings).exec(function (err, siblings) {
        if (err) {
          LogService.logError({
            error: err,
            meta: {
              errorType: 'dbError',
              location: 'SiblingService',
              method: 'create',
              siblings: siblings
            }
          });
        }

        return cb(err, siblings);
      });
    },

    update: function (id, siblings, cb) {
      var siblingsToUpdate = _.pick(siblings, ['personIds']);

      Siblings.update({ id: id }, siblingsToUpdate).exec(function (err, siblingsArray) {
        if (err) {
          LogService.logError({
            error: err,
            meta: {
              errorType: 'dbError',
              location: 'SiblingService',
              method: 'update',
              id: id,
              siblings: siblings
            }
          });
        }

        return cb(err, _.first(siblingsArray));
      });
    },

    destroy: function (id, cb) {
      Siblings.destroy({id: id}).exec(function (err, siblings) {
        if (err) {
          LogService.logError({
            error: err,
            meta: {
              errorType: 'dbError',
              location: 'SiblingService',
              method: 'destroy',
              id: id
            }
          });
        }

        return cb(err, siblings);
      });
    }
  };
