var https = require('https');
var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
	start: function () {
		console.log('MMM-JenkinsStatus helper started...');
	},

	getJson: function (config) {
		var self = this;
		
		var url = config.url;
		
		request({ url: url, method: 'GET' }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var json = JSON.parse(body);
				var jobResult = {
					result : json.result
				};
				self.sendSocketNotification("MMM-JenkinsStatus_JSON_RESULT", {url: config.url, data: jobResult});
			}
		});
			
	},

	//Subclass socketNotificationReceived received.
	socketNotificationReceived: function (notification, config) {
		if (notification === "MMM-JenkinsStatus_GET_JSON") {
			this.getJson(config);
		}
	}
});