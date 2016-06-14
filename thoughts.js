//Command-line install via npm install twit
var Twit = require('twit');

var T = new Twit({
	consumer_key:         'YOUR KEY HERE',
	consumer_secret:      'YOUR KEY HERE',
	access_token:         'YOUR ACCESS TOKEN HERE',
	access_token_secret:  'YOUR TOKEN SECRET HERE',
	timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

var keyword="shooting";			//search term for trending topics
var message="Thoughts and prayers to the victims of this senseless violence."; //text of post
var lastPost= new Date(); 		//initialize last post
 
setInterval(function(){
	var d = new Date();
	if ((d-lastPost)>(24*60*60*1000)){	//check to make sure it's been at least a day since last post
		T.get('trends/place', { id: '23424977', count: 10 }, function(err, data, response) {
			var trend_array=data[0]["trends"];		//get trends object array
			for(i=0;i<trend_array.length;i++){		//cycle through each trend
				var str=trend_array[i].name.toString();	//get the actual trending topic text
				if (str.indexOf(keyword) > -1){			//see if the keyword is in there
					//if so, post your sorrow
					T.post('statuses/update', { status: message }, function(err, data, response) {
						lastPost= new Date();			//reset the last post date
					})
				}
			  }
		})
	}
}, 60*60*1000 );	//check every hour     
