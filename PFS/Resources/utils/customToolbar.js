function customToolbar(args) {

	//Initial Configuration
	this.title = args.title;
	this.isBack = args.isBack;
	this.isRightBtn = args.isRightBtn || false;

	if ( typeof args.listener != "undefined") {
		this.listener = args.listener;
	}
	if ( typeof args.rightBtnListener != "undefined") {
		this.rightBtnListener = args.rightBtnListener;
	}

	//Toolbar View
	this.parentView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : iOS7 ? 70 : 50,
		top : 0,
		backgroundColor : "#216aa6",
		layout : 'vertical'
	});
	this.topView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : iOS7 ? 20 : 0,
		backgroundColor : "#216aa6"

	});
	this.titleBarView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : 50,
		backgroundColor : "#216aa6"

	});
	// Title Label.
	var aLabel = Ti.UI.createLabel({
		text : this.title,
		color : '#ffffff',
		font : {
			fontSize : 18,
			fontWeight : 'normal',
			fontFamily : 'HelveticaNeue-Light'
		},
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		textAlign : 'center',
		left : this.isBack ? 30 : 10
	});
	aLabel.addEventListener('click', this.listener);
	//Check is back arrow button needed
	if (this.isBack) {

		var backBtnView = Ti.UI.createView({
			width : 30,
			height : 50,
			left : 0
		});

		// Back arrow view.
		var backBtnImg = Ti.UI.createImageView({
			image : isAndroid ? '/images/Navigation_Arrow@3x.png' : '/images/Navigation_Arrow.png',
			height : 20,
			width : Ti.UI.SIZE,
			left : 10
		});

		//Add event listener to back button
		backBtnView.addEventListener('click', this.listener);

		//Add backbtn icon to view
		backBtnView.add(backBtnImg);

		//Add to the parent view.
		this.titleBarView.add(backBtnView);

	}

	// Add to the parent view.
	this.titleBarView.add(aLabel);

	// Main logo view
	var logoView = Ti.UI.createImageView({
		image : isAndroid ? '/images/logo@2x.png' : '/images/logo.png',
		width : 40,
		height : 40

	});

	// Add to the parent view.
	this.titleBarView.add(logoView);

	//Check is right button needed
	if (this.isRightBtn) {

		var rightBtnView = Ti.UI.createView({
			width : Ti.UI.SIZE,
			height : 50,
			right : 0
		});

		// Back arrow view.
		/*var rightBtnImg = Ti.UI.createLabel({
		 //image : '/images/addicon.png',
		 height : 25,
		 //width : Ti.UI.SIZE,
		 right : 10
		 });*/
		var rLabel = Ti.UI.createLabel({
			text : 'Logout',
			color : '#ffffff',
			font : {
				fontSize : 20,
				fontWeight : 'normal',
				fontFamily : 'HelveticaNeue-Light'
			},
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE,
			textAlign : 'center',
			right : 10
		});
		//Add event listener to back button
		rightBtnView.addEventListener('click', this.rightBtnListener);

		//Add backbtn icon to view
		rightBtnView.add(rLabel);

		//Add to the parent view.
		this.titleBarView.add(rightBtnView);

	}
	this.parentView.add(this.topView);
	this.parentView.add(this.titleBarView);
	return this.parentView;

}

//Return custom toolbar view
customToolbar.prototype.createCustomToolbar = function() {
	return this.parentView;
};

module.exports = customToolbar;
