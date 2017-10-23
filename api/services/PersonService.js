module.exports = {
    one: function (id, cb) {
      Person.findOne({ id: id })
        .populate('partnership').populate('siblings').exec(function (err, person) {
          if (err) {
            LogService.logError({
              error: err,
              meta: {
                errorType: 'dbError',
                location: 'PersonService',
                method: 'one',
                id: id
              }
            });
          }
          return cb(err, person);
        }
      );
    },

    find: function (criteria, cb) {
      Person.find(criteria)
        .populate('partnership').populate('siblings').exec(function (err, persons) {
          if (err) {
            LogService.logError({
              error: err,
              meta: {
                errorType: 'dbError',
                location: 'PersonService',
                method: 'find',
                criteria: criteria
              }
            });
          }

          return cb(err, persons);
        }
      );
    },

    create: function (person, cb) {
      Person.create(person).exec(function (err, person) {
        if (err) {
          LogService.logError({
            error: err,
            meta: {
              errorType: 'dbError',
              location: 'PersonService',
              method: 'create',
              person: person
            }
          });
        }

        return cb(err, person);
      });
    },

    update: function (id, person, cb) {
      var personToUpdate = _.pick(person, ['name', 'gender', 'partnership', 'siblings']);

      Person.update({ id: id }, personToUpdate).exec(function (err, persons) {
        if (err) {
          LogService.logError({
            error: err,
            meta: {
              errorType: 'dbError',
              location: 'PersonService',
              method: 'update',
              id: id,
              person: person
            }
          });
        }

        return cb(err, _.first(persons));
      });
    },

    destroy: function (id, cb) {
      Person.destroy({id: id}).exec(function (err, person) {
        if (err) {
          LogService.logError({
            error: err,
            meta: {
              errorType: 'dbError',
              location: 'PersonService',
              method: 'destroy',
              id: id
            }
          });
        }

        return cb(err, person);
      });
    }
  };
