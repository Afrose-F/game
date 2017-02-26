var iOS7 = utils.isiOS7Plus();
//Create and return Window
exports.createWindow = function(args) {

	var layout = args.layout || "vertical";
	if (isAndroid) {
		return Ti.UI.createWindow({
			navBarHidden : true,
			tabBarHidden : true,
			//fullscreen:false,
			//backgroundColor : '#ccccccc',
			backgroundImage : "/images/bg_img.png",
			//theme : 'Theme.AppCompat.Translucent.NoTitleBar',
			theme : "Theme.Titanium",
			//layout : layout
		});
	} else {
		return Ti.UI.createWindow({
			navBarHidden : true,
			tabBarHidden : true,
			//backgroundColor : '#ccccccc',
			//transitionAnimation: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT,

			backgroundImage : "/images/Background.png",
			//backgroundColor:'transparent',
			theme : "Theme.Titanium",
			statusBarStyle : Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
			//layout : layout,
			top : iOS7 ? 0 : 0
		});
	}

};
//Create and return  background View with rounded corners
exports.contentView = function(text) {
	return Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		//backgroundColor : '#f7f7f7',
		top : iOS7 ? 70 : 50
	});
};

//Create and return Scrollable background View with rounded corners
exports.createScrollView = function(text) {
	return Ti.UI.createScrollView({
		borderRadius : 10,
		backgroundColor : '#f7f7f7',
		borderColor : '#979797',
		borderWidth : 2,
		top : 20,
		right : 20,
		left : 20,
		bottom : 20,
		color : "#ffffff",
		height : "auto",
		layout : 'vertical'
	});
};

//Create and return  background View with rounded corners
exports.createView = function(text) {
	return Ti.UI.createView({
		borderRadius : 10,
		top : 10,
		right : 10,
		left : 10,
		bottom : 10,
		color : "#ffffff"
	});
};

//Create and return Scrollable background View with rounded corners
exports.createHeaderLabel = function(text) {
	return Ti.UI.createLabel({
		text : text,
		left : 10,
		height : 50,
		//top:5,
		//bottom:5,
		width : Ti.UI.SIZE,
		font : {
			fontSize : 22,
			fontWeight : 'bold',
			fontFamily : 'HelveticaNeue-Light',
		},
		color : "#5c5c5c",
		textAlign : 'left'

	});
};
//Create and return separator line
exports.getSeparatorView = function() {
	return Ti.UI.createView({
		backgroundColor : '#979797',
		width : Ti.UI.FILL,
		height : 1
	});
};

//Create and return separator line
exports.getListSeparatorView = function() {
	return Ti.UI.createView({
		backgroundColor : '#ccc',
		width : Ti.UI.FILL,
		height : 1
	});
};

//Create and return separator line with left padding
exports.getSeparatorView1 = function(left, bottom) {
	return Ti.UI.createView({
		backgroundColor : '#dfdfdf',
		width : Ti.UI.FILL,
		height : 1,
		left : left,
		bottom : bottom
	});
};

//Create and return separator line with left padding
exports.getSeparatorView2 = function(left, bottom) {
	return Ti.UI.createView({
		backgroundColor : '#dfdfdf',
		width : Ti.UI.FILL,
		height : 1,
		left : left,
		bottom : bottom
	});
};
//Create and return disclosure icon in listview
exports.getDisclosureView = function() {
	return Ti.UI.createImageView({
		image : 'images/arrow.png',
		height : 10
	});
};

//Create and return labelview
exports.createLabelView = function(text) {
	return Ti.UI.createLabel({
		text : text,
		top : 10,
		right : 10,
		left : 10,
		bottom : 10,
		font : {
			fontSize : 16,
			fontWeight : 'normal'
		},
		color : "#3e3e3e",
		textAlign : 'center'

	});
};

//Create and return custom row view
exports.createCustomRow = function(ltext, rtext, color, left, right, isheader) {
	var parentView = Ti.UI.createView({
		//backgroundColor : '#fff',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		left : left,
		right : right,
		top : isheader ? 10 : 5,
		bottom : isheader ? 5 : 5,
	});
	var leftLabel = Ti.UI.createLabel({
		text : ltext,
		left : 10,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		font : {
			fontSize : isheader ? 18 : 16,
			fontWeight : isheader ? 'bold' : 'bold',
			fontFamily : 'OpenSans-Light',
		},
		color : color,
		textAlign : 'left'

	});
	parentView.add(leftLabel);
	var rightLabel = Ti.UI.createLabel({
		text : rtext,
		right : 10,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		font : {
			fontSize : isheader ? 18 : 16,
			fontWeight : isheader ? 'bold' : 'bold',
			fontFamily : isheader ? 'OpenSans-Light' : 'OpenSans-Light',
		},
		color : color,
		textAlign : 'right'

	});
	parentView.add(rightLabel);
	return parentView;
};

exports.getCustomHintText = function(text) {
	var attr = Titanium.UI.iOS.createAttributedString({
		text : text,
		attributes : [{
			type : Titanium.UI.iOS.ATTRIBUTE_FOREGROUND_COLOR,
			value : "#5c5c5c",
			range : [0, text.length]
		}]
	});
	return attr;
}; 