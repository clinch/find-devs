var GitHubAPI = require('github');
var prompt = require('prompt');

var github = new GitHubAPI({
	version: "3.0.0",
	//debug: true,
	protocol: "https"
});

// Configure and start the command line prompt
prompt.message = '';
prompt.delimiter = '';
prompt.start();

// https://www.npmjs.org/package/prompt
var prompts = {
	properties: {
		location: {
			required: true,
			description: 'Location of developer:'
		}, 
		minFollowers: {
			pattern: /^\d*$/,
			description: 'Minimum number of followers (Optional):',
			message: 'Whole numbers only.'
		},
		language: {
			description: 'Required language knowledge (Optional):',
			message: 'Developer must know this language'
		}
	}
};
prompt.get(prompts, function(err, result) {
                if (err != null) { console.log(err); return; }

		searchGitHub(result);
        }
);


/**
 * Searches GitHub using the query parameters provided by user. 
 * With each developer returned by the search, we then look up full details.
 * 
 * @param queryParams:	An object containing search criteria.
 */
function searchGitHub(queryParams) {

	// Start blank because we don't care about the username (we want all)
	var query = '';
	query += '+type:User';
	query += '+location:' + queryParams.location;
	if (queryParams.minFollowers != null && queryParams.minFollowers != '') {
		query += '+followers:>' + queryParams.minFollowers;
	}
	if (queryParams.language != null && queryParams.language != '') {
		query += '+language:' + queryParams.language;
	}

	github.search.users({q: query}, function(err, results) {
		if (err != null) {
			console.log("ERROR: " + err);
		} else {
			if (results.incomplete_results == true) {
				console.log("****\n**** WARNING: This is not a complete list!\n****\n");
			}
			for (var user in results.items) {
				userDetails(results.items[user].login);
			}
		}
	});
}

/**
 * Query GitHub for the complete user details based on login
 * 
 * @param login:	The string login representing the GitHub user.
 */
function userDetails(login) {

	github.user.getFrom({user: login}, function(err, result) {
		if (err != null) {
			console.log(err);
			return;
		}

		console.log("\n" + result.login + "\n(" + result.company + ")" );
	});
}
