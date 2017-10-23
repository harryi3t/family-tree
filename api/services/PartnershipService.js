module.exports = {
    one: function (id, cb) {
      Partnership.findOne({ id: id }).populate('husband').populate('wife').exec(function (err, partnership) {
        if (err) {
          LogService.logError({
            error: err,
            meta: {
              errorType: 'dbError',
              location: 'PartnershipService',
              method: 'one',
              id: id
            }
          });
        }

        return cb(err, partnership);
      });
    },

    find: function (criteria, cb) {
      Partnership.find(criteria).populate('husband').populate('wife').exec(function (err, partnerships) {
        if (err) {
          LogService.logError({
            error: err,
            meta: {
              errorType: 'dbError',
              location: 'PartnershipService',
              method: 'find',
              criteria: criteria
            }
          });
        }

        return cb(err, partnerships);
      });
    },

    findOne: function (criteria, cb) {
      Partnership.findOne(criteria).exec(function (err, partnership) {
        if (err) {
          LogService.logError({
            error: err,
            meta: {
              errorType: 'dbError',
              location: 'PartnershipService',
              method: 'findOne',
              criteria: criteria
            }
          });
        }

        return cb(err, partnership);
      });
    },

    create: function (partnership, cb) {
      Partnership.create(partnership).exec(function (err, partnership) {
        if (err) {
          LogService.logError({
            error: err,
            meta: {
              errorType: 'dbError',
              location: 'PartnershipService',
              method: 'create',
              partnership: partnership
            }
          });
        }

        return cb(err, partnership);
      });
    },

    update: function (id, partnership, cb) {
      var partnershipToUpdate = _.pick(partnership, ['husband', 'wife', 'children']);

      Partnership.update({ id: id }, partnershipToUpdate).exec(function (err, partnerships) {
        if (err) {
          LogService.logError({
            error: err,
            meta: {
              errorType: 'dbError',
              location: 'PartnershipService',
              method: 'update',
              id: id,
              partnership: partnership
            }
          });
        }

        return cb(err, _.first(partnerships));
      });
    },

    destroy: function (id, cb) {
      Partnership.destroy({id: id}).exec(function (err, partnership) {
        if (err) {
          LogService.logError({
            error: err,
            meta: {
              errorType: 'dbError',
              location: 'PartnershipService',
              method: 'destroy',
              id: id
            }
          });
        }

        return cb(err, partnership);
      });
    }
  };
