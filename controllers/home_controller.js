module.exports.home = function(req, res) {
    return res.render('home', {
        title: "Home"
    });
}
//module.exports.functionName = function(req, res) {}