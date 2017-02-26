function HomeView(pagetype) {

	var win = customviews.createWindow({});
	//Title Bar
	win.add(new customtoolbar({
		title : "Back",
		isBack : true,
		listener : function() {

			//var MenuWindow = require('/ui/common/MenuView');
			//new MenuWindow().open();
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
		//var MenuWindow = require('/ui/common/MenuView');
		//new MenuWindow().open();
		win.close();
	});
	var contentView = customviews.contentView();

	//Title Label
	var lblTitle = Ti.UI.createLabel({
		left : 20,
		top : 20,
		height : 50,
		textAlign : 'left',
		color : '#ffffff',
		text : "Choose Team or Group",
		font : {
			fontSize : 22,
			fontWeight : 'normal',
			fontFamily : 'HelveticaNeue-Light',
		}
	});
	contentView.add(lblTitle);

	var tableData = [];
	if (Ti.App.Properties.hasProperty("userid")) {
		userid = Ti.App.Properties.getString("userid");
		token = Ti.App.Properties.getString("token");
		password = Ti.App.Properties.getString("password");
	}
	var tableView = Ti.UI.createTableView({
		data : tableData,
		borderRadius : 15,
		backgroundColor : '#f7f7f7',
		borderColor : '#979797',
		borderWidth : 2,
		separatorColor : '#989898',
		top : 65,
		right : 20,
		separatorInsets : {
			right : 0,
			left : 0
		},
		left : 20,
		bottom : 20,
		height : "auto",
	});
	win.addEventListener('open', function(e) {
		if (utils.checkInternetConnection()) {
			httpRequest.loadWebservice({
				url : teamListUrl,
				reqParams : {
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
								teamName : responseData[i].TeamName,
								teamID : responseData[i].TeamID,
								type : responseData[i].TeamOrGroup

							});

							var lblTitle = Ti.UI.createLabel({
								color : '#5c5c5c',
								font : {
									fontFamily : 'HelveticaNeue-Light',
									fontSize : 22,
									fontWeight : 'normal'
								},
								text : responseData[i].TeamName,
								left : 15,
								right : 50,
								top : 15,
								bottom : 15,
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
						//if(!isAndroid){
							info.hide();
						//}
						tableView.setData(utils.getCustomTableRow('No team or group available.'));
						//utils.showAlertWithMessage('No teams or groups available.');
						/*utils.showAlertWithButton('No teams or groups available.', function() {
							
							if (isAndroid) {
								info.hide();
								win.close();
							} else {
								navWin.closeWindow(win, {
									animated : true
								});
							}
						});*/

						/*tableView.setData(Ti.UI.createTableViewRow({
						 title : 'No teams or groups available.'
						 }));*/
						//info.hide();
						info.hide();
					}
				}
			}, 0);

			tableView.addEventListener('click', function(e) {
				if (e.rowData.teamID != null && e.rowData.teamID != "") {
					var teamId = e.rowData.teamID;
					var type = e.rowData.type;
					var teamName = e.rowData.teamName;
					if (pagetype == 1) {
						if (utils.checkInternetConnection()) {
							var ActivityListWindow = require('/ui/common/ActivityListView');
							if (isAndroid) {
								new ActivityListWindow(teamId, type, teamName).open();
							} else {
								navWin.openWindow(new ActivityListWindow(teamId, type, teamName), {
									animated : true
								});
							}
						} else {
							utils.showAlertWithMessage('Please check your internet connectivity.');
						}

					} else {
						if (utils.checkInternetConnection()) {
							var sendMessageWindow = require('/ui/common/SendMessageView');
							if (isAndroid) {
								new sendMessageWindow([], [], 0, teamId, type, "").open();
							} else {
								navWin.openWindow(new sendMessageWindow([], [], 0, teamId, type, ""), {
									animated : true
								});
							}
						} else {
							utils.showAlertWithMessage('Please check your internet connectivity.');
						}

						//
						//win.close();
					}
				}

			});
		} else {
			utils.showAlertWithMessage('Please check your internet connectivity.');
		}
	});
	contentView.add(tableView);

	win.add(contentView);
	return win;
}

module.exports = HomeView;
