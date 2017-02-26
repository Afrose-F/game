//To print value in console
exports.info = function(str) {
	Titanium.API.info(new Date() + ': ' + str);
};

exports.debug = function(str) {
	Titanium.API.debug(new Date() + ': ' + str);
};

//Display alert message With title
exports.showAlertWithMessage = function(alertmessage) {
	var commonAlert = Ti.UI.createAlertDialog({
		title : 'PFS',
		message : alertmessage,
		ok : 'OK'
	});
	commonAlert.show();
};

//Display alert message With title
exports.showAlertWithButton = function(alertmessage, listenerFn) {
	var commonAlert = Ti.UI.createAlertDialog({
		title : 'PFS',
		message : alertmessage,
		buttonNames : ['OK']
	});
	commonAlert.addEventListener('click', listenerFn);
	commonAlert.show();
};

//Check the network connection status
exports.checkInternetConnection = function() {
	return Ti.Network.online ? true : false;
};

//Check the ios os version
exports.isiOS7Plus = function() {
	// iOS-specific test
	if (Titanium.Platform.name == 'iPhone OS') {
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0], 10);

		// Can only test this support on a 3.2+ device
		if (major >= 7) {
			return true;
		}
	}
	return false;
};

//Invoke device default email client
exports.sendMail = function(subject, to, message) {
	var emailDialog = Titanium.UI.createEmailDialog();

	if (!emailDialog.isSupported()) {

		exports.showAlertWithMessage('The required feature is not available on your device');
		return;
	}
	emailDialog.toRecipients = to;

	emailDialog.setHtml(false);

	emailDialog.addEventListener('complete', function(e) {
		if (e.result == emailDialog.SENT) {
			if (Ti.Platform.osname != 'android') {
				exports.showAlertWithMessage("Message was sent");
			}
		} else {
			exports.showAlertWithMessage("Message was not sent");
		}
	});
	emailDialog.open();
};

//Send sms to all team members
exports.sendSMS = function(phone, message) {
	if (isAndroid) {

		Titanium.Platform.openURL('sms:' + phone.toString());
	} else {
		var module = require('com.omorandi');
		Ti.API.info("module is => " + module);

		//create the smsDialog object
		var smsDialog = module.createSMSDialog();
		//check if the feature is available on the device at hand
		if (!smsDialog.isSupported()) {
			//falls here when executed on iOS versions < 4.0 and in the emulator
			var a = Ti.UI.createAlertDialog({
				title : 'PFS',
				message : 'The required feature is not available on your device'
			});
			a.show();
		} else {
			//pre-populate the dialog with the info provided in the following properties
			smsDialog.recipients = phone;
			smsDialog.messageBody = '';

			//add an event listener for the 'complete' event, in order to be notified about the result of the operation
			smsDialog.addEventListener('complete', function(e) {
				Ti.API.info("Result: " + e.resultMessage);

				if (e.result == smsDialog.SENT) {
					//do something
				} else if (e.result == smsDialog.FAILED) {
					//do something else
				} else if (e.result == smsDialog.CANCELLED) {
					//don't bother
				}
			});

			//open the SMS dialog window with slide-up animation
			smsDialog.open({
				animated : true
			});
		}
	}

};

//Create and return labelview
exports.createLabelView = function(text) {
	return Ti.UI.createLabel({
		text : text,
		top : 10,
		right : 10,
		left : 10,
		bottom : 10,
		font : {
			fontSize : 16,
			fontWeight : 'normal'
		},
		color : "#3e3e3e",
		textAlign : 'center'

	});
};

exports.getRequiredDate = function(date) {
	var monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();
	// Use standard date methods
	var newdate = monthList[month] + ' ' + day + ", " + year;
	Ti.API.info("Date :" + newdate);
	return newdate;
};
exports.getformatAMPM = function(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	if (hours > 12) {
		hours = hours % 12;

	}
	if (hours == 0) {
		hours = 12;
	}
	//hours = hours ? hours : 12;
	// the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
};
exports.getUtcdate = function(date1, date2) {
	var day = date1.getDate();
	var month = date1.getMonth() + 1;
	var year = date1.getFullYear();
	var hours = date2.getHours();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	if (hours > 12) {
		hours = hours % 12;

	}
	if (hours == 0) {
		hours = 12;
	}
	//hours = hours ? hours : 12;
	var minutes = date2.getMinutes();
	minutes = minutes < 10 ? '0' + minutes : minutes;
	var seconds = date2.getSeconds();
	var newdate = month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds + " " + ampm;
	//alert(newdate);
	return newdate;
};
exports.isValidDate = function(date1, date2) {
	var day = date1.getDate();
	var month = date1.getMonth();
	var year = date1.getFullYear();
	var hours = date2.getHours();
	//var ampm = hours >= 12 ? 'PM' : 'AM';
	//hours = hours % 12;
	//hours = hours ? hours : 12;
	var minutes = date2.getMinutes();
	minutes = minutes < 10 ? '0' + minutes : minutes;
	var seconds = date2.getSeconds();
	var actdate = new Date(year, month, day, hours, minutes, seconds);

	var currdate = new Date();

	Ti.API.info(currdate.getTime() + " ...." + actdate.getTime());
	if (currdate.getTime() >= actdate.getTime()) {
		return false;
	} else {
		return true;
	}
	//var newdate = month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds + " " + ampm;

};
exports.getCurrentDate = function(date) {
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var hours = date.getHours();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12;
	var minutes = date.getMinutes();
	minutes = minutes < 10 ? '0' + minutes : minutes;
	var seconds = date.getSeconds();
	var newdate = month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds + " " + ampm;
	return newdate;
};

exports.getActivityDate = function(date) {
	var monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var suffixes = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "st"];

	var day = date.getDate();
	var dayname = date.getDay();
	var month = date.getMonth();
	var year = date.getFullYear();
	// Use standard date methods
	var newdate = weekdays[dayname] + ' ' + day + suffixes[day] + ' ' + monthList[month];
	Ti.API.info("Date :" + newdate);
	return newdate;
};
String.prototype.replaceArray = function(find, replace) {
	var replaceString = this;
	for (var i = 0; i < find.length; i++) {
		// global replacement
		var pos = replaceString.indexOf(find[i]);
		while (pos > -1) {
			replaceString = replaceString.replace(find[i], replace[i]);
			pos = replaceString.indexOf(find[i]);
		}
	}
	return replaceString;
};
exports.repairJSON = function(response) {

	var res = response;
	var find = ['":"', '","', '":{"', '"},"', '{"', '"}', '":[', '],"'];
	var replace = ["':'", "','", "':{'", "'},'", "{'", "'}", "':[", "],'"];
	resp = res.replaceArray(find, replace);
	//Ti.API.info(textT1);
	//var reg = /"/g;
	var resp1 = resp.replace(/["\\]/g, "");
	//Ti.API.info(resp);
	var text1 = resp1.replaceArray(replace, find);
	return text1;
};
exports.getCustomTableRow = function(msg) {
	var tableData = [];
	var row = Ti.UI.createTableViewRow({
		className : 'forumEvent', // used to improve table performance
		selectedBackgroundColor : '#f7f7f7',
		rowIndex : 0, // custom property, useful for determining the row during events
		height : Ti.UI.SIZE,
		

	});

	var lblTitle = Ti.UI.createLabel({
		color : '#5c5c5c',
		font : {
			fontFamily : 'HelveticaNeue-Light',
			fontSize : 22,
			fontWeight : 'normal'
		},
		text : msg,
		left : 15,
		top : 15,
		bottom : 15,
		right : 50,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		textAlign : 'left'
	});
	row.add(lblTitle);
	tableData.push(row);
	return tableData;
};
