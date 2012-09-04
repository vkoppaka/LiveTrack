var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var Site = function() {

    var siteSchema = new Schema({
        _id: Schema.ObjectId,
        name: String,
        url: String,
        version: String,
        comments: String,
        tags: String
    });

    var _model = mongoose.model('Site', siteSchema);

    var _all = function(callback) {
        _model.find({}, callback);
    };

    var _getCount = function(callback) {
        _model.count({}, callback);
    };

    var _findByTag = function(tag, callback) {
        _model.find({ "tags": /.*tag.*/ }, callback);
    };

    var _findById = function(id, callback) {
        _model.findOne({ _id: id }, callback);
    };

    var _save = function(site, callback) {
        site.save(callback);
    };

    var _remove = function(site, callback) {
        site.remove(callback);
    };

    return {
        all: _all,
        getCount: _getCount,
        findByTag: _findByTag,
        findById: _findById,
        save: _save,
        remove: _remove,
        model: _model
    };
} ();
module.exports = Site;
