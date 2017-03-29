exports.LoadRemoteImage = function(RemoteImage, url) {

	var xhr = Titanium.Network.createHTTPClient({
		
		timeout : 1000000
	});

	xhr.onload = function(e) {

		Ti.API.info('image data1=' + this.responseData);
		RemoteImage.image = this.responseData;
	};

	xhr.error = function() {
		alert("Well, that didn't work");
	};

	xhr.open('GET', url);
	xhr.send();

};

