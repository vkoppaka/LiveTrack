var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var Tag = function(){

  var tagSchema = new Schema({
                          _id             : Schema.ObjectId,
                          name            : String
  });

  var _model = mongoose.model('Tag', tagSchema);
  var _all = function(callback) {
        _model.find({}, callback);
    };

    var _findById = function(id, callback) {
        _model.findOne({ _id: id }, callback);
    };

    var _save = function(tag, callback) {
        tag.save(callback);
    };

    var _remove = function(tag, callback) {
        tag.remove(callback);
    };

    return {
        all: _all,
        findById: _findById,
        save: _save,
        remove: _remove,
        model: _model
    };
} ();
module.exports = Tag;
