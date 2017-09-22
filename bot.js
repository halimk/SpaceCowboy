console.log("hello");

var Twit = require("twit");

var config = require('./config');
var T = new Twit(config);

var stream = T.stream('user');

stream.on('follow', followed);


var trashTalk = ['Get your scores up son',
                 'You will be destroyed!!',
                 "Let's see your skills",
                 'Where you at',
                 "Bet you can't make it past level 1",
                 "Why are you even playing?!?",
                 "What are you new?!",
                 "I remember my first game",
                 "My grandmother plays better and she's blind!!",
                 "GOML",
                 "You got nothin on Xanthrax",
                 ];

function followed(eventMsg){
	var random = Math.floor(Math.random() * trashTalk.length);

	console.log(eventMsg.source);
	

	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	sendTweet("@" + screenName + " " + trashTalk[random] + " https://benjamindanis.github.io/SpaceCowboy/");
	console.log("follow event: " + screenName);
}

function mentioned(eventMsg){
	var random = Math.floor(Math.random() * trashTalk.length);

	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	sendTweet('@'+ screeName + " " + trashTalk[random]);

	console.log("mention event: " + screenName);

}


function sendTweet(txt){
	var tweet = {
		status: txt
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response){
		console.log(data);
		if(err){
			console.log(err);
		}
		else{
			console.log("it worked!");
		}

	}
}

// var params = {
// 	q: 'rutgers',
// 	count: 2
// }

// T.get('search/tweets', params, gotData);

// function gotData(err, data, response){
// 	var tweets = data.statuses;
// 	for (var i = 0; i < tweets.length; i++) {
// 		console.log(tweets[i].text);
// 	}


// }