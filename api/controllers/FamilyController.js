/**
 * FamilyController
 *
 * @description :: Server-side logic for managing Family
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var async = require('async');

function getPersonAndFamily(person, cb) {
    var personId = person.id;
    PersonService.one(personId, (err, person) => {
        if (!person && !err) {
            return cb('person not found with id: ' + personId);
        }
        if (person.partnership) {
            getPartnerAndChildren(person, (err, person) => {
                return cb(err, person);
            });
        }
        else {
            return cb(null, person);
        }
    });
}

function getPartnerAndChildren(person, cb) {
    PartnershipService.one(person.partnership.id, (err, partnership) => {
        if (!partnership && !err) {
            return cb('partnership not found with id: ' + partnership.id);
        }

        var husband = partnership.husband;
        husband.wife = partnership.wife;
        husband.children = [];

        async.each(partnership.children, (childId, next) => {
            getPersonAndFamily({id: childId}, (err, childFamily) => {
                husband.children.push(childFamily);
                return next();
            });
        }, (err) => {
            return cb(null, husband);
        });

    });
}

module.exports = {
    get: function (req, res) {
        var person = {
            id: req.params.personId
        };
        getPersonAndFamily(person, (err, person) => {
            if (!person) {
                return res.json(404, err || 'Not found');
            }
            else {
                return res.json(person);
            }
        });
    }
};
