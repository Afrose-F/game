function sessionPlanDetails(isessionid, sessionid, description, sesstype) {
	var customRow = require('/utils/customRow');
	var win = customviews.createWindow({
		layout : 'absolute'
	});
	//Title Bar
	win.add(new customtoolbar({
		title : "Session Plans",
		isBack : true,
		listener : function() {
			if (isAndroid) {
				win.close();
			} else {
				navWin.closeWindow(win, {
					animated : true
				});
			}
		}
	}));
	win.addEventListener('android:back', function(e) {
		win.close();
	});
	var contentView = customviews.contentView();

	var scrollView = customviews.createScrollView();

	//scrollView.add(customviews.createHeaderLabel("Michael's Training"));
	//Header Label
	var titleView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : 50,
		left : 5,
		right : 5,

	});
	//Title label
	var leftLabel = Ti.UI.createLabel({
		text : description,
		left : 5,
		right : 120,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		font : {
			fontSize : 21,
			fontWeight : 'normal',
			fontFamily : 'HelveticaNeue-Light',
		},
		color : '#5c5c5c',
		textAlign : 'left'

	});
	titleView.add(leftLabel);

	//Duration label
	var durationLabelView = Ti.UI.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		right : 10,
		layout : 'horizontal'

	});
	var lblTotal = Ti.UI.createLabel({
		text : "Total :",
		left : 5,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		font : {
			fontSize : 15,
			fontWeight : 'normal',
			fontFamily : 'HelveticaNeue-Light',
		},
		color : '#5c5c5c',
		textAlign : 'right'

	});
	var rightLabel = Ti.UI.createLabel({
		text : "",

		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		font : {
			fontSize : 15,
			fontWeight : 'normal',
			fontFamily : 'HelveticaNeue-Light',
		},
		color : '#a8a8a8',
		textAlign : 'right'

	});
	durationLabelView.add(lblTotal);
	durationLabelView.add(rightLabel);
	titleView.add(durationLabelView);
	scrollView.add(titleView);
	scrollView.add(customviews.getSeparatorView());

	/*scrollView.add(new customRow({
	 title : "Passing | Skills",
	 duration : "15 mins",
	 notes : "Notes",
	 drill : "Drills",
	 wrampup : "Wramup"
	 }));
	 scrollView.add(new customRow({
	 title : "Passing | Skills",
	 duration : "15 mins",
	 notes : "Notes",
	 drill : "Drills",
	 wrampup : "Wramup"
	 }));
	 scrollView.add(new customRow({
	 title : "Passing | Skills",
	 duration : "15 mins",
	 notes : "Notes",
	 drill : "Drills",
	 wrampup : "Wramup"
	 }));
	 scrollView.add(new customRow({
	 title : "Passing | Skills",
	 duration : "15 mins",
	 notes : "Notes",
	 drill : "Drills",
	 wrampup : "Wramup"
	 }));*/
	if (Ti.App.Properties.hasProperty("userid")) {
		userid = Ti.App.Properties.getString("userid");
		token = Ti.App.Properties.getString("token");
		password = Ti.App.Properties.getString("password");
	}
	var totalTime = 0;
	//{"PFCID":"1006","Headings":"Skills","Description":"","TimePercentage":"","DrillandActivities":"","WarmUp":"","DrillSequence":"","LibraryID":"","WarmupID":"","Notes":""}
	win.addEventListener('open', function(e) {
		if (utils.checkInternetConnection()) {
			httpRequest.loadWebservice({
				url : sessionDetailUrl,
				reqParams : {
					'sessionID' : sessionid,
					'IndvSessionID' : isessionid,
					'userID' : userid,
					'token' : token,
					'password' : password,
					"SessType" : sesstype
				},
				error : function(e) {
					if (isAndroid) {
						win.close();
					} else {
						navWin.closeWindow(win, {
							animated : true
						});
					}
				},
				success : function(responseJSON, info) {
					var responseData = responseJSON.data;

					var drill = "";
					var wramup = "";

					/*if (responseJSON.Warmup != null && responseJSON.Warmup.length > 0) {
					 var responseWramupData = responseJSON.Warmup;
					 for (var i = 0; i < responseWramupData.length; i++) {
					 wramup += responseWramupData[i].SportName + ": " + responseWramupData[i].ShortDesc + "\n";
					 }
					 }
					 if (responseJSON.Drills != null && responseJSON.Drills.length > 0) {
					 var responseDrillData = responseJSON.Drills;
					 for (var i = 0; i < responseDrillData.length; i++) {
					 drill += responseDrillData[i].SportName + ": " + responseDrillData[i].ShortDesc + "\n";
					 }
					 }*/
					if (responseData.length > 0) {
						for (var i = 0; i < responseData.length; i++) {
							var time = 0;
							if (responseData[i].TimePercentage != "") {
								totalTime += parseInt(responseData[i].TimePercentage);
								time = responseData[i].TimePercentage;
							}
							var notes = "";
							notes = responseData[i].Notes;
							drill = responseData[i].DrillandActivities;
							wramup = responseData[i].WarmUp;
							if (notes == "") {
								notes = "Notes not available.\n\n";
							} else {
								notes += " \n\n";
							}
							if (drill == "") {
								drill = "Drill not available.\n\n";
							} else {
								drill += " \n\n";
							}
							if (wramup == "") {
								wramup = "Warmup not available.\n\n";
							} else {
								wramup += " \n\n";
							}
							scrollView.add(new customRow({
								title : responseData[i].Headings,
								pfcid : responseData[i].PFCID,
								sessionID : sessionid,
								IndvSessionID : isessionid,
								userID : userid,
								token : token,
								//duration : "15 mins",
								duration : time + " mins",
								notes : notes,
								drill : drill,
								wrampup : wramup
							}));

						}
						var timeLbl = "";
						if (parseInt(totalTime) >= 60) {

							var min = parseInt(totalTime) % 60;

							var hours = parseInt(totalTime) / 60;

							if (parseInt(hours) == 1) {
								if (parseInt(min) > 0) {
									timeLbl = parseInt(hours) + " Hour " + min + " mins";
								} else {
									timeLbl = parseInt(hours) + " Hour ";
								}

							} else {
								if (parseInt(min) > 0) {
									timeLbl = parseInt(hours) + " Hours " + min + " mins";
								} else {
									timeLbl = parseInt(hours) + " Hours ";
								}

							}

						} else {
							timeLbl = totalTime + " mins";
						}

						rightLabel.setText(" " + timeLbl);
						info.hide();
					} else {
						if(!isAndroid){
							info.hide();
						}
						//utils.showAlertWithMessage('No data available for this plan');
						utils.showAlertWithButton('No data available for this plan', function() {
							info.hide();
							if (isAndroid) {
								win.close();
							} else {
								navWin.closeWindow(win, {
									animated : true
								});
							}
						});
						
						/*tableView.setData(Ti.UI.createTableViewRow({
						 title : 'No activity found.'
						 }));*/

					}
				}
			}, 0);
		} else {
			utils.showAlertWithMessage('Please check your internet connectivity.');
		}
	});
	contentView.add(scrollView);
	win.add(contentView);
	return win;
}

module.exports = sessionPlanDetails;
