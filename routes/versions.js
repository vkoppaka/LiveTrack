var Versions = require('../models/versions');

module.exports = function(app) {
    // reports area
    app.get('/versions', function(req, res) {
        Versions.all(function(err, docs) {
            res.render('versions/index', { versionList: docs, title: "Sitefinity Version list" });
        });
    });
    app.get('/version/create', function(req, res) {
        Versions.all(function(err, docs) {
            res.render('versions/create', { title: "Create new Sitefinity version" });
        });
    });
    app.post('/version/create', function(req, res) {
        var version = new Versions.model();
        version.name = req.body.version.name;
        version.versionnumber = req.body.version.versionnumber;

        Versions.save(version, function() {
            res.redirect('/versions');
        })
    });
    app.get('/version/edit/:id', function(req, res) {
        var id = req.params.id;

        Versions.findById(id, function(err, doc) {
            res.render('versions/edit', { version: doc, title: "Sitefinity Version Detail" });
        });
    });
    app.get('/version/delete/:id', function(req, res) {
        var id = req.params.id;

        Versions.findById(id, function(err, doc) {
            res.render('versions/delete', { version: doc, title: "Sitefinity Version Detail" });
        });
    });
    app.put('/version/save/:id', function(req, res) {
        var id = req.params.id;

        Versions.findById(id, function(err, doc) {
            doc.name = req.body.version.name;
            doc.versionnumber = req.body.version.versionnumber;
            Versions.save(doc,function(){
                res.redirect('/versions');
            })
        });
    });
    app.del('/version/delete/:id', function(req, res) {
        var id = req.params.id;

        Versions.findById(id, function(err, doc) {
            Versions.remove(doc,function(){
                res.redirect('/versions');
            })
        });
    });
}