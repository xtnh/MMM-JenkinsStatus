'use strict';

Module.register("MMM-JenkinsStatus", {

	jsonData: null,

	// Default module config.
	defaults: {
		title: "",
		url: "",
		updateInterval: 900000 // 15 minutes
	},

	start: function () {
		this.getJson();
		this.scheduleUpdate();
	},

	scheduleUpdate: function () {
		var self = this;
		setInterval(function () {
			self.getJson();
		}, this.config.updateInterval);
	},

	// Request node_helper to get json from url
	getJson: function () {
		this.sendSocketNotification("MMM-JenkinsStatus_GET_JSON", this.config);
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "MMM-JenkinsStatus_JSON_RESULT") {
			// Only continue if the notification came from the request we made
			// This way we can load the module more than once
			if (payload.url === this.config.url)
			{
				this.jsonData = payload.data;
				this.updateDom(500);
			}
		}
	},

	// Override dom generator.
	getDom: function() {
		var self = this;
		var wrapper = document.createElement("div");
		wrapper.className = "small";
		
		if (!this.jsonData) {
			wrapper.innerHTML = "Awaiting Jenkins job data ...";
			return wrapper;
		}
		
		var name = this.jsonData.name; // currently unused ...
		var result = this.jsonData.result;

		var imgPath = "modules/MMM-JenkinsStatus/images/"+result+".png";
		wrapper.style = "white-space:nowrap; vertical-align:middle;background-image:url('"+imgPath+"'); height:32px; padding-left:36px; background-repeat:no-repeat;";
		wrapper.innerHTML = self.config.title;
		return wrapper;
	}

});