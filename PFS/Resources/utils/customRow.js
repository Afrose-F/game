function customRow(args) {

	var self = this;
	this.title = args.title || "";
	this.duration = args.duration || "";
	this.notes = args.notes || "";
	this.drill = args.drill || "";
	this.wrampup = args.wrampup || "";
	this.pfcid = args.pfcid || "";
	this.sessionID = args.sessionID || "";
	this.IndvSessionID = args.IndvSessionID || "";
	this.userID = args.userID || "";
	this.token = args.token || "";

	this.isNotesHidden = true;
	this.isDrillHidden = true;
	this.isWramupHidden = true;
	this.isFirstTime = true;
	//Tab buttons title
	this.buttons = ['Notes', 'Drills', 'Warmup'];

	//Parent view which holds all other views
	this.parentView = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : "100%",
		layout : 'vertical',
		top : 0,
		bottom : 0,

	});

	//Row Title View
	this.titleView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		left : 5,
		right : 5,
		top : 10 ,
	});

	//Row Title View
	/*this.leftView = Ti.UI.createView({
	 width : 25,
	 height : 25,
	 left : 10,
	 borderRadius:5,
	 borderColor:"#9d9d9d",
	 backgroundColor:"#cccccc",
	 image:'/images/check.png'

	 });*/
	this.leftView = Ti.UI.createImageView({

		width : 35,
		height : 35,
		left : 10,
		pfcid : this.pfcid,
		sessionID : this.sessionID,
		IndvSessionID : this.IndvSessionID,
		userID : this.userID,
		token : this.token,
		//borderRadius : 5,
		//borderColor : "#9d9d9d",
		//backgroundColor : "#cccccc",
		image : '/images/uncheck.png'
	});
	/*var db = Ti.Database.open('PFSDB');
	 var sessionplans = db.execute('SELECT * FROM sessionplan WHERE userid=? and sessionid=? and plantype=?', this.userID, this.IndvSessionID, this.pfcid);
	 if (sessionplans.rowCount > 0) {
	 //Ti.API.info('Person ---> ROWID: ' + sessionplans.field(1));

	 while (sessionplans.isValidRow()) {
	 if (sessionplans.fieldByName('isRead') == "1") {
	 self.leftView.image = "/images/check.png";
	 } else {
	 self.leftView.image = "/images/uncheck.png";
	 }
	 sessionplans.next();

	 }
	 } else {
	 self.leftView.image = "/images/uncheck.png";
	 }
	 db.close();*/
	this.leftView.addEventListener('click', function(e) {
		resetBtn();
		if (e.source.image == "/images/check.png") {
			//if (self.isWramupHidden || self.isDrillHidden || self.isNotesHidden) {
			self.lblDetails.setText(self.notes);
			self.tbarLabelView.show();
			self.tbarLabelView.setHeight(Ti.UI.SIZE);
			self.tbarLabelView.setBottom(20);
			self.isNotesHidden = false;
			self.isDrillHidden = true;
			self.isWramupHidden = true;
			subBtn1.backgroundColor = "#74c4c0";
			subBtn1.children[0].setColor("#fff");
			e.source.image = "/images/uncheck.png";
		} else {

			if (self.isFirstTime) {
				e.source.image = "/images/uncheck.png";
				self.lblDetails.setText(self.notes);
				self.tbarLabelView.show();
				self.tbarLabelView.setHeight(Ti.UI.SIZE);
				self.tbarLabelView.setBottom(20);
				self.isNotesHidden = false;
				self.isDrillHidden = true;
				self.isFirstTime=false;
				self.isWramupHidden = true;
				subBtn1.backgroundColor = "#74c4c0";
				subBtn1.children[0].setColor("#fff");
				e.source.image = "/images/uncheck.png";
			} else {
				e.source.image = "/images/check.png";
				self.tbarLabelView.setHeight(0);
				self.tbarLabelView.setBottom(0);
				self.tbarLabelView.hide();
				
				self.isNotesHidden = true;
				self.isDrillHidden = true;
				self.isWramupHidden = true;
			}
		}
		//alert(e.source.image);
		/*if (e.source.image == "/images/check.png") {
		 var db = Ti.Database.open('PFSDB');
		 var sessionplans = db.execute('SELECT * FROM sessionplan WHERE userid=? and sessionid=? and plantype=?', e.source.userID, e.source.IndvSessionID, e.source.pfcid);
		 if (sessionplans.rowCount > 0) {
		 while (sessionplans.isValidRow()) {
		 db.execute('UPDATE sessionplan SET isRead=? WHERE userid=? and sessionid=? and plantype=?', '0', e.source.userID, e.source.IndvSessionID, e.source.pfcid);
		 sessionplans.next();
		 }
		 } else {
		 db.execute('INSERT INTO sessionplan (userid , sessionid , isRead , plantype ) VALUES (?, ?, ?, ?)', e.source.userID, e.source.IndvSessionID, "0", e.source.pfcid);
		 }
		 db.close();

		 e.source.image = "/images/uncheck.png";
		 } else {
		 var db = Ti.Database.open('PFSDB');
		 var sessionplans = db.execute('SELECT * FROM sessionplan WHERE userid=? and sessionid=? and plantype=?', e.source.userID, e.source.IndvSessionID, e.source.pfcid);
		 if (sessionplans.rowCount > 0) {
		 while (sessionplans.isValidRow()) {
		 db.execute('UPDATE sessionplan SET isRead=? WHERE userid=? and sessionid=? and plantype=?', '1', e.source.userID, e.source.IndvSessionID, e.source.pfcid);
		 sessionplans.next();
		 }
		 } else {
		 db.execute('INSERT INTO sessionplan (userid , sessionid , isRead , plantype ) VALUES (?, ?, ?, ?)', e.source.userID, e.source.IndvSessionID, "1", e.source.pfcid);
		 }
		 db.close();
		 e.source.image = "/images/check.png";
		 }*/

	});

	this.titleView.add(this.leftView);
	//Title label
	this.leftLabel = Ti.UI.createLabel({
		text : this.title,
		left : 50,
		right : 100,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		font : {
			fontSize : 18,
			fontWeight : 'normal',
			fontFamily : 'HelveticaNeue-Light',
		},
		color : '#5c5c5c',
		textAlign : 'left'

	});
	this.titleView.add(this.leftLabel);

	//Duration label
	this.rightLabel = Ti.UI.createLabel({
		text : this.duration,
		right : 10,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		font : {
			fontSize : 14,
			fontWeight : 'normal',
			fontFamily : 'HelveticaNeue-Light',
		},
		color : '#A5A5A5',
		textAlign : 'right'

	});
	this.titleView.add(this.rightLabel);
	this.parentView.add(this.titleView);

	//Custom Tabbar View
	this.tbarView = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		backgroundColor : "#fff",
		borderColor : "#ccc",
		top : 20,
		bottom : 20,
		left : 15,
		right : 15,
		borderRadius : 10,
	});

	this.wrapper = Ti.UI.createView({
		width : Ti.UI.FILL,
		borderRadius : 0,
		height : Ti.UI.SIZE,
		backgroundColor : "#fff"
		//top : 10,
		//bottom : 10,

	});

	//Notes Button
	var subBtn1 = Ti.UI.createView({
		backgroundColor : 'white',
		borderColor : '#ccc',
		borderWidth : 1,
		left : 0,
		width : isAndroid ? "33%" : "34%",
		height : 40,
		myIndex : 0
	});

	//Add Notes Button Title
	subBtn1.add(Ti.UI.createLabel({
		text : this.buttons[0],
		color : "#A5A5A5",
		font : {
			fontWeight : 'normal',
			fontSize : 16,
			fontFamily : 'HelveticaNeue-Light',
		}
	}));

	//Add to parentView
	this.wrapper.add(subBtn1);

	//Add Click event listener to notes button
	subBtn1.addEventListener('click', function(e) {
		
		self.isFirstTime = false;
		//reset all buttons
		if (self.isNotesHidden) {
			resetBtn();
			self.lblDetails.setText(self.notes);
			self.tbarLabelView.show();
			self.tbarLabelView.setHeight(Ti.UI.SIZE);
			self.tbarLabelView.setBottom(20);
			self.isNotesHidden = false;
			self.isDrillHidden = true;
			self.isWramupHidden = true;
			self.leftView.image = "/images/uncheck.png";
			subBtn1.backgroundColor = "#74c4c0";
			subBtn1.children[0].setColor("#fff");
		} else {
			/*self.leftView.image = "/images/check.png";
			self.tbarLabelView.hide();
			self.tbarLabelView.setHeight(0);
			self.tbarLabelView.setBottom(0);
			self.isNotesHidden = true;*/

		}
	});

	//Drill Button
	var subBtn2 = Ti.UI.createView({
		backgroundColor : 'white',
		borderColor : '#ccc',
		borderWidth : 0,
		left : "33%",
		width : "34%",
		height : 40,
		myIndex : 1
	});

	//Add Drill Button Title
	subBtn2.add(Ti.UI.createLabel({
		text : this.buttons[1],
		color : "#A5A5A5",
		font : {
			fontWeight : 'normal',
			fontSize : 16,
			fontFamily : 'HelveticaNeue-Light',
		}
	}));

	//Add Click event listener to Drill button
	subBtn2.addEventListener('click', function(e) {
		
		self.isFirstTime = false;
		if (self.isDrillHidden) {
			resetBtn();
			self.lblDetails.setText(self.drill);
			self.tbarLabelView.show();
			self.tbarLabelView.setHeight(Ti.UI.SIZE);
			self.tbarLabelView.setBottom(20);
			self.isDrillHidden = false;
			self.isNotesHidden = true;
			self.isWramupHidden = true;
			self.leftView.image = "/images/uncheck.png";
			subBtn2.backgroundColor = "#74c4c0";
			subBtn2.children[0].setColor("#fff");
		} else {
			/*self.leftView.image = "/images/check.png";
			self.tbarLabelView.hide();
			self.tbarLabelView.setHeight(0);
			self.tbarLabelView.setBottom(0);
			self.isDrillHidden = true;*/
		}
	});

	this.wrapper.add(subBtn2);

	//Wrampup Button
	var subBtn3 = Ti.UI.createView({
		backgroundColor : 'white',
		borderColor : '#ccc',
		borderWidth : 1,
		left : "66%",
		width : "34%",
		height : 40,
		myIndex : 2
	});

	//Add Wramup Button Title
	subBtn3.add(Ti.UI.createLabel({
		text : this.buttons[2],
		color : "#A5A5A5",
		font : {
			fontWeight : 'normal',
			fontSize : 16,
			fontFamily : 'HelveticaNeue-Light',
		}
	}));
	var show = Ti.UI.createAnimation({
		opacity : 0,
		duration : 5000,
	});

	var hide = Ti.UI.createAnimation({
		opacity : 1,
		duration : 5000,
	});

	//Add Click event listener to Wramup button
	subBtn3.addEventListener('click', function(e) {
		
		self.isFirstTime = false;
		if (self.isWramupHidden) {
			resetBtn();
			self.lblDetails.setText(self.wrampup);
			self.tbarLabelView.show();
			//self.tbarLabelView.animate(show);
			self.tbarLabelView.setHeight(Ti.UI.SIZE);
			self.tbarLabelView.setBottom(20);
			self.isWramupHidden = false;
			self.isDrillHidden = true;
			self.isNotesHidden = true;
			self.leftView.image = "/images/uncheck.png";
			subBtn3.backgroundColor = "#74c4c0";
			subBtn3.children[0].setColor("#fff");
		} else {
			/*self.leftView.image = "/images/check.png";
			self.tbarLabelView.hide();
			//self.tbarLabelView.animate(hide);
			self.tbarLabelView.setHeight(0);
			self.tbarLabelView.setBottom(0);
			self.isWramupHidden = true;*/

		}
	});

	this.wrapper.add(subBtn3);

	//Add tabs to tabview
	this.tbarView.add(this.wrapper);

	//Function to reset the button color to default
	function resetBtn() {
		subBtn3.backgroundColor = "#fff";
		subBtn3.children[0].setColor("#A5A5A5");
		subBtn2.backgroundColor = "#fff";
		subBtn2.children[0].setColor("#A5A5A5");
		subBtn1.backgroundColor = "#fff";
		subBtn1.children[0].setColor("#A5A5A5");

	}


	this.parentView.add(this.tbarView);

	//Details View
	this.tbarLabelView = Ti.UI.createView({
		height : 0,

		bottom : 0,
		left : 15,
		right : 15,
		width : Ti.UI.FILL,
		backgroundColor : "#fff",
		borderColor : "#ccc",
		borderRadius : 0,
	});

	this.lblDetails = Ti.UI.createLabel({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		backgroundColor : "#fff",
		top : 10,
		left : 10,
		right : 10,
		color : '#5c5c5c',
		font : {
			fontWeight : 'normal',
			fontSize : 16,
			fontFamily : 'HelveticaNeue-Light',
		}
	});

	this.tbarLabelView.add(this.lblDetails);

	this.parentView.add(this.tbarLabelView);

	this.parentView.add(customviews.getSeparatorView());

	return this.parentView;

}

module.exports = customRow;
