/**
 * SiblingController
 *
 * @description :: Server-side logic for managing Siblings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    get: function (req, res) {
        SiblingService.one(req.params.id, (err, sibling) => {
            if (!sibling && !err) {
                return res.json(404, {
                    err: "Not found"
                });
            }
            return res.json({err, sibling});
        });
    },

	getAll: function (req, res) {
        SiblingService.find({}, (err, siblings) => {
            return res.json({err, siblings});
        });
    },

    create: function (req, res) {
        SiblingService.create({
            personIds: req.body.personIds
        }, (err, sibling) => {
            return res.json({err, sibling});
        });
    },

    update: function (req, res) {
        SiblingService.update(req.params.id, req.body, (err, sibling) => {
            return res.json({err, sibling});
        })
    },

    delete: function (req, res) {
        SiblingService.destroy(req.params.id, (err) => {
            return res.json({err});
        })
    }
};

