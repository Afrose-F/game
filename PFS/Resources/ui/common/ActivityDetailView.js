function ActivityDetailView(teamId, type, teamName, act) {
	var actdet = {};
	var playersEmailIds = [],
	    phonenumbers = [];
	var menubtn = require("/utils/customButton");
	var win = customviews.createWindow({});
	win.add(new customtoolbar({
		title : "Activity List",
		isBack : true,
		listener : function() {
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
	//scrollView.add(customviews.createHeaderLabel("Wednesday Training"));
	var headerview = Ti.UI.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		left : 20,

	});
	var headerLbl = Ti.UI.createLabel({
		text : "",
		left : 10,
		height : Ti.UI.SIZE,
		top : 10,
		bottom : 10,
		right : 10,
		left : 10,
		width : Ti.UI.SIZE,
		font : {
			fontFamily : 'HelveticaNeue-Light',
			fontSize : 22,
			fontWeight : 'normal'
		},
		color : "#5c5c5c",
		textAlign : 'left'

	});

	//headerview.add(headerLbl);
	scrollView.add(headerLbl);
	scrollView.add(customviews.getSeparatorView());
	win.addEventListener('open', function(e) {
		if (Ti.App.Properties.hasProperty("userid")) {
			userid = Ti.App.Properties.getString("userid");
			token = Ti.App.Properties.getString("token");
			password = Ti.App.Properties.getString("password");
		}
		if (utils.checkInternetConnection()) {
			httpRequest.loadWebservice({
				url : activityDetailsUrl,
				reqParams : {
					'ActivityID' : act.activityID,
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
						var res = responseData[0];

						res["playersEmailIds"] = "";
						res["phonenumbers"] = "";
						//{"data":[{"PFCID":"169","RecordStatus":"True","ActivityPFCID":"169","ActivityDate":"",
						//"Activity":"ACTIVITY1","Venue":"CHENNAI","Message":"Activity Description",
						//"Reporting Time":"6/18/2015 11:29:23 AM"}]}
						//View Contains two buttons
						var btnView = Ti.UI.createView({
							top : 15,
							bottom : 15,
							layout : 'horizontal',
							width : Ti.UI.SIZE,
							height : Ti.UI.SIZE
						});

						//Button 1
						var btnSendMsg = new menubtn({
							title : 'Send Message',
							image : isAndroid ? '/images/Send_Message_icon@2x.png' : '/images/Send_Message_icon.png',
							width : Ti.UI.SIZE,
							height : '35dp',
							listener : function() {
								//alert(act.playersEmailIds);
								//if (utils.checkInternetConnection()) {
								var sendMessageWindow = require('/ui/common/SendMessageView');

								if (isAndroid) {
									new sendMessageWindow(playersEmailIds, phonenumbers, 1, teamId, type, act.activityID).open();
								} else {
									navWin.openWindow(new sendMessageWindow(playersEmailIds, phonenumbers, 1, teamId, type, act.activityID), {
										animated : true
									});
								}
								/*} else {
								utils.showAlertWithMessage('Please check your internet connectivity.');
								}*/
								//win.close();
							}
						});
						btnView.add(btnSendMsg);

						//Activity Button
						var menubtnview2 = Ti.UI.createView({
							width : Ti.UI.SIZE,
							height : Ti.UI.SIZE,
							left : 20,

						});
						//Button 2
						var btnEditActivity = new menubtn({
							title : 'Edit Activity',
							image : isAndroid ? '/images/Edit_Icon@2x.png' : '/images/Edit_Icon.png',
							width : Ti.UI.SIZE,
							height : '35dp',
							listener : function() {
								if (utils.checkInternetConnection()) {
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
								} else {
									utils.showAlertWithMessage('Please check your internet connectivity.');
								}

							}
						});
						menubtnview2.add(btnEditActivity);
						btnView.add(menubtnview2);

						scrollView.add(btnView);
						scrollView.add(customviews.getSeparatorView());
						if (responseData[0].ActivityDate != "") {
							//Date and time
							var dateView = Ti.UI.createView({
								top : 0,
								bottom : 0,
								width : Ti.UI.FILL,
								height : Ti.UI.SIZE
							});

							var datelineView = Ti.UI.createView({
								backgroundColor : "#979797",
								left : 22,
								width : 1,
								//top : 0,
								//bottom : 0,
								//height : 51,

							});
							dateView.add(datelineView);
							// Date icon
							var dateIconView = Ti.UI.createImageView({
								image : isAndroid ? '/images/Activity_Time@2x.png' : '/images/Activity_Time.png',
								left : 10,
								//top:10,
								width : 25
							});

							// Add to the parent view.
							dateView.add(dateIconView);
							//Duration label
							var durationLabelView = Ti.UI.createView({
								width : Ti.UI.SIZE,
								height : Ti.UI.SIZE,
								left : 45,
								layout : 'horizontal'

							});
							//6/16/2015 9:50:00 PM
							var d = responseData[0].ActivityDate;
							d1 = d.split(' ');
							d2 = d1[0].split('/');
							d3 = d1[1].split(':');
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
							var actDate = new Date(d2[2], d2[0] - 1, d2[1], hrs24, d3[1], d3[2]);

							// Date Label.
							var dateLabel = Ti.UI.createLabel({
								text : utils.getActivityDate(actDate) + " | ",
								color : '#42657B',
								font : {
									fontSize : 18,
									fontWeight : 'bold',
									fontFamily : 'OpenSans-Light'
								},
								height : 51,
								width : Ti.UI.SIZE,
								textAlign : 'left',
							});
							// Time Label.
							var timeLabel = Ti.UI.createLabel({
								text : utils.getformatAMPM(actDate),

								width : Ti.UI.SIZE,
								height : 51,
								font : {
									fontSize : 18,
									fontWeight : 'bold',
									fontFamily : 'OpenSans-Light'
								},
								color : '#95A4AE',
								textAlign : 'left'

							});
							durationLabelView.add(dateLabel);
							durationLabelView.add(timeLabel);

							dateView.add(durationLabelView);
							if (!isAndroid) {
								durationLabelView.setHeight(51);
							}
							dateView.add(customviews.getSeparatorView1(50, 0));

							if (isAndroid) {
								datelineView.setHeight(51);
							} else {
								datelineView.setHeight(dateView.toImage().getHeight());
							}
							scrollView.add(dateView);

						} else {
							//dateView.hide();
							//dateView.setHeight(0);
						}

						if (responseData[0].Venue != "") {
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
								left : 22,
								width : 1,
								//height : 51,
								top : 0,
								//bottom : 0

							});
							locationView.add(locationlineView);
							// Location icon
							var locIconView = Ti.UI.createImageView({
								image : isAndroid ? '/images/Activity_Location@2x.png' : '/images/Activity_Location.png',
								left : 10,
								top : 10,
								width : 25
							});

							// Add to the parent view.
							locationView.add(locIconView);
							/*var locView = Ti.UI.createView({
							top : 10,
							left : 50,
							bottom : 10,
							//backgroundColor:'#ccc',
							//layout : 'vertical',
							width : Ti.UI.FILL,
							height : Ti.UI.SIZE
							});*/
							// Location Label.
							var lblLocation = Ti.UI.createLabel({
								text : responseData[0].Venue,
								color : '#42657B',
								font : {
									fontSize : 18,
									fontWeight : 'bold',
									fontFamily : 'OpenSans-Light'
								},
								//height : 51,
								//backgroundColor:'#fff',
								height : Ti.UI.SIZE,
								width : Ti.UI.FILL,
								textAlign : 'left',
								//top : 0,
								//bottom : 0,
								left : 50,
								right : 10,
							});
							//if (!isAndroid) {
							//lblLocation.setHeight(51);
							//}
							var ven = responseData[0].Venue;
							if (ven.length >= 75) {
								locationlineView.setHeight(114);
							} else if (ven.length >= 55) {
								locationlineView.setHeight(84);
							} else {
								locationlineView.setHeight(54);
							}
							//locView.add(lblLocation);
							locationView.add(lblLocation);
							locationView.add(customviews.getSeparatorView1(50, 0));

							/*if (isAndroid) {
							 locationlineView.setHeight(lblLocation.toImage().media.getHeight());
							 } else {
							 locationlineView.setHeight(parseInt(lblLocation.toImage().getHeight()+ 25) );
							 }*/
							scrollView.add(locationView);
						} else {

						}

						if (responseData[0].Message != "") {
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
								left : 22,
								width : 1,
								//height:100,
								top : 0,

							});
							descView.add(desclineView);
							// Description icon
							var descIconView = Ti.UI.createImageView({
								image : isAndroid ? '/images/Activity_Description@2x.png' : '/images/Activity_Description.png',
								left : 10,
								top : 10,
								width : 25
							});

							// Add to the parent view.
							descView.add(descIconView);

							// Description Label.
							var lblDescription = Ti.UI.createLabel({
								text : responseData[0].Message,
								color : '#95A4AE',
								font : {
									fontSize : 18,
									fontWeight : 'bold',
									fontFamily : 'OpenSans-Light'
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
							//scrollView.add(descView);
						} else {
							//descView.hide();
							//descView.setHeight(0);
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
								left : 22,
								width : 1,
								top : 0,

							});
							playersView.add(playerslineView);
							// Players icon
							var playersIconView = Ti.UI.createImageView({
								image : isAndroid ? '/images/Activity_Players@2x.png' : '/images/Activity_Players.png',
								left : 10,
								top : 10,
								width : 25
							});

							// Add to the parent view.
							playersView.add(playersIconView);

							playersView.add(customviews.createCustomRow("Players", "Position", '#42657B', 45, 10, true));

							var playerListView = Ti.UI.createView({
								top : 45,
								bottom : isAndroid ? 10 : 10,
								left : 50,
								right : 10,
								borderRadius : 5,
								borderColor : "#cccccc",
								backgroundColor : '#fff',
								layout : 'vertical',
								width : Ti.UI.FILL,
								height : Ti.UI.SIZE
							});
							playersEmailIds = [];
							phonenumbers = [];
							for ( i = 0; i < responseJSON.Player.length; i++) {
								var player = responseJSON.Player[i];
								playerListView.add(customviews.createCustomRow(player.FirstName + " " + player.LastName, player.Position, "#9DABB3", 0, 0, false));
								playerListView.add(customviews.getListSeparatorView());
								if (player.EMail != "") {
									playersEmailIds.push(player.EMail);

								}
								if (player.MobileNo != "") {
									phonenumbers.push(player.MobileNo);

								}

							}
							playersView.add(playerListView);
							if (isAndroid) {
								playerslineView.setHeight(parseInt(responseJSON.Player.length * 30) + 70);
							}
							playersView.add(customviews.getSeparatorView1(50, 0));
							scrollView.add(playersView);
							Ti.API.info(playersEmailIds);
							Ti.API.info(phonenumbers);
							res["playersEmailIds"] = playersEmailIds.toString();

							res["phonenumbers"] = phonenumbers.toString();

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
								left : 22,
								top : 0,
								width : 1,

							});
							volenteersView.add(volenteerslineView);

							// Volenteers icon
							var volenteersIconView = Ti.UI.createImageView({
								image : isAndroid ? '/images/Activity_Volenteers@2x.png' : '/images/Activity_Volenteers.png',
								left : 10,
								top : 10,
								width : 25
							});

							// Add to the parent view.
							volenteersView.add(volenteersIconView);

							volenteersView.add(customviews.createCustomRow("Volunteers", "Responsibility", '#42657B', 45, 10, true));

							var volenteerListView = Ti.UI.createView({
								top : 45,
								bottom : isAndroid ? 10 : 10,
								left : 50,
								right : 10,
								borderRadius : 5,
								borderColor : "#cccccc",
								backgroundColor : '#fff',
								layout : 'vertical',
								width : Ti.UI.FILL,
								height : Ti.UI.SIZE
							});
							for ( i = 0; i < responseJSON.Volunteer.length; i++) {
								var Volunteer = responseJSON.Volunteer[i];
								volenteerListView.add(customviews.createCustomRow(Volunteer.Volunteer, Volunteer.Response, "#9DABB3", 0, 0, false));
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
							if (isAndroid) {
								volenteerslineView.setHeight(parseInt(responseJSON.Volunteer.length * 30) + 70);
							}
							volenteersView.add(customviews.getSeparatorView1(50, 0));
							scrollView.add(volenteersView);

						}
						if (isAndroid) {

						} else {
							if (responseJSON.Player != null && responseJSON.Player.length > 0) {

								playerslineView.setHeight(playerListView.toImage().getHeight() + 70);
							}

							if (responseJSON.Volunteer != null && responseJSON.Volunteer.length > 0) {

								volenteerslineView.setHeight(volenteerListView.toImage().getHeight() + 70);
							}
						}

						actdet = res;
						info.hide();

					} else {
						info.hide();
					}
				}
			}, 0);
		} else {
			if (!isAndroid) {
				info.hide();
			}
			//utils.showAlertWithMessage('Please check your internet connectivity.');
			utils.showAlertWithButton('Please check your internet connectivity.', function() {
				info.hide();
				if (isAndroid) {
					win.close();
				} else {
					navWin.closeWindow(win, {
						animated : true
					});
				}
			});

		}
	});
	contentView.add(scrollView);

	win.add(contentView);
	return win;
}

module.exports = ActivityDetailView;
