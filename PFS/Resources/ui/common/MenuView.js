function MenuView() {

	var menubtn = require("/utils/customMenuButton");

	var win = customviews.createWindow({});
	//Title Bar
	win.add(new customtoolbar({
		title : "",
		isBack : false,
		isRightBtn : true,
		listener : function() {
			//var LoginWindow = require('/ui/common/LoginView');
			//new LoginWindow().open();
			isAndroid ? win.close() : navWin.close();
			//win.close();
		},
		rightBtnListener : function() {
			Ti.App.Properties.removeProperty("userid");
			Ti.App.Properties.removeProperty("email");
			Ti.App.Properties.removeProperty("password");
			Ti.App.Properties.removeProperty("token");
			var loginWindow = require('/ui/common/LoginView');
			if (isAndroid) {
				new loginWindow().open();
				win.close();
			} else {
				navWin.openWindow(new loginWindow(), {
					animated : false
				});
				navWin.closeWindow(win, {
					animated : false
				});
			}
		}
	}));

	win.addEventListener('android:back', function(e) {
		var dialog = Ti.UI.createAlertDialog({
			cancel : 0,
			buttonNames : ['No', 'Yes'],
			message : 'Do you want to exit the application?',
			title : 'Place For Sports'
		});
		dialog.addEventListener('click', function(e) {
			if (e.index === 1) {
				win.close();
			} else {
				//drawer.open();
			}

		});
		dialog.show();

	});
	var contentView = customviews.contentView();

	var scrollView = customviews.createScrollView();

	//Header Label
	//scrollView.add(customviews.createHeaderLabel("Team 1"));

	//scrollView.add(customviews.getSeparatorView());

	//View contains top two menu button in a row
	var menurow = Ti.UI.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		top : 30,
		layout : 'horizontal'

	});

	//Session Plan Button
	var menuBtn1 = new menubtn({
		title : 'Session Plan',
		image : isAndroid ? '/images/Session_Plan_Icon@3x.png' : '/images/Session_Plan_Icon.png',
		width : '120dp',
		height : '130dp',
		listener : function() {
			if (utils.checkInternetConnection()) {
				var sessionPlanListWindow = require('/ui/common/SessionPlanListView');
				if (isAndroid) {
					new sessionPlanListWindow().open();
				} else {
					navWin.openWindow(new sessionPlanListWindow(), {
						animated : true
					});
				}
			} else {
				utils.showAlertWithMessage('Please check your internet connectivity.');
			}

			//win.close();

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
		title : 'Activity',
		image : isAndroid ? '/images/Activity_Icon@3x.png' : '/images/Activity_Icon.png',
		width : '120dp',
		height : '130dp',
		listener : function() {
			if (utils.checkInternetConnection()) {
				var homeWindow = require('/ui/common/HomeView');
				if (isAndroid) {
					new homeWindow(1).open();
				} else {
					navWin.openWindow(new homeWindow(1), {
						animated : true
					});
				}
			} else {
				utils.showAlertWithMessage('Please check your internet connectivity.');
			}
			//win.close();

		}
	});
	menubtnview2.add(menuBtn2);
	menurow.add(menubtnview2);
	scrollView.add(menurow);

	//Send Message Button
	var menuBtn3 = new menubtn({
		title : 'Send Message',
		image : isAndroid ? '/images/Message_Icon@3x.png' : '/images/Message_Icon.png',
		width : '130dp',
		top : '20dp',
		height : '130dp',
		listener : function() {
			if (utils.checkInternetConnection()) {
				var homeWindow = require('/ui/common/HomeView');
				if (isAndroid) {
					new homeWindow(2).open();
				} else {
					navWin.openWindow(new homeWindow(2), {
						animated : true
					});
				}

				//win.close();
			} else {
				utils.showAlertWithMessage('Please check your internet connectivity.');
			}

		}
	});
	scrollView.add(menuBtn3);
	var version = isAndroid ? "0.0.3" : Ti.App.version;
	var versionLbl = Ti.UI.createLabel({
		text : 'Interim Version - ' + version,
		color : '#5c5c5c',
		font : {
			//fontFamily : customFontArialNormal,
			fontSize : 16,
			fontWeight : 'bold'
		},
		top : 50,
		textAlign : 'center'
	});
	scrollView.add(versionLbl);
	contentView.add(scrollView);

	win.add(contentView);
	win.open();
	return win;

}

module.exports = MenuView;
