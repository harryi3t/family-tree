/**
 * PartnershipController
 *
 * @description :: Server-side logic for managing Partnerships
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get: function (req, res) {
        PartnershipService.one(req.params.id, (err, partnership) => {
            if (!partnership && !err) {
                return res.json(404, {
                    err: "Not found"
                });
            }
            return res.json({err, partnership});
        });
    },

	getAll: function (req, res) {
        PartnershipService.find({}, (err, partnerships) => {
            return res.json({err, partnerships});
        });
    },

    create: function (req, res) {
        PartnershipService.create({
            husband: req.body.husband,
            wife: req.body.wife,
            // children: req.body.children
        }, (err, partnership) => {
            return res.json({err, partnership});
        });
    },

    update: function (req, res) {
        PartnershipService.update(req.params.id, req.body, (err, partnership) => {
            return res.json({err, partnership});
        })
    },

    delete: function (req, res) {
        PartnershipService.destroy(req.params.id, (err) => {
            return res.json({err});
        })
    }
};

