module.exports = function(app) {
    // reports area
    app.get('/reports', function(req, res) {
        res.render('reports/', { title: 'reports' })
    });
    app.get('/reports/byversion', function(req, res) {
        res.render('reports/byversion', { title: 'reports' })
    });
}