function ActivityListView(teamId, type, teamName) {
	var menubtn = require("/utils/customButton");
	var win = customviews.createWindow({});
	//Title Bar
	win.add(new customtoolbar({
		title : "Back",
		isBack : true,
		isRightBtn : false,
		listener : function() {
			//var menuWindow = require('/ui/common/MenuView');
			//new menuWindow().open();
			if (isAndroid) {
				win.close();
			} else {
				navWin.closeWindow(win, {
					animated : true
				});
			}

		},
		rightBtnListener : function() {
			var newActivityWindow = require('/ui/common/ScheduleNewActivityView');
			if (isAndroid) {
				new newActivityWindow(teamId, type, teamName).open();
				win.close();
			} else {
				navWin.openWindow(new newActivityWindow(teamId, type, teamName), {
					animated : true
				});
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
	var mainview = Ti.UI.createView({
		borderRadius : 10,
		backgroundColor : '#f7f7f7',
		borderColor : '#979797',
		borderWidth : 2,
		top : 20,
		right : 20,
		left : 20,
		bottom : 20,
		color : "#ffffff",
		height : "auto",
		layout : 'vertical'
	});
	//Header Label
	//mainview.add(customviews.createHeaderLabel("Activity List"));

	var titleView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : 50,
		left : 5,
		right : 5,

	});
	//Title label
	var leftLabel = Ti.UI.createLabel({
		text : "Activity List",
		left : 5,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		font : {
			fontSize : 20,
			fontWeight : 'normal',
			fontFamily : 'HelveticaNeue-Medium',
		},
		color : '#5c5c5c',
		textAlign : 'left'

	});
	titleView.add(leftLabel);

	//Button 2
	var newActivityBtnView = Ti.UI.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		right : 10,
		layout : 'horizontal'

	});
	var btnEditActivity = new menubtn({
		title : 'New Activity',
		image : isAndroid ? '/images/Edit_Icon@2x.png' : '/images/Edit_Icon.png',
		width : Ti.UI.SIZE,
		height : '30dp',
		listener : function() {
			var newActivityWindow = require('/ui/common/ScheduleNewActivityView');
			if (isAndroid) {
				new newActivityWindow(teamId, type, teamName).open();
				win.close();
			} else {
				navWin.openWindow(new newActivityWindow(teamId, type, teamName), {
					animated : true
				});
				navWin.closeWindow(win, {
					animated : true
				});
			}

		}
	});
	newActivityBtnView.add(btnEditActivity);
	titleView.add(newActivityBtnView);
	mainview.add(titleView);

	mainview.add(customviews.getSeparatorView());
	//mainview.add(lblTitle1);

	var tableData = [];
	if (Ti.App.Properties.hasProperty("userid")) {
		userid = Ti.App.Properties.getString("userid");
		token = Ti.App.Properties.getString("token");
		password = Ti.App.Properties.getString("password");
	}
	var tableView = Ti.UI.createTableView({
		data : tableData,
		borderRadius : 10,
		separatorColor : '#979797',
		backgroundColor : '#f7f7f7',
		separatorInsets : {
			right : 0,
			left : 0
		},
		height : "auto",
	});
	win.addEventListener('open', function(e) {
		if (utils.checkInternetConnection()) {
			httpRequest.loadWebservice({
				url : activityListUrl,
				reqParams : {
					'teamID' : teamId,
					'type' : type,
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
							var row = Ti.UI.createTableViewRow({
								className : 'forumEvent', // used to improve table performance
								selectedBackgroundColor : '#f7f7f7',
								rowIndex : i, // custom property, useful for determining the row during events
								height : Ti.UI.SIZE,
								activity : responseData[i].Activity,
								activityID : responseData[i].ActivityID,
								type : responseData[i].TypePFCID,
								activityDate : responseData[i].ActivityDate,
								activityPFCID : responseData[i].ActivityPFCID,

							});

							var lblTitle = Ti.UI.createLabel({
								color : '#5c5c5c',
								font : {
									fontFamily : 'HelveticaNeue-Light',
									fontSize : 22,
									fontWeight : 'normal'
								},
								text : responseData[i].Activity,
								left : 15,
								top : 15,
								bottom : 15,
								right : 50,
								width : Ti.UI.FILL,
								height : Ti.UI.SIZE,
								textAlign : 'left'
							});
							row.add(lblTitle);
							var rightBtnImg = Ti.UI.createImageView({
								image : isAndroid ? '/images/Line_Navigation@3x.png' : '/images/Line_Navigation.png',
								height : 20,
								right : 15
							});
							row.add(rightBtnImg);
							tableData.push(row);
						}
						tableView.setData(tableData);
						info.hide();
					} else {
						//	if (!isAndroid) {
						info.hide();
						//}

						//utils.showAlertWithMessage('Activity not available.');
						/*utils.showAlertWithButton('Activity not available.', function() {
						 info.hide();

						 });*/
						tableView.setData(utils.getCustomTableRow('No activity found.'));

						info.hide();

					}
				}
			}, 0);
			tableView.addEventListener('click', function(e) {
				if (e.rowData.activityID != null && e.rowData.activityID != "") {
					var activity = {
						"activity" : e.rowData.activity,
						"activityID" : e.rowData.activityID,
						"type" : e.rowData.type,
						"activityDate" : e.rowData.activityDate,
						"activityPFCID" : e.rowData.activityPFCID
					};
					if (utils.checkInternetConnection()) {
						var ActivityDetailWindow = require('/ui/common/ActivityDetailView');
						if (isAndroid) {
							new ActivityDetailWindow(teamId, type, teamName, activity).open();
							win.close();
						} else {
							navWin.openWindow(new ActivityDetailWindow(teamId, type, teamName, activity), {
								animated : true
							});
							navWin.closeWindow(win, {
								animated : true
							});
						}
					} else {
						utils.showAlertWithMessage('Please check your internet connectivity.');

					}
					//
				}
				//win.close();

			});
		} else {
			utils.showAlertWithMessage('Please check your internet connectivity.');
			if (isAndroid) {
				win.close();
			} else {
				navWin.closeWindow(win, {
					animated : true
				});
			}
		}
	});
	mainview.add(tableView);
	contentView.add(mainview);
	win.add(contentView);

	win.addEventListener("open", function() {

	});
	return win;
}

module.exports = ActivityListView;
