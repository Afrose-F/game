function SendMessageView(playersEmailIds2, phonenumbers2, type, teamId, flag, activityid) {
	var menubtn = require("/utils/customMsgButton");
	Ti.API.info("players email " + playersEmailIds2);
	Ti.API.info("players phone " + phonenumbers2);
	playersEmailIds1 = [];
	phonenumbers1 = [];
	playersEmailIds = [];
	phonenumbers = [];
	var win = customviews.createWindow({});
	//Title Bar
	win.add(new customtoolbar({
		title : "Back",
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

	//Header Label
	scrollView.add(customviews.createHeaderLabel("Send Message"));

	scrollView.add(customviews.getSeparatorView());

	//View contains top two menu button in a row
	var menurow = Ti.UI.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		top : 20,
		layout : 'horizontal'

	});

	//Session Plan Button
	var menuBtn1 = new menubtn({
		title : 'Email',
		image : isAndroid ? '/images/Email_Icon@3x.png' : '/images/Email_Icon.png',
		width : '115dp',
		height : '115dp',
		listener : function() {
			if (type == 0) {
				if (playersEmailIds1.length > 0) {

					utils.sendMail("", playersEmailIds1, "");
				} else {
					utils.showAlertWithMessage("Email id not available");
				}
			} else {
				if (playersEmailIds.length > 0) {

					utils.sendMail("", playersEmailIds, "");
				} else {
					utils.showAlertWithMessage("Email id not available");
				}
			}

		}
	});
	menurow.add(menuBtn1);

	//Activity Button
	var menubtnview2 = Ti.UI.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		left : 20,

	});
	var menuBtn2 = new menubtn({
		title : 'Message',
		image : isAndroid ? '/images/Text_Message_Icon@3x.png' : '/images/Text_Message_Icon.png',
		width : '115dp',
		height : '115dp',
		listener : function() {
			if (type == 0) {
				if (phonenumbers1.length > 0) {
					utils.sendSMS(phonenumbers1, "");
				} else {
					utils.showAlertWithMessage("Phone number not available");
				}
			} else {
				if (phonenumbers.length > 0) {
					utils.sendSMS(phonenumbers, "");
				} else {
					utils.showAlertWithMessage("Phone number not available");
				}

			}

		}
	});
	menubtnview2.add(menuBtn2);
	menurow.add(menubtnview2);
	scrollView.add(menurow);

	contentView.add(scrollView);
	win.addEventListener('open', function(e) {
		if (type == 0) {
			if (Ti.App.Properties.hasProperty("userid")) {
				userid = Ti.App.Properties.getString("userid");
				token = Ti.App.Properties.getString("token");
				password = Ti.App.Properties.getString("password");
			}
			if (utils.checkInternetConnection()) {
				httpRequest.loadWebservice({
					url : membersEmailUrl,
					reqParams : {
						'TeamorGroupID' : teamId,
						'flag' : flag,
						'userID' : userid,
						'token' : token,
						'password' : password

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
						if (responseData.length > 0) {
							for (var i = 0; i < responseData.length; i++) {
								if (responseData[i].Email != "") {
									playersEmailIds1.push(responseData[i].Email);

								}
								if (responseData[i].MobileNo != "") {
									phonenumbers1.push(responseData[i].MobileNo);

								}
							}
							info.hide();
						} else {

							info.hide();
						}
					}
				}, 0);
			} else {
				utils.showAlertWithMessage('Please check your internet connectivity.');
			}
		} else {

			if (Ti.App.Properties.hasProperty("userid")) {
				userid = Ti.App.Properties.getString("userid");
				token = Ti.App.Properties.getString("token");
				password = Ti.App.Properties.getString("password");
			}
			if (utils.checkInternetConnection()) {
				httpRequest.loadWebservice({
					url : GetMembersEmailUrl,
					reqParams : {
						'ActvityID' : activityid,
						'flag' : flag,
						'userID' : userid,
						'token' : token,
						'password' : password

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
						if (responseData.length > 0) {
							for (var i = 0; i < responseData.length; i++) {
								if (responseData[i].Email != "") {
									playersEmailIds.push(responseData[i].Email);

								}
								if (responseData[i].MobileNo != "") {
									phonenumbers.push(responseData[i].MobileNo);

								}
							}
							info.hide();
						} else {

							info.hide();
						}
					}
				}, 0);
			}
		}
	});
	win.add(contentView);
	return win;
}

module.exports = SendMessageView;
