function ScheduleNewActivityView(teamId, type, teamName) {
	var acttime = new Date();
	actdate = new Date();
	var win = customviews.createWindow({
		layout : 'absolute'
	});
	//Title Bar
	win.add(new customtoolbar({
		title : "Back",
		isBack : true,
		listener : function() {
			var ActivityListWindow = require('/ui/common/ActivityListView');
			if (isAndroid) {
				new ActivityListWindow(teamId, type, teamName).open();
				win.close();
			} else {
				navWin.openWindow(new ActivityListWindow(teamId, type, teamName), {
					animated : true
				});
				navWin.closeWindow(win, {
					animated : true
				});
			}
		}
	}));

	win.addEventListener('android:back', function(e) {
		var ActivityListWindow = require('/ui/common/ActivityListView');
		new ActivityListWindow(teamId, type, teamName).open();
		win.close();
	});

	var contentView = customviews.contentView();

	var scrollView = customviews.createScrollView();

	//Header Label
	scrollView.add(customviews.createHeaderLabel("Schedule Activity"));

	scrollView.add(customviews.getSeparatorView());
	//Venue field
	/*var txtActivity = Ti.UI.createTextField({
	width : "90%",
	height : 40,
	textAlign : 'center',
	autocorrect : false,
	color : '#5c5c5c',
	borderColor : '#979797',
	hintTextColor : '#5c5c5c',
	backgroundColor : "transparent",
	borderRadius : 5,
	top : 20,
	hintText : "Activity name",
	value : "Activity name"
	});
	//scrollView.add(txtActivity);
	// Listen for click events.
	txtActivity.addEventListener('click', function() {
	//timepickerView.hide();
	//datepickerView.hide();
	//locpickerView.show();
	});
	txtActivity.addEventListener('focus', function(e) {
	if (this.value == "Activity name") {
	this.value = "";
	}
	});

	txtActivity.addEventListener('blur', function(e) {
	if (this.value == "")
	this.value = "Activity name";
	});*/
	//Venue field
	var txtVenue = Ti.UI.createTextField({
		width : "90%",
		height : 40,
		textAlign : 'center',
		autocorrect : false,
		color : '#5c5c5c',
		hintTextColor : '#5c5c5c',
		borderColor : '#979797',
		backgroundColor : "transparent",
		borderRadius : 5,
		top : 20,
		maxLength :100,
		hintText : "Venue",
		//value : "Venue",
	});
	scrollView.add(txtVenue);
	// Listen for click events.
	txtVenue.addEventListener('click', function() {
		timepickerView.hide();
		datepickerView.hide();
		//locpickerView.show();
	});
	txtVenue.addEventListener('focus', function(e) {
		timepickerView.hide();
		datepickerView.hide();
		/*if (this.value == "Venue") {
		 txtVenue.value = "";
		 }*/
	});

	txtVenue.addEventListener('blur', function(e) {
		/*if (this.value == "")
		 this.value = "Venue";*/
	});
	txtVenue.addEventListener('change', function(e) {
		if (e.value.length > 100) {
			txtVenue.value = e.value.substr(0, 99);
		}
	});
	//Date field
	var lblDate = Ti.UI.createLabel({
		width : "90%",
		height : 40,
		textAlign : 'center',
		//backgroundColor : "#fff",
		color : '#5c5c5c',
		borderColor : '#979797',
		borderRadius : 5,
		text : "Date",
		top : 20
	});
	scrollView.add(lblDate);

	// Listen for click events.
	lblDate.addEventListener('click', function() {
		txtVenue.blur();
		//txtActivity.blur();
		txtDescription.blur();
		if (isAndroid) {
			var adpicker = Ti.UI.createPicker({
				type : Ti.UI.PICKER_TYPE_DATE,
				minDate : new Date(),
				//maxDate : new Date(2014, 11, 31),
				value : new Date()
			});
			adpicker.showDatePickerDialog({
				//value : new Date(),
				callback : function(e) {
					if (e.cancel) {
						Ti.API.info('User canceled dialog');
					} else {
						Ti.API.info('User selected date: ' + e.value);
						var d = e.value;
						actdate = e.value;
						Ti.API.info('Date: ' + d.toString());
						Ti.API.info('Epoch: ' + d.getTime());
						Ti.API.info('Milliseconds: ' + d.getMilliseconds());
						Ti.API.info('Minutes: ' + d.getMinutes());
						lblDate.setText(utils.getRequiredDate(e.value));

					}
				}
			});
		} else {
			locpickerView.hide();
			timepickerView.hide();
			datepickerView.show();
		}

	});

	//Time field
	var lblTime = Ti.UI.createLabel({
		width : "90%",
		height : 40,
		textAlign : 'center',
		color : '#5c5c5c',
		borderColor : '#979797',
		//backgroundColor : "#fff",
		borderRadius : 5,
		text : "Time",
		top : 20
	});
	scrollView.add(lblTime);

	// Listen for click events.
	lblTime.addEventListener('click', function() {
		txtVenue.blur();
		//txtActivity.blur();
		txtDescription.blur();
		if (isAndroid) {
			var atpicker = Ti.UI.createPicker({
				type : Ti.UI.PICKER_TYPE_TIME,
				//minDate : new Date(2009, 0, 1),
				//maxDate : new Date(2014, 11, 31),
				//value : new Date(2014, 3, 12)
			});
			atpicker.showTimePickerDialog({
				//value : new Date(2015, 6, 1),
				callback : function(e) {
					if (e.cancel) {
						Ti.API.info('User canceled dialog');
					} else {
						Ti.API.info('User selected date: ' + e.value);
						var d = e.value;
						acttime = e.value;
						Ti.API.info('Date: ' + d.toString());
						Ti.API.info('Epoch: ' + d.getTime());
						Ti.API.info('Milliseconds: ' + d.getMilliseconds());
						Ti.API.info('Minutes: ' + d.getMinutes());
						lblTime.setText(utils.getformatAMPM(d));

					}
				}
			});
		} else {
			locpickerView.hide();
			datepickerView.hide();
			timepickerView.show();
		}

	});

	// Create a TextField for Activity Description
	var txtDescription = Ti.UI.createTextArea({
		height : 130,
		top : 20,
		width : '90%',
		value : 'Activity Description',
		autocorrect : false,
		color : '#5c5c5c',
		hintText : 'Activity Description',
		borderRadius : 5,
		paddingLeft : 10,
		paddingRight : 10,
		borderColor : '#979797',
		maxLength :250,
		backgroundColor : "transparent",
		//softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, // Android only
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		font : {
			fontSize : 16,
			fontWeight : 'normal'
		},
		//borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	txtDescription.addEventListener('focus', function(e) {
		if (this.value == 'Activity Description') {
			txtDescription.value = "";
		}
		timepickerView.hide();
		datepickerView.hide();
		locpickerView.hide();
	});
	txtDescription.addEventListener('change', function(e) {
		if (e.value.length > 250) {
			txtDescription.value = e.value.substr(0, 249);
		}
	});
	// Listen for return events.
	txtDescription.addEventListener('return', function(e) {
		txtDescription.blur();
		//alert('Input was: ' + txtDescription.value);
	});

	txtDescription.addEventListener('blur', function(e) {
		if (this.value == "")
			this.value = 'Activity Description';
	});
	// Add to the parent view.
	scrollView.add(txtDescription);

	// Create a Submit Button.
	var btnSubmit = Ti.UI.createButton({
		title : 'Schedule',
		height : 50,
		width : '90%',
		top : 40,
		bottom : 40,
		backgroundColor : '#266CA4',
		borderRadius : 5,
		color : '#fff',
		font : {
			fontSize : 18,
			fontWeight : 'bold'
		},

	});
	if (Ti.App.Properties.hasProperty("userid")) {
		userid = Ti.App.Properties.getString("userid");
		token = Ti.App.Properties.getString("token");
		password = Ti.App.Properties.getString("password");
	}
	
	// Listen for click events.
	btnSubmit.addEventListener('click', function() {
		var ven = txtVenue.value.trim();
		var venue = ven.replace(/["\\]/g, "");
		var des = txtDescription.value.trim();
		var desc = des.replace(/["\\]/g, "");
		var message = desc;
		//var activity = txtActivity.value.trim();
		var reportingtime = utils.getUtcdate(actdate, acttime);
		var isvalidDate = utils.isValidDate(actdate, acttime);
		//alert(reportingtime);
		//if (venue != "" && venue != "Venue" && message != "" && activity != "" && activity != "Activity name" && lblDate.text != "" && lblDate.text != "Date" && lblTime.text != "" && lblTime.text != "Time" && message != "Activity Description") {
		if (message != "" && lblDate.text != "" && lblDate.text != "Date" && lblTime.text != "" && lblTime.text != "Time" && message != "Activity Description") {
			if (isvalidDate) {
var j={
						'Type' : type,
						'TypeName' : teamName,
						'UserPFCID' : userid,
						'Activity' : message,
						'Venue' : venue,
						'Message' : "",
						'ReportingTime' : reportingtime,
						'ActivityPlannedID' : 0,
						'userID' : userid,
						'token' : token,
						'password' : password
				};
				Ti.API.info("test"+j);
				httpRequest.loadWebservice({
					url : newActivityUrl,
					reqParams : {
						'Type' : type,
						'TypeName' : teamName,
						'UserPFCID' : userid,
						'Activity' : message,
						'Venue' : venue,
						'Message' : "",
						'ReportingTime' : reportingtime,
						'ActivityPlannedID' : 0,
						'userID' : userid,
						'token' : token,
						'password' : password
					},
					success : function(responseJSON, info) {

						if (responseJSON.data.length > 0) {
							var ActivityListWindow = require('/ui/common/ActivityListView');
							info.hide();
							if (isAndroid) {
								new ActivityListWindow(teamId, type, teamName).open();
								win.close();
							} else {
								navWin.openWindow(new ActivityListWindow(teamId, type, teamName), {
									animated : true
								});
								navWin.closeWindow(win, {
									animated : true
								});
							}
						} else {
							info.hide();
							utils.showAlertWithMessage("Please try again later");
							return;
						}
					}
				}, 0);

			} else {
				utils.showAlertWithMessage("Activity Date and Time should not be less than current date and time.");
				//utils.showAlertWithMessage("You can't create activity for past dates.");
			}

		} else {

			utils.showAlertWithMessage("Please enter all the details to schedule activity");
		}

	});

	// Add to the parent view.
	scrollView.add(btnSubmit);

	contentView.add(scrollView);

	win.add(contentView);

	//DatePicker
	var datepickerView = Ti.UI.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		bottom : 0
	});
	var toolbarView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : 50,
		top : 0,
		backgroundColor : "#266CA4"
	});
	// Create a Submit Button.
	var btnDone1 = Ti.UI.createButton({
		title : 'Done',
		right : 10,
		color : '#fff',
		font : {
			fontSize : 18,
			fontWeight : 'bold'
		},

	});

	// Listen for click events.
	btnDone1.addEventListener('click', function() {
		var d = picker.value;
		actdate = picker.value;
		Ti.API.info('Date: ' + d.toString());
		Ti.API.info('Epoch: ' + d.getTime());
		Ti.API.info('Milliseconds: ' + d.getMilliseconds());
		Ti.API.info('Minutes: ' + d.getMinutes());
		lblDate.setText(utils.getRequiredDate(picker.value));
		datepickerView.hide();
	});

	// Add to the parent view.
	toolbarView.add(btnDone1);
	datepickerView.add(toolbarView);
	var picker = Ti.UI.createPicker({
		type : Ti.UI.PICKER_TYPE_DATE,
		selectionIndicator : true,
		value : new Date(),
		minDate : new Date(),
		top : 50,
	});
	datepickerView.add(picker);
	datepickerView.hide();

	picker.addEventListener('change', function(e) {

		var d = e.value;
		actdate = e.value;
		Ti.API.info('Date: ' + d.toString());
		Ti.API.info('Epoch: ' + d.getTime());
		Ti.API.info('Milliseconds: ' + d.getMilliseconds());
		Ti.API.info('Minutes: ' + d.getMinutes());
		lblDate.setText(utils.getRequiredDate(e.value));

	});

	win.add(datepickerView);

	//TimePicker
	var timepickerView = Ti.UI.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		bottom : 0
	});
	var toolbarView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : 50,
		top : 0,
		backgroundColor : "#266CA4"
	});
	// Create a Submit Button.
	var btnDone = Ti.UI.createButton({
		title : 'Done',
		right : 10,
		color : '#fff',
		font : {
			fontSize : 18,
			fontWeight : 'bold'
		},

	});

	// Listen for click events.
	btnDone.addEventListener('click', function() {
		var d = tpicker.value;
		acttime = tpicker.value;
		Ti.API.info('Date: ' + d.toString());
		Ti.API.info('Epoch: ' + d.getTime());
		Ti.API.info('Milliseconds: ' + d.getMilliseconds());
		Ti.API.info('Minutes: ' + d.getMinutes());
		lblTime.setText(utils.getformatAMPM(d));
		timepickerView.hide();
	});

	// Add to the parent view.
	toolbarView.add(btnDone);
	timepickerView.add(toolbarView);
	var tpicker = Ti.UI.createPicker({
		type : Ti.UI.PICKER_TYPE_TIME,
		selectionIndicator : true,
		value : new Date(),
		top : 50,
	});
	timepickerView.add(tpicker);
	timepickerView.hide();

	tpicker.addEventListener('change', function(e) {

		var d = e.value;
		acttime = e.value;
		Ti.API.info('Date: ' + d.toString());
		Ti.API.info('Epoch: ' + d.getTime());
		Ti.API.info('Milliseconds: ' + d.getMilliseconds());
		Ti.API.info('Minutes: ' + d.getMinutes());
		lblTime.setText(utils.getformatAMPM(d));

	});
	win.add(timepickerView);

	//Location Picker
	var locpickerView = Ti.UI.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		bottom : 0,
		backgroundColor : "#fff"
	});
	var toolbarView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : 50,
		top : 0,
		backgroundColor : "#266CA4"
	});
	// Create a Submit Button.
	var btnDone = Ti.UI.createButton({
		title : 'Done',
		right : 10,
		color : '#fff',
		font : {
			fontSize : 18,
			fontWeight : 'bold'
		},

	});

	// Listen for click events.
	btnDone.addEventListener('click', function() {
		locpickerView.hide();
	});

	// Add to the parent view.
	toolbarView.add(btnDone);
	locpickerView.add(toolbarView);

	//Location data
	var data = [];
	data[0] = Ti.UI.createPickerRow({
		title : 'Location1'
	});
	data[1] = Ti.UI.createPickerRow({
		title : 'Location2'
	});
	data[2] = Ti.UI.createPickerRow({
		title : 'Location3'
	});
	data[3] = Ti.UI.createPickerRow({
		title : 'Location4'
	});

	var lpicker = Ti.UI.createPicker({
		top : 50,
	});

	lpicker.add(data);
	lpicker.selectionIndicator = true;
	locpickerView.add(lpicker);
	locpickerView.hide();

	lpicker.addEventListener('change', function(e) {

		var d = e.value;

	});
	win.add(locpickerView);
	return win;
}

module.exports = ScheduleNewActivityView;
