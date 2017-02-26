function createTabGroup() {

	// create tab group
	var tabGroup = Titanium.UI.createTabGroup({
		tabsBackgroundColor : "#373737",
		activeTabBackgroundColor : '#5d5d5d',
		tabsTintColor : '#fff'
	});

	//
	// Calculator Window
	//
	var LoginTabWindowObj = require('/ui/common/LoginView');
	var LoginWindow = new LoginTabWindowObj(tabGroup);
	var LoginTab = Titanium.UI.createTab({
		title : 'Login',
		//icon : 'images/TabBarIcons/cal.png',
		window : LoginWindow
	});

	LoginWindow.containingTab = LoginTab;

	//
	//  add tabs
	//
	tabGroup.addTab(LoginTab);

	//Set Home tab as active Tab
	tabGroup.setActiveTab(0);

	// open tab group
	tabGroup.open();

	currentTabGrp = tabGroup;
	return tabGroup;

};
module.exports = createTabGroup;
