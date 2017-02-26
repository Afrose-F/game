/*
 * Method: BiPageVisit
 *
 * Input: app_id, page_id, os_name, device_name
 *
 * Return:
 *
 * Purpose: This method will send the app_id, page_id, os_name and device_name; Returns the response
 *
 */
exports.BiCurrentPageVisit = function(pageid) {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST', BIPageVisitUrl);
	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setTimeout(30000);

	var ostype = null;
	if (osname == 'android') {
		ostype = "Android";
	} else {
		ostype = "IOS";
	}
	
	/* To execute the web service */
	xhr.send({
		'app_id' : "555586714d5f2b564a3f37a1",
		'page_id' : pageid,
		'os_name' : ostype,
		'device_name' : deviceName,
	});

	xhr.onload = function(e) {
		Ti.API.info("-------------------------BiPageVisit-----------------");		
	};

	/* Error Handler */

	xhr.onerror = function(e) {
		if (e.code == 0) {
			//alert("Unable to connect. Please check your internet connectivity.");
			return;
		} else if (e.code == 404 || e.code == 408 || e.code == 500) {
			//alert("Unable to connect. Failed to communicate with server. Please try again later");
			return;
		} else {
			//alert("Unable to connect. Failed to communicate with server. Please try again later");
			return;
		}
	};
	//return BiPageVisit(pageid);
};

/*
 * Method: BiAppDownloads
 *
 * Input: app_id, os_name, device_name
 *
 * Return:
 *
 * Purpose: This method will send the app_id, page_id, os_name and device_name; Returns the response
 *
 */
exports.BiAppVisit = function() {
	Ti.API.info("----------------------------------------BiApp---------------------------------");
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST', BIAppUrl);
	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setTimeout(30000);

	var ostype = null;
	if (osname == 'android') {
		ostype = "Android";
	} else {
		ostype = "IOS";
	}
	
	/* To execute the web service */
	xhr.send({
		'app_id' : "555586714d5f2b564a3f37a1",
		'os_name' : ostype,
		'device_name' : deviceName,

	});

	xhr.onload = function(e) {
		Ti.App.Properties.setBool("servicecall", true);
		
	};

	/* Error Handler */

	xhr.onerror = function(e) {
		if (e.code == 0) {
			//alert("Unable to connect. Please check your internet connectivity.");
			return;
		} else if (e.code == 404 || e.code == 408 || e.code == 500) {
			//alert("Unable to connect. Failed to communicate with server. Please try again later");
			return;
		} else {
			//alert("Unable to connect. Failed to communicate with server. Please try again later");
			return;
		}
	};
	//return BiApp();
};
