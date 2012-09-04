var Sites = require('../models/sites');
var Versions = require('../models/versions');
var Tags = require('../models/tags');

module.exports = function(app) {
    app.get('/sites', function(req, res) {
        Sites.all(function(err, docs) {
            res.render('sites/index', { siteList: docs, title: "Sites list" });
        });
    });
    app.get('/sites/api/numberoflivesites', function(req, res) {
        Sites.getCount(function(err, docs) {
            res.send(JSON.stringify(docs));
        });
    });
    app.get('/sites/bytag/:tagName', function(req, res) {
        var tagName = req.params.tagName;
        Sites.findByTag(tagName, function(err, docs) {
            res.render('sites/index', { siteList: docs, title: "Sites list" });
        });
    });
    app.get('/site/create', function(req, res) {
        Versions.all(function(err, docs) {
            res.render('sites/create', { versionList: docs, title: "Create new site" });
        });

    });
    app.post('/site/create', function(req, res) {
        var site = new Sites.model();
        var postedSite = req.body.site;
        site.name = postedSite.name;
        site.url = "http://" + postedSite.siteurl;
        site.version = postedSite.sfversion;
        site.comments = postedSite.comments;
        site.tags = postedSite.tags;

        Sites.save(site, function() {
            res.redirect('/sites');
        })
    });
    app.get('/site/edit/:id', function(req, res) {
        var id = req.params.id;

        Sites.findById(id, function(err, doc) {
            Versions.all(function(err, docs) {
                res.render('sites/edit', { site: doc, versionList: docs, title: "Create new site" });
            });
        });
    });
    app.get('/site/delete/:id', function(req, res) {
        var id = req.params.id;

        Sites.findById(id, function(err, doc) {
            res.render('sites/delete', { version: doc, title: "Site Detail" });
        });
    });
    app.put('/site/save/:id', function(req, res) {
        var id = req.params.id;

        Sites.findById(id, function(err, doc) {
            doc.name = req.body.version.name;
            doc.versionnumber = req.body.version.versionnumber;
            Versions.save(doc, function() {
                res.redirect('/sites');
            })
        });
    });
    app.del('/site/delete/:id', function(req, res) {
        var id = req.params.id;

        Sites.findById(id, function(err, doc) {
            Sites.remove(doc, function() {
                res.redirect('/sites');
            })
        });
    });
}