exports.loadWebservice = function(o, tries) {
	if (utils.checkInternetConnection()) {
		var ANActivityIndicator = require('/utils/ANActivityIndicator');
		var info = new ANActivityIndicator("Loading...");
		info.show();
		var xhr = Titanium.Network.createHTTPClient();
		tries = tries || 0;
		xhr.open('POST', o.url);
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setTimeout(60000);
		Ti.API.info(o.reqParams);
		xhr.ontimeout = function() {
			utils.showAlertWithMessage("Connection Timed out!!!. Make sure you have a network connection and try again.");

		};
		xhr.onload = function(e) {
			Ti.API.info(this.responseText);
			var res = this.responseText;
			if (res === null) {
				if (tries < 1) {
					tries++;
					exports.loadWebservice(o, tries);
					return;
				} else {
					utils.showAlertWithMessage("Error reading data. Make sure you have a network connection and try again.");
					if (o.error) {
						o.error();
					}
					return;
				}

			}
			var responseJSON = null;
			try {
				var reg = /\\/g;
				//var reg = /[a-zA-Z0-9]/g;
				var res = this.responseText.replace(reg, "");
				var response=utils.repairJSON(res);
				//var res1 = this.responseText.replace("...", "..");
				responseJSON = JSON.parse(response);
				//Ti.API.info(text1);
				/*if (responseJSON.data == null) {
				 throw "Error reading data. Make sure you have a network connection and try again.";
				 } else {

				 }*/

			} catch(e) {
				info.hide();
				responseJSON = null;
				//utils.showAlertWithMessage("Error reading data.");
			}

			if (responseJSON == null) {
				//utils.showAlertWithMessage("Error reading data. Make sure you have a network connection and try again.");
				info.hide();
			} else {
				if (o.success) {
					o.success(responseJSON, info);
				}
			}

		};
		xhr.onerror = function(e) {
			info.hide();

			if (e.code == 0) {
				utils.showAlertWithMessage("Please check your internet connectivity");
				//return;
			} else if (e.code == 404 || e.code == 408 || e.code == 500) {
				utils.showAlertWithMessage("Failed to communicate with server. Please try again later.");
				//return;
			} else {
				utils.showAlertWithMessage("Request Timeout. Please check your internet connectivity");
				//return;
			}

			if (o.error) {
				o.error();
			}
		};

		if (o.start) {
			o.start();
		}
		xhr.send(o.reqParams);
	} else {
		utils.showAlertWithMessage('Please check your internet connectivity');
	}
};
