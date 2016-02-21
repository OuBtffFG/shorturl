'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var urls=require(path+'/app/controllers/urlHandler.server.js');

module.exports = function (app, passport) {
console.log("trying to find the route");
	app.use('/new/', function (req, res){
			console.log("need to shorten this url");
			urls.shorten(req.path.substr(1), function(err, data){
				if (err){
					throw err;
				} else {
					console.log(data);
					res.send(data);
				}
			});
		});

	app.route('/:goURL')
		.all(function (req, res){
			console.log("need to redirect to a new URL for URLnum: "+req.params.goURL);
			var uNum=parseInt(req.params.goURL);
			urls.convert(uNum, function(err, data){
				if (err){
					throw err;
				} else {
					// returns original url
					console.log("redirecting to " + data);
					res.redirect(data);
				}
			});
		});
		
/* OLD CODE
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
*/
};