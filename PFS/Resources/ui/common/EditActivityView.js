function EditActivityView(teamId, type, teamName, act, actdet) {
	//Ti.API.info(actdet);
	var acttime = new Date();
	var menubtn = require("/utils/customButton");
	actdate = new Date();
	var win = customviews.createWindow({
		layout : 'absolute'
	});
	//Title Bar
	win.add(new customtoolbar({
		title : "Back",
		isBack : true,
		listener : function() {
			var ActivityDetailWindow = require('/ui/common/ActivityDetailView');

			if (isAndroid) {
				new ActivityDetailWindow(teamId, type, teamName, act, actdet).open();
				win.close();
			} else {
				navWin.openWindow(new ActivityDetailWindow(teamId, type, teamName, act, actdet), {
					animated : false
				});
				navWin.closeWindow(win, {
					animated : false
				});
			}
		}
	}));

	win.addEventListener('android:back', function(e) {
		var ActivityDetailWindow = require('/ui/common/ActivityDetailView');
		new ActivityDetailWindow(teamId, type, teamName, act, actdet).open();
		win.close();
	});
	var contentView = customviews.contentView();

	var scrollView = customviews.createScrollView();
	//if (isAndroid) {

	//Header Label

	var headerview = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		//left : 10,
		//height : 50,

	});
	var headerLbl = Ti.UI.createLabel({
		text : "Schedule Activity",
		left : 10,
		right : 100,
		height : 50,
		top : 5,
		bottom : 5,
		width : Ti.UI.SIZE,
		font : {
			fontFamily : 'HelveticaNeue-Light',
			fontSize : 22,
			fontWeight : 'normal'
		},
		color : "#5c5c5c",
		textAlign : 'left'

	});

	headerview.add(headerLbl);
	//Activity Button
	//Activity Button
	var menubtnview2 = Ti.UI.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		right : 10,

	});
	//Button 2
	var btnEditActivity = new menubtn({
		title : 'Delete Activity',

		image : isAndroid ? '/images/trash.png' : '/images/trash.png',
		width : Ti.UI.SIZE,
		height : '35dp',
		listener : function() {
			var dialog = Ti.UI.createAlertDialog({
				cancel : 0,
				buttonNames : ['No', 'Yes'],
				message : 'Do you want to delete this activity?',
				title : 'Place For Sports'
			});
			dialog.addEventListener('click', function(e) {
				if (e.index === 1) {
					if (Ti.App.Properties.hasProperty("userid")) {
						userid = Ti.App.Properties.getString("userid");
						token = Ti.App.Properties.getString("token");
						password = Ti.App.Properties.getString("password");
					}
					//alert(act.ActivityID);
					if (utils.checkInternetConnection()) {
						httpRequest.loadWebservice({
							url : deleteActivityUrl,
							reqParams : {

								'teamID' : actdet.ActivityPFCID,
								'type' : type,
								'userID' : userid,
								'token' : token,
								'password' : password
							},
							success : function(responseJSON, info) {

								info.hide();
								utils.showAlertWithMessage("Activity deleted successfully");
								if (responseJSON.data.length > 0) {
									var ActivityListWindow = require('/ui/common/ActivityListView');
									if (isAndroid) {
										new ActivityListWindow(teamId, type, teamName).open();
										win.close();
									} else {
										navWin.openWindow(new ActivityListWindow(teamId, type, teamName), {
											animated : false
										});
										navWin.closeWindow(win, {
											animated : false
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
						utils.showAlertWithMessage('Please check your internet connectivity.');
					}

				} else {

				}

			});
			dialog.show();

		}
	});
	menubtnview2.add(btnEditActivity);
	headerview.add(menubtnview2);

	scrollView.add(headerview);
	//} else {
	//scrollView.add(customviews.createHeaderLabel("Schedule Activity"));
	//}
	//btnView.add(menubtnview2);
	//scrollView.add(headerLbl);
	scrollView.add(customviews.getSeparatorView());
	//Venue field
	/*var txtActivity = Ti.UI.createTextField({
	width : "90%",
	height : 40,
	textAlign : 'center',
	color : '#5c5c5c',
	borderColor : '#979797',
	autocorrect : false,
	backgroundColor : "transparent",
	borderRadius : 5,
	top : 20,
	hintText : "Activity name",
	//value : actdet.Activity
	});
	//scrollView.add(txtActivity);
	// Listen for click events.
	txtActivity.addEventListener('click', function() {
	timepickerView.hide();
	datepickerView.hide();
	//locpickerView.show();
	});
	txtActivity.addEventListener('focus', function(e) {

	timepickerView.hide();
	datepickerView.hide();
	});
	*/
	/*txtActivity.addEventListener('blur', function(e) {
	if (this.value == "")
	this.value = "Activity name";
	});*/
	//Venue field
	var txtVenue = Ti.UI.createTextField({
		width : "90%",
		height : 40,
		textAlign : 'center',
		color : '#5c5c5c',
		borderColor : '#979797',
		autocorrect : false,
		//backgroundColor : "#fff",
		backgroundColor : "transparent",
		borderRadius : 5,
		top : 20,
		maxLength :100,
		hintText : "Venue",
		value : actdet.Venue
	});
	scrollView.add(txtVenue);
	// Listen for click events.
	txtVenue.addEventListener('click', function() {
		timepickerView.hide();
		datepickerView.hide();
		//locpickerView.show();
	});
	txtVenue.addEventListener('focus', function(e) {
		/*if (this.value == "Venue") {
		 txtVenue.value = "";
		 }*/
		timepickerView.hide();
		datepickerView.hide();
	});
txtVenue.addEventListener('change', function(e) {
		if (e.value.length > 100) {
			txtVenue.value = e.value.substr(0, 99);
		}
	});
	/*txtVenue.addEventListener('blur', function(e) {
	 if (this.value == "")
	 this.value = "Venue";
	 });*/
	var d = (actdet.ActivityDate != null && actdet.ActivityDate != "") ? actdet.ActivityDate : utils.getCurrentDate(new Date());
	d1 = d.split(" ");
	d2 = d1[0].split("/");
	d3 = d1[1].split(":");
	if (d1[2] == "PM") {
		if (d3[0] == 12) {
			var hrs24 = parseInt(d3[0]);
		} else {
			var hrs24 = parseInt(d3[0]) + 12;
		}

	} else {
		if (d3[0] == 12) {
			var hrs24 = 0;
		} else {
			var hrs24 = parseInt(d3[0]);
		}

	}

	var d4 = new Date(d2[2], d2[0] - 1, d2[1]);

	var d5 = new Date(d2[2], d2[0] - 1, d2[1], hrs24, d3[1], d3[2]);
	actd = utils.getRequiredDate(d4);

	actt = utils.getformatAMPM(d5);

	//Date field
	var lblDate = Ti.UI.createLabel({
		width : "90%",
		height : 40,
		textAlign : 'center',
		color : '#5c5c5c',
		borderColor : '#979797',
		//	backgroundColor : "#fff",
		borderRadius : 5,
		text : actd,
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
				//minDate : new Date(),
				//maxDate : new Date(2014, 11, 31),
				value : new Date(d2[2], d2[0] - 1, d2[1]),
			});
			adpicker.showDatePickerDialog({
				value : new Date(d2[2], d2[0] - 1, d2[1]),
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
						lblDate.setText(utils.getRequiredDate(d));
					}
				}
			});
			//picker.setValue(d4);
		} else {
			//locpickerView.hide();
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
		text : actt,
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
				value : new Date(d2[2], d2[0] - 1, d2[1], hrs24, d3[1], d3[2]),
			});
			atpicker.showTimePickerDialog({
				value : new Date(d2[2], d2[0] - 1, d2[1], hrs24, d3[1], d3[2]),
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
			//picker.setValue(d5);
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
		value : actdet.Activity,
		color : '#5c5c5c',
		hintText : 'Activity Description',
		autocorrect : false,
		borderRadius : 5,
		paddingLeft : 10,
		paddingRight : 10,
		borderColor : '#979797',
		backgroundColor : "transparent",
		maxLength :250,
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

		timepickerView.hide();
		datepickerView.hide();
		//locpickerView.hide();
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

	// Listen for return events.

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
		if (Ti.App.Properties.hasProperty("userid")) {
			userid = Ti.App.Properties.getString("userid");
			token = Ti.App.Properties.getString("token");
			password = Ti.App.Properties.getString("password");
		}
		if (message != "" && lblDate.text != "" && lblDate.text != "Date" && lblTime.text != "" && lblTime.text != "Time") {
			/*if(desc.length>250){
				utils.showAlertWithMessage("Max Characters allowed in description is 250.");
			}else{*/
			
			if (isvalidDate) {
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
						'ActivityPlannedID' : actdet.PFCID,
						'userID' : userid,
						'token' : token,
						'password' : password
					},
					success : function(responseJSON, info) {
						//Ti.App.Properties.setBool("isEdited",true);
						if (responseJSON.data.length > 0) {
							var ActivityDetailWindow = require('/ui/common/ActivityDetailView');
							info.hide();
							if (isAndroid) {
								new ActivityDetailWindow(teamId, type, teamName, act, actdet).open();
								win.close();
							} else {
								navWin.openWindow(new ActivityDetailWindow(teamId, type, teamName, act, actdet), {
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
				//utils.showAlertWithMessage("You can't create activity for past dates.");
				utils.showAlertWithMessage("Activity Date and Time should not be less than current date and time.");
			}
	
			//}
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

	var dpicker = Ti.UI.createPicker({
		type : Ti.UI.PICKER_TYPE_DATE,
		selectionIndicator : true,
		value : new Date(d2[2], d2[0] - 1, d2[1]),
		//minDate : new Date(),
		top : 50,
	});
	var curr = new Date(d2[2], d2[0] - 1, d2[1]);
	var today = new Date();
	dpicker.value = curr;
	actdate = curr;
	/*if (curr < today) {
	 dpicker.value = today;
	 } else {
	 dpicker.value = curr;
	 }*/
	datepickerView.add(dpicker);
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
		//var utcTime = new Date();
		//var offset = utcTime.getTimezoneOffset();
		//alert(dpicker.getValue());
		var d = dpicker.value;
		actdate = dpicker.value;
		Ti.API.info('Date: ' + d.toString());
		Ti.API.info('Epoch: ' + d.getTime());
		Ti.API.info('Milliseconds: ' + d.getMilliseconds());
		Ti.API.info('Minutes: ' + d.getMinutes());
		lblDate.setText(utils.getRequiredDate(dpicker.value));
		datepickerView.hide();
	});

	// Add to the parent view.
	toolbarView.add(btnDone1);
	datepickerView.add(toolbarView);
	datepickerView.hide();

	dpicker.addEventListener('change', function(e) {

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
		value : new Date(d2[2], d2[0] - 1, d2[1], hrs24, d3[1], d3[2]),
		top : 50,
	});
	timepickerView.add(tpicker);
	timepickerView.hide();
	acttime = new Date(d2[2], d2[0] - 1, d2[1], hrs24, d3[1], d3[2]);
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

module.exports = EditActivityView;
