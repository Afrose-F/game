function SessionPlanListView() {
	var win = customviews.createWindow({});
	//Title Bar
	win.add(new customtoolbar({
		title : "Back",
		isBack : true,
		isRightBtn : false,
		listener : function() {
			//var menuWindow = require('/ui/common/MenuView');
			//new menuWindow().open();
			//win.close();
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
		//var menuWindow = require('/ui/common/MenuView');
		//new menuWindow().open();
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
		text : "Choose Season Plan",
		font : {
			fontSize : 22,
			fontWeight : 'normal',
			fontFamily : 'HelveticaNeue-Light'
		}
	});
	contentView.add(lblTitle);

	var tableData = [];

	/*for (var i = 1; i <= 20; i++) {
	 var row = Ti.UI.createTableViewRow({
	 className : 'forumEvent', // used to improve table performance
	 selectedBackgroundColor : 'white',
	 rowIndex : i, // custom property, useful for determining the row during events
	 height : Ti.UI.SIZE,
	 //rightImage : "/images/rightarrow.png"
	 });

	 var labelUserName = Ti.UI.createLabel({
	 color : '#474747',
	 font : {
	 fontFamily : 'HelveticaNeue-Medium',
	 fontSize : 18,
	 fontWeight : 'bold'
	 },
	 text : 'Session plan ' + i,
	 left : 10,
	 top : 15,
	 bottom : 15,
	 width : Ti.UI.FILL,
	 height : Ti.UI.SIZE,
	 textAlign : 'left'
	 });
	 row.add(labelUserName);
	 var rightBtnImg = Ti.UI.createImageView({
	 image : isAndroid ? '/images/Line_Navigation@3x.png' : '/images/Line_Navigation.png',
	 height : 20,
	 //width : Ti.UI.SIZE,
	 right : 10
	 });
	 row.add(rightBtnImg);
	 tableData.push(row);
	 }*/
	var tableView = Ti.UI.createTableView({
		data : tableData,
		borderRadius : 10,
		backgroundColor : '#f7f7f7',
		borderColor : '#969696',
		borderWidth : 2,
		separatorColor : '#979797',
		separatorInsets : {
			right : 0,
			left : 0
		},
		top : 65,
		right : 20,
		left : 20,
		bottom : 20,
		height : "auto",
	});

	contentView.add(tableView);

	win.add(contentView);
	win.addEventListener('open', function(e) {
		if (Ti.App.Properties.hasProperty("userid")) {
			userid = Ti.App.Properties.getString("userid");
			token = Ti.App.Properties.getString("token");
			password = Ti.App.Properties.getString("password");
		}
		if (utils.checkInternetConnection()) {
			httpRequest.loadWebservice({
				url : sessionListUrl,
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
								sessionID : responseData[i].SessionID,
								desc : responseData[i].Description,
								modifiedDate : responseData[i].ModifiedDate,

							});

							var lblTitle = Ti.UI.createLabel({
								color : '#5c5c5c',
								font : {
									fontFamily : 'HelveticaNeue-Light',
									fontSize : 22,
									fontWeight : 'normal'
								},
								text : responseData[i].Description,
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
						//if(!isAndroid){
							info.hide();
						//}
						tableView.setData(utils.getCustomTableRow('No data found.'));
						//utils.showAlertWithMessage('Season plan not available.');
						/*utils.showAlertWithButton('Season plan not available.', function() {
							info.hide();
							if (isAndroid) {
								win.close();
							} else {
								navWin.closeWindow(win, {
									animated : true
								});
							}
						});*/
						info.hide();
					}
				}
			}, 0);
			tableView.addEventListener('click', function(e) {
				if (e.rowData.sessionID != null && e.rowData.sessionID != "") {

					var sessionid = e.rowData.sessionID;
					var sessiontitle = e.rowData.desc;
					if (utils.checkInternetConnection()) {
						//alert("1");
						var sessionListWindow = require('/ui/common/IndividualSessionListView');

						if (isAndroid) {
							new sessionListWindow(sessionid, sessiontitle).open();
						} else {
							navWin.openWindow(new sessionListWindow(sessionid, sessiontitle), {
								animated : true
							});

						}
					} else {
						utils.showAlertWithMessage('Please check your internet connectivity');
					}
				}
				//win.close();

			});
		} else {
			utils.showAlertWithMessage('Please check your internet connectivity');
		}
	});
	return win;
}

module.exports = SessionPlanListView;
