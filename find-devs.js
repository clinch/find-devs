var GitHubAPI = require('github');

var github = new GitHubAPI({
	version: "3.0.0",
	debug: true,
	protocol: "https"
});

github.search.users({q: "+location:Ottawa+language:PHP+followers:>10"}, function(err, results) {
	if (err != null) {
		console.log("ERROR: " + err);
	} else {
		for (var user in results) {
			console.log(user.login);
		}
	}
});
