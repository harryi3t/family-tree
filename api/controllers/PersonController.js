/**
 * PersonController
 *
 * @description :: Server-side logic for managing People
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    get: function (req, res) {
        PersonService.one(req.params.id, (err, person) => {
            if (!person && !err) {
                return res.json(404, {
                    err: "Not found"
                });
            }
            return res.json({err, person});
        });
    },

	getAll: function (req, res) {
        PersonService.find({}, (err, persons) => {
            return res.json({err, persons});
        });
    },

    create: function (req, res) {
        PersonService.create({
            name: req.body.name,
            gender: req.body.gender
        }, (err, person) => {
            return res.json({err, person});
        });
    },

    update: function (req, res) {
        PersonService.update(req.params.id, req.body, (err, person) => {
            return res.json({err, person});
        })
    },

    delete: function (req, res) {
        PersonService.destroy(req.params.id, (err) => {
            return res.json({err});
        })
    }
};

