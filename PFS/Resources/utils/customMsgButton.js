function customMenuButton(args) {

	//Initial Configuration
	this.title = args.title;
	this.image = args.image;
	this.width = args.width;
	this.height = args.height;
	this.top = args.top||0;

	if ( typeof args.listener != "undefined") {
		this.listener = args.listener;
	}

	//Button View
	this.parentView = Ti.UI.createView({
		width : this.width,
		height : this.height,
		top : this.top,
		backgroundColor : "#5FABAF",
		borderRadius : 10,
		//borderColor:"#ccc",
		//borderWidth:0,
		layout : 'vertical'
	});

	
	// Main logo view
	var logoView = Ti.UI.createImageView({
		image : args.image,
		top : 25,
		//width : 70,
		height : 50

	});

	// Add to the parent view.
	this.parentView.add(logoView);
	
// Title Label.
	var aLabel = Ti.UI.createLabel({
		text : this.title,
		color : '#FFFFFF',
		font : {
			fontSize : 18,
			fontWeight:'bold',
			fontFamily:'HelveticaNeue-Light',
		},
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		textAlign : 'center',
		top : 10,
		bottom:20,
	});

	// Add to the parent view.
	this.parentView.add(aLabel);
	//Add event listener to View
	this.parentView.addEventListener('click', this.listener);
	
	return this.parentView;

}

module.exports = customMenuButton; 