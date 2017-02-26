function customMenuButton(args) {

	//Initial Configuration
	this.title = args.title;
	this.image = args.image;
	this.width = args.width;
	this.height = args.height;
	this.top = args.top || 0;

	if ( typeof args.listener != "undefined") {
		this.listener = args.listener;
	}

	//Button View
	this.parentView = Ti.UI.createView({
		width : this.width,
		height : this.height,
		top : this.top,
 		//backgroundColor : "#ffffff",
		borderRadius : 5,
		borderWidth : 1,
		borderColor : "#979797",
		layout : 'vertical'
	});

	// Title Label.
	var aLabel = Ti.UI.createLabel({
		text : this.title,
		color : '#5c5c5c',
		
		font : {
			fontSize : isAndroid ? 16 : 17,
			fontWeight : 'normal',
			fontFamily : 'HelveticaNeue-Light',
		},
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		textAlign : 'center',
		top : 10
	});

	// Add to the parent view.
	this.parentView.add(aLabel);

	// Main logo view
	var logoView = Ti.UI.createImageView({
		image : args.image,
		top : 20,
		bottom : 10,
		width : Ti.UI.SIZE,
		height : 60,

	});

	// Add to the parent view.
	this.parentView.add(logoView);

	//Add event listener to View
	this.parentView.addEventListener('click', this.listener);

	return this.parentView;

}

module.exports = customMenuButton;
