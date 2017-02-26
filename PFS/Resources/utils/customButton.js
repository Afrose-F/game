function customButton(args) {

	//Initial Configuration
	this.title = args.title;
	this.image = args.image;
	this.width = args.width;
	this.height = args.height;
	if ( typeof args.listener != "undefined") {
		this.listener = args.listener;
	}

	//Button View
	this.parentView = Ti.UI.createView({
		width : this.width,
		height : this.height,
		top : 0,
		backgroundColor : "#EEEEEE",
		borderRadius : 10,
		borderColor : "#979797",
		borderWidth:1
		//layout : 'horizontal'
	});

	// Title Label.
	var aLabel = Ti.UI.createLabel({
		text : this.title,
		color : '#42657B',
		font : {
			fontSize : 13,
			fontWeight : 'bold',
			fontFamily:'OpenSans-Light'
		},
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		textAlign : 'center',
		left : 35,
		right:10
	});

	// Add to the parent view.
	this.parentView.add(aLabel);

	// Main logo view
	var logoView = Ti.UI.createImageView({
		image : args.image,
		left : 10,
		height : 20
	});

	// Add to the parent view.
	this.parentView.add(logoView);

	//Add event listener to View
	this.parentView.addEventListener('click', this.listener);

	return this.parentView;

}

module.exports = customButton;
