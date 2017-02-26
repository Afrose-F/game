function LoginView() {
	var win = customviews.createWindow({});

	var contentView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		top : 20,
		layout : 'vertical'
	});

	var scrollView = Ti.UI.createScrollView({
		borderRadius : 10,
		backgroundColor : '#f7f7f7',
		borderColor : '#979797',
		borderWidth : 2,
		top : 20,
		right : 20,
		left : 20,
		bottom : 20,
		color : "#ffffff",
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		layout : 'vertical'
	});

	// Main logo view
	var logoView = Ti.UI.createImageView({
		image : isAndroid?'/images/logo@2x.png':'/images/logo.png',
		width : 60,
		height : 60,
		top : 50,

	});

	// Add to the parent view.
	scrollView.add(logoView);

	// Create a TextField for email
	var txtEmail = Ti.UI.createTextField({
		height : 45,
		top : 40,
		width : "90%",

		color : '#5c5c5c',
		backgroundColor : "transparent",
		autocorrect : false,
		autocapitalization :Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
		hintText : 'Email',
		borderRadius : 5,
		paddingLeft : 10,
		paddingRight : 10,
		borderColor : '#979797',
		//softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, // Android only
		keyboardType : Ti.UI.KEYBOARD_EMAIL,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		font : {
			fontSize : 16,
			fontWeight : 'normal',
			fontFamily : 'HelveticaNeue-Light',
		},
		textAlign : 'center',
		value : isAndroid ? "" : ""
		//borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	// Listen for return events.
	txtEmail.addEventListener('return', function(e) {
		txtEmail.blur();

	});
	txtEmail.addEventListener('focus', function(e) {
		/*if (isAndroid) {
			if (txtEmail.value == "Email") {
				txtEmail.value = "";
			}
		}*/

	});

	txtEmail.addEventListener('blur', function(e) {
		/*if (isAndroid) {
			if (txtEmail.value == "") {
				txtEmail.value = "Email";
			}

		}*/
	});
	scrollView.add(txtEmail);

	// Create a TextField for Password
	var txtPassword = Ti.UI.createTextField({
		height : 45,
		top : 20,
		width : "90%",
		color : '#5c5c5c',
		autocorrect : false,
		backgroundColor : "transparent",
		hintText : 'Password',
		//attributedHintText :customviews.getCustomHintText('Password'),
		passwordMask : isAndroid ? true : true,
		borderRadius : 5,
		paddingLeft : 10,
		paddingRight : 10,
		borderColor : '#979797',
		//softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, // Android only
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		font : {
			fontSize : 16,
			fontWeight : 'normal',
			fontFamily : 'HelveticaNeue-Light',
		},
		textAlign : 'center',
		value : isAndroid ? "" : ""
		//borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	// Listen for return events.
	txtPassword.addEventListener('return', function(e) {
		txtPassword.blur();

	});
	txtPassword.addEventListener('focus', function(e) {
		/*if (isAndroid) {
			if (this.value == "Password") {
				txtPassword.passwordMask = true;
				txtPassword.value = "";
			}
		}*/
	});

	txtPassword.addEventListener('blur', function(e) {
		if (isAndroid) {
			/*if (txtPassword.value == "") {
				txtPassword.value = "Password";
				txtPassword.passwordMask = false;
			}*/
		}
	});
	scrollView.add(txtPassword);

	// Create a Submit Button.
	var btnSubmit = Ti.UI.createButton({
		title : 'Login',
		height : 45,
		width : "90%",
		top : 40,
		bottom : 40,
		backgroundColor : '#266CA4',
		borderRadius : 5,
		color : '#fff',
		font : {
			fontSize : 18,
			fontWeight : 'bold',
			fontFamily : 'HelveticaNeue-Light',
		},

	});

	// Listen for click events.
	btnSubmit.addEventListener('click', function() {

		var email = txtEmail.value.trim();
		var password = txtPassword.value.trim();
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (email != "" && password != "") {

			if (reg.test(email) == false) {
				utils.showAlertWithMessage("Please enter a valid email address");

			} else {
				httpRequest.loadWebservice({
					url : loginUrl,
					reqParams : {
						'login' : email,
						'password' : password
					},
					success : function(responseJSON, info) {

						if (responseJSON.data.length > 0) {
							//utils.showAlertWithMessage("Welcome " + responseJSON.data[0].FirstName);
							Ti.App.Properties.setString("userid", responseJSON.data[0].PFCID);
							Ti.App.Properties.setString("email", email);
							Ti.App.Properties.setString("password", password);
							Ti.App.Properties.setString("token", responseJSON.data[0].LoginToken);

							if (isAndroid) {
								var menuWindow = require('/ui/common/MenuView');
								new menuWindow().open();
								win.close();
								info.hide();
							} else {
								var menuWindow = require('/ui/common/MenuView');
								navWin = Titanium.UI.iOS.createNavigationWindow({
									window : new menuWindow()
								});
								navWin.open();
								win.close();
								info.hide();
							}

						} else {
							info.hide();
							utils.showAlertWithMessage("Login credentials are incorrect, please try again.");
							return;
						}
					}
				}, 0);
			}
		} else {
			utils.showAlertWithMessage("Please enter your email and password to login");
		}

	});

	// Add to the parent view.
	scrollView.add(btnSubmit);
	var version=isAndroid?"0.0.3":Ti.App.version;
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
	return win;
}

module.exports = LoginView;
