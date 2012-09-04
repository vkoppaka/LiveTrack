var Tags = require('../models/tags');

module.exports = function(app) {
    // reports area
    app.get('/tags', function(req, res) {
        Tags.all(function(err, docs) {
            res.render('tags/index', { tagList: docs, title: "Tags list" });
        });
    });
    app.get('/tags/api/all', function(req, res) {
        Tags.all(function(err, docs) {
            res.send(docs);
        });
    });
    app.get('/tag/create', function(req, res) {
        Tags.all(function(err, docs) {
            res.render('tags/create', { title: "Create new Tag" });
        });
    });
    app.post('/tag/create', function(req, res) {
        var tag = new Tags.model();
        tag.name = req.body.tag.name;

        Tags.save(tag, function() {
            res.redirect('/tags');
        })
    });
    app.get('/tag/edit/:id', function(req, res) {
        var id = req.params.id;

        Tags.findById(id, function(err, doc) {
            res.render('tags/edit', { tag: doc, title: "Tag Detail" });
        });
    });
    app.get('/tag/delete/:id', function(req, res) {
        var id = req.params.id;

        Tags.findById(id, function(err, doc) {
            res.render('tags/delete', { tag: doc, title: "Tag Detail" });
        });
    });
    app.put('/tag/save/:id', function(req, res) {
        var id = req.params.id;

        Tags.findById(id, function(err, doc) {
            doc.name = req.body.tag.name;
            Tags.save(doc, function() {
                res.redirect('/tags');
            })
        });
    });
    app.del('/tag/delete/:id', function(req, res) {
        var id = req.params.id;

        Tags.findById(id, function(err, doc) {
            Tags.remove(doc, function() {
                res.redirect('/tags');
            })
        });
    });
}