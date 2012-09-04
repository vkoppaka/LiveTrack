var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var Version = function() {

    var versionSchema = new Schema({
        _id: Schema.ObjectId,
        name: String,
        versionnumber: String
    });

    var _model = mongoose.model('Version', versionSchema);
    var _all = function(callback) {
        _model.find({}, callback);
    };

    var _findById = function(id, callback) {
        _model.findOne({ _id: id }, callback);
    };

    var _save = function(version, callback) {
        version.save(callback);
    };

    var _remove = function(version, callback) {
        version.remove(callback);
    };

    return {
        all: _all,
        findById: _findById,
        save: _save,
        remove: _remove,
        model: _model
    };
} ();
module.exports = Version;
