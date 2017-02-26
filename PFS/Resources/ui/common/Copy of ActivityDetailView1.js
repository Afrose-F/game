function ActivityDetailView(teamId, type, teamName, act) {
	var actdet = {};
	var playersEmailIds = [],
	    phonenumbers = [];
	var menubtn = require("/utils/customButton");
	var win = customviews.createWindow({});
	//Title Bar
	win.add(new customtoolbar({
		title : "Activity List",
		isBack : true,
		isRightBtn : false,
		listener : function() {
			//var ActivityListWindow = require('/ui/common/ActivityListView');
			//new ActivityListWindow().open();
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
	//scrollView.add(customviews.createHeaderLabel("Wednesday Training"));
	var headerLbl = Ti.UI.createLabel({
		text : "",
		left : 10,
		height : 50,
		//top:5,
		//bottom:5,
		width : Ti.UI.SIZE,
		font : {
			fontFamily : 'HelveticaNeue-Medium',
			fontSize : 20,
			fontWeight : 'normal'
		},
		color : "#5c5c5c",
		textAlign : 'left'

	});
	scrollView.add(headerLbl);

	scrollView.add(customviews.getSeparatorView());

	//View Contains two buttons
	var btnView = Ti.UI.createView({
		top : 8,
		bottom : 8,
		layout : 'horizontal',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	//Button 1
	var btnSendMsg = new menubtn({
		title : 'Send Message',
		image : isAndroid ? '/images/send_mess_icon.png' : '/images/send_mess_icon.png',
		width : Ti.UI.SIZE,
		height : '40dp',
		listener : function() {
			//alert(act.playersEmailIds);
			var sendMessageWindow = require('/ui/common/SendMessageView');

			if (isAndroid) {
				new sendMessageWindow(playersEmailIds, phonenumbers,1).open();
			} else {
				navWin.openWindow(new sendMessageWindow(playersEmailIds, phonenumbers,1,teamId, type), {
					animated : true
				});
			}
			//win.close();
		}
	});
	btnView.add(btnSendMsg);

	//Activity Button
	var menubtnview2 = Ti.UI.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		left : 10,

	});
	//Button 2
	var btnEditActivity = new menubtn({
		title : 'Edit Activity',
		image : isAndroid ? '/images/Edit_Icon.png' : '/images/Edit_Icon.png',
		width : Ti.UI.SIZE,
		height : '40dp',
		listener : function() {
			var editActivityWindow = require('/ui/common/EditActivityView');
			if (isAndroid) {
				new editActivityWindow(teamId, type, teamName, act, actdet).open();
				win.close();
			} else {
				navWin.openWindow(new editActivityWindow(teamId, type, teamName, act, actdet), {
					animated : true
				});
				navWin.closeWindow(win, {
					animated : true
				});
			}

		}
	});
	menubtnview2.add(btnEditActivity);
	btnView.add(menubtnview2);

	scrollView.add(btnView);
	scrollView.add(customviews.getSeparatorView());

	//Date and time
	var dateView = Ti.UI.createView({
		top : 0,
		bottom : 0,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});

	var datelineView = Ti.UI.createView({
		backgroundColor : "#979797",
		left : 19,
		width : 1,
		//top : 0,
		//bottom : 0,
		//height : 51,

	});
	dateView.add(datelineView);
	// Date icon
	var dateIconView = Ti.UI.createImageView({
		image : isAndroid ? '/images/Activity_Time.png' : '/images/Activity_Time.png',
		left : 10,
		//top:10,
		width : 20
	});

	// Add to the parent view.
	dateView.add(dateIconView);

	// Date and time Label.
	var aLabel = Ti.UI.createLabel({
		text : '',
		color : '#667c8c',
		font : {
			fontSize : 16,
			fontWeight : 'bold',
			fontFamily : 'Avenir Bold'
		},
		//height : 51,
		width : Ti.UI.SIZE,
		textAlign : 'left',

		left : 50
	});
	dateView.add(aLabel);
	if (!isAndroid) {
		aLabel.setHeight(51);
	}
	dateView.add(customviews.getSeparatorView1(50, 0));

	if (isAndroid) {
		datelineView.setHeight(aLabel.toImage().media.getHeight());
	} else {
		datelineView.setHeight(dateView.toImage().getHeight());
	}
	scrollView.add(dateView);
	//Location
	var locationView = Ti.UI.createView({
		top : 0,
		bottom : 0,
		//layout : 'horizontal',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
	});

	var locationlineView = Ti.UI.createView({
		backgroundColor : "#979797",
		left : 19,
		width : 1,
		//height : 51,
		top : 0,
		bottom : 0

	});
	locationView.add(locationlineView);
	// Location icon
	var locIconView = Ti.UI.createImageView({
		image : isAndroid ? '/images/Activity_Location.png' : '/images/Activity_Location.png',
		left : 10,
		//top : 10,
		width : 20
	});

	// Add to the parent view.
	locationView.add(locIconView);
	// Location Label.
	var lblLocation = Ti.UI.createLabel({
		text : '',
		color : '#667c8c',
		font : {
			fontSize : 16,
			fontWeight : 'bold',
			fontFamily : 'Avenir Bold'
		},
		//height : 51,
		width : Ti.UI.SIZE,
		textAlign : 'left',

		left : 50
	});
	if (!isAndroid) {
		lblLocation.setHeight(51);
	}
	locationView.add(lblLocation);
	locationView.add(customviews.getSeparatorView1(50, 0));

	if (isAndroid) {
		locationlineView.setHeight(lblLocation.toImage().media.getHeight());
	} else {
		locationlineView.setHeight(locationView.toImage().getHeight());
	}
	scrollView.add(locationView);
	//Description
	var descView = Ti.UI.createView({
		top : 0,
		bottom : 0,
		//layout : 'horizontal',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	var desclineView = Ti.UI.createView({
		backgroundColor : "#979797",
		left : 19,
		width : 1,
		//height:100,
		top : 0,

	});
	descView.add(desclineView);
	// Description icon
	var descIconView = Ti.UI.createImageView({
		image : isAndroid ? '/images/Activity_Description.png' : '/images/Activity_Description.png',
		left : 10,
		top : 10,
		width : 20
	});

	// Add to the parent view.
	descView.add(descIconView);

	// Description Label.
	var lblDescription = Ti.UI.createLabel({
		text : '',
		color : '#A0ADB5',
		font : {
			fontSize : 16,
			fontWeight : 'bold',
			fontFamily : 'Avenir Bold'
		},
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		textAlign : 'left',
		top : 10,
		bottom : isAndroid ? 10 : 10,
		left : 50
	});

	descView.add(lblDescription);
	descView.add(customviews.getSeparatorView1(50, 0));
	if (isAndroid) {
		desclineView.setHeight(lblDescription.toImage().media.getHeight());
	} else {
		desclineView.setHeight(descView.toImage().getHeight());
	}
	scrollView.add(descView);
	if (Ti.App.Properties.hasProperty("userid")) {
		userid = Ti.App.Properties.getString("userid");
		token = Ti.App.Properties.getString("token");
	}
	httpRequest.loadWebservice({
		url : activityDetailsUrl,
		reqParams : {
			'ActivityID' : act.activityID,
			'userID' : userid,
			'token' : token

		},
		success : function(responseJSON, info) {
			var responseData = responseJSON.data;

			if (responseData.length > 0) {
				var res = responseData[0];

				res["playersEmailIds"] = "";
				res["phonenumbers"] = "";
				//{"data":[{"PFCID":"169","RecordStatus":"True","ActivityPFCID":"169","ActivityDate":"",
				//"Activity":"ACTIVITY1","Venue":"CHENNAI","Message":"Activity Description",
				//"Reporting Time":"6/18/2015 11:29:23 AM"}]}
				if (responseData[0].Venue != "") {
					locationView.show();
					locationView.setHeight(Ti.UI.SIZE);
					lblLocation.setText(responseData[0].Venue);
				} else {
					locationView.hide();
					locationView.setHeight(0);
				}

				if (responseData[0].Message != "") {
					descView.show();
					descView.setHeight(Ti.UI.SIZE);
					lblDescription.setText(responseData[0].Message);
				} else {
					descView.hide();
					descView.setHeight(0);
				}
				if (responseData[0].ActivityDate != "") {
					dateView.show();
					dateView.setHeight(Ti.UI.SIZE);
					aLabel.setText(responseData[0].ActivityDate);
				} else {
					dateView.hide();
					dateView.setHeight(0);
				}

				headerLbl.setText(responseData[0].Activity);

				if (responseJSON.Player != null && responseJSON.Player.length > 0) {
					//Players
					var playersView = Ti.UI.createView({
						top : 0,
						bottom : 0,
						//layout : 'vertical',
						width : Ti.UI.FILL,
						height : Ti.UI.SIZE
					});
					var playerslineView = Ti.UI.createView({
						backgroundColor : "#979797",
						left : 19,
						width : 1,
						top : 0,

					});
					playersView.add(playerslineView);
					// Players icon
					var playersIconView = Ti.UI.createImageView({
						image : isAndroid ? '/images/Activity_Players@3x.png' : '/images/Activity_Players.png',
						left : 10,
						top : 10,
						width : 20
					});

					// Add to the parent view.
					playersView.add(playersIconView);

					playersView.add(customviews.createCustomRow("Players", "Position", '#677D8B', 50, 10, true));

					var playerListView = Ti.UI.createView({
						top : 35,
						bottom : isAndroid ? 10 : 10,
						left : 50,
						right : 10,
						borderRadius : 5,
						borderColor : "#979797",
						backgroundColor : '#fff',
						layout : 'vertical',
						width : Ti.UI.FILL,
						height : Ti.UI.SIZE
					});
					playersEmailIds = [];
					phonenumbers = [];
					for ( i = 0; i < responseJSON.Player.length; i++) {
						var player = responseJSON.Player[i];
						playerListView.add(customviews.createCustomRow(player.FirstName + " " + player.LastName, player.Position, "#A0ADB5", 0, 0, false));
						playerListView.add(customviews.getListSeparatorView());
						if (player.EMail != "") {
							playersEmailIds.push(player.EMail);

						}
						if (player.MobileNo != "") {
							phonenumbers.push(player.MobileNo);

						}

					}
					playersView.add(playerListView);

					playersView.add(customviews.getSeparatorView1(50, 0));
					scrollView.add(playersView);
					Ti.API.info(playersEmailIds);
					Ti.API.info(phonenumbers);
					res["playersEmailIds"] = playersEmailIds.toString();
					res["phonenumbers"] = phonenumbers.toString();

					if (isAndroid) {
						//playerslineView.setHeight(playersView.toImage().media.getHeight());

					} else {
						playerslineView.setHeight(playersView.toImage().getHeight());

					}

				} else {
					/*playerListView.add(customviews.createCustomRow("Lawrence", "Stiker", "#9d9d9d", 5, 5, false));
					 playerListView.add(customviews.getSeparatorView());
					 playerListView.add(customviews.createCustomRow("Louis", "Right Wing", "#9d9d9d", 5, 5, false));
					 playerListView.add(customviews.getSeparatorView());
					 playerListView.add(customviews.createCustomRow("Jeremy", "Left Wing", "#9d9d9d", 5, 5, false));
					 playerListView.add(customviews.getSeparatorView());
					 playerListView.add(customviews.createCustomRow("Kenneth Stone", "Attacking mid", "#9d9d9d", 5, 5, false));
					 playerListView.add(customviews.getSeparatorView());
					 playerListView.add(customviews.createCustomRow("Dennis Morgan", "Centre mid", "#9d9d9d", 5, 5, false));
					 playerListView.add(customviews.getSeparatorView());*/
				}
				if (responseJSON.Volunteer != null && responseJSON.Volunteer.length > 0) {
					//Volenteers List
					var volenteersView = Ti.UI.createView({
						top : 0,
						bottom : 0,
						//layout : 'vertical',
						width : Ti.UI.FILL,
						height : Ti.UI.SIZE
					});
					var volenteerslineView = Ti.UI.createView({
						backgroundColor : "#979797",
						left : 19,
						top : 0,
						width : 1,

					});
					volenteersView.add(volenteerslineView);

					// Volenteers icon
					var volenteersIconView = Ti.UI.createImageView({
						image : isAndroid ? '/images/Activity_Volenteers@3x.png' : '/images/Activity_Volenteers.png',
						left : 10,
						top : 10,
						width : 20
					});

					// Add to the parent view.
					volenteersView.add(volenteersIconView);

					volenteersView.add(customviews.createCustomRow("Volunteers", "Position", '#677D8B', 50, 10, true));

					var volenteerListView = Ti.UI.createView({
						top : 35,
						bottom : isAndroid ? 10 : 10,
						left : 50,
						right : 10,
						borderRadius : 5,
						borderColor : "#979797",
						backgroundColor : '#fff',
						layout : 'vertical',
						width : Ti.UI.FILL,
						height : Ti.UI.SIZE
					});
					for ( i = 0; i < responseJSON.Volunteer.length; i++) {
						var Volunteer = responseJSON.Volunteer[i];
						volenteerListView.add(customviews.createCustomRow(Volunteer.Volunteer, Volunteer.Response, "#A0ADB5", 0, 0, false));
						volenteerListView.add(customviews.getListSeparatorView());
					}
					/*volenteerListView.add(customviews.createCustomRow("Lawrence", "Stiker", "#9d9d9d", 5, 5, false));
					 volenteerListView.add(customviews.getSeparatorView());
					 volenteerListView.add(customviews.createCustomRow("Louis", "Right Wing", "#9d9d9d", 5, 5, false));
					 volenteerListView.add(customviews.getSeparatorView());
					 volenteerListView.add(customviews.createCustomRow("Jeremy", "Left Wing", "#9d9d9d", 5, 5, false));
					 volenteerListView.add(customviews.getSeparatorView());
					 volenteerListView.add(customviews.createCustomRow("Kenneth Stone", "Attacking mid", "#9d9d9d", 5, 5, false));
					 volenteerListView.add(customviews.getSeparatorView());*/
					volenteersView.add(volenteerListView);
					volenteersView.add(customviews.getSeparatorView1(50, 0));
					scrollView.add(volenteersView);

					if (isAndroid) {

					} else {
						volenteerslineView.setHeight(volenteersView.toImage().getHeight());
					}

				} else {

				}
				if (isAndroid) {
					if (responseJSON.Player != null && responseJSON.Player.length > 0) {

						setTimeout(function() {
							playerslineView.setHeight(playerListView.toImage().media.getHeight() - 50);
						}, 100);
					}
					if (responseJSON.Volunteer != null && responseJSON.Volunteer.length > 0) {

						//setTimeout(function() {
						volenteerslineView.setHeight(volenteerListView.toImage().media.getHeight());
						//}, 1000);
					}

				}

				actdet = res;
				info.hide();

			} else {
				info.hide();
			}
		}
	}, 0);
	contentView.add(scrollView);

	win.add(contentView);
	return win;
}

module.exports = ActivityDetailView;
