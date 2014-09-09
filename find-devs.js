var GitHubAPI = require('github');

var github = new GitHubAPI({
	version: "3.0.0",
	protocol: "https"
});

github.search.users({q: "+type:User+location:Ottawa+followers:>20"}, function(err, results) {
	if (err != null) {
		console.log("ERROR: " + err);
	} else {
		if (results.incomplete_results == true) {
			console.log("****\n**** WARNING: This is not a complete list!\n****\n");
		}
		for (var user in results.items) {
			console.log(results.items[user].login);
		}
	}
});
