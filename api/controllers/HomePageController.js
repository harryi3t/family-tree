/**
 * PartnershipController
 *
 * @description :: Server-side logic for managing Partnerships
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var getPersonAndFamily = require('./FamilyController').getPersonAndFamily;
module.exports = {
	get: function (req, res) {
        var person = {
            id: req.params.id || 1
        };

        console.log(person)
        getPersonAndFamily(person, (err, person) => {
            if (!person) {
                return res.render('homepage', {message: 'You don\'t seem to have added your family. Please add one.'});
            }
            return res.render('homepage', {data: person});
        });
    }
};

