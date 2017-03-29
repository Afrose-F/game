function Login( )
{
	var screenWidth = Ti.Platform.displayCaps.platformWidth;
	screenWidth = ( screenWidth / ( Titanium.Platform.displayCaps.dpi / 160 ) );

	var screenHeight = Ti.Platform.displayCaps.platformHeight;
	screenHeight = ( screenHeight / ( Titanium.Platform.displayCaps.dpi / 160 ) );

	Ti.API.info( "Screen Width: " + screenWidth );
	Ti.API.info( "Screen Height: " + screenHeight );

	var loginWindow = Ti.UI.createWindow(
	{
		orientation : Ti.UI.PORTRAIT,
		backgroundColor : '#E7EAF1',
		navBarHidden : true,
		tabBarHidden : true,
		fullscreen : false,
		theme : "Theme.AppCompat.Translucent.NoTitleBar",
		orientationModes: [
			Ti.UI.PORTRAIT,
		],
	} );

	loginWindow.addEventListener("focus", function(e){
		utils.initLoader( loginWindow );
	});

	var mainView = Ti.UI.createView(
	{
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
	} );

	var logoView = Ti.UI.createView(
	{
		top : 0,
		layout : 'absolute',
		opacity : 1,
		backgroundColor : '#304059',
		height : '200',
	} );

	var leaveapproverlbl = Titanium.UI.createLabel(
	{
		color : '#fff',
		//backgroundColor:'#304059',
		top : 100,
		font :
		{
			fontFamily : 'Calibri',
			fontSize : '10',
			fontWeight : 'bold'
		},
		text : "(Leave Approver)",

	} );

	logoView.add( leaveapproverlbl );

	var eNoahlogoImgView = Ti.UI.createImageView(
	{
		image : '/images/logo.png',
		//opacity:1,
		//backgroundColor:'#304059',
		top : 70,
		width : 150,
	} );

	logoView.add( eNoahlogoImgView );

	mainView.add( logoView );

	var contentView = Ti.UI.createView(
	{
		top : '220dp',
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		layout : 'vertical',
	} );

	var userNameView = Ti.UI.createView(
	{
		layout : 'absolute',
		top : '50dp',
		left : 40,
		right : 40,
		backgroundColor : '#fff',
		borderColor : 'white',
		borderRadius : '20dp',
		height : '40dp',
	} );

	var userNameIcon = Ti.UI.createImageView(
	{
		image : '/images/username.png',
		width : 24,
		height : 24,
		left : 20
	} );

	userNameView.add( userNameIcon );

	var userNameField = Ti.UI.createTextField(
	{
		hintText : 'Username',
		height : '40dp',
		color : 'black',
		//value : 'harihara.g',
		hintTextColor : 'grey',
		autocorrect: false,
		font :
		{
			fontFamily : 'Calibri',
			fontSize : '12',
			fontWeight : 'normal'
		},
		left : 60,
		width : Ti.UI.FILL,
		backgroundColor : '#fff',
		keyboardType : Titanium.UI.KEYBOARD_TYPE_EMAIL,
		autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
	} );

	userNameView.add( userNameField );

	contentView.add( userNameView );

	var passwordView = Ti.UI.createView(
	{
		layout : 'absolute',
		top : '10dp',
		left : 40,
		right : 40,
		backgroundColor : '#fff',
		borderColor : 'white',
		borderRadius : '20dp',
		height : 40
	} );

	var passwordIcon = Ti.UI.createImageView(
	{
		image : '/images/password.png',
		width : 22,
		height : 22,
		left : 20
	} );

	passwordView.add( passwordIcon );

	var passwordField = Ti.UI.createTextField(
	{
		hintText : 'Password',
		passwordMask : 'true',
		//value : 'hari',
		font :
		{
			fontFamily : 'Calibri',
			fontSize : '12',
			fontWeight : 'normal'
		},
		color : 'black',
		borderRadius : '20dp',
		width : Ti.UI.FILL,
		backgroundColor : '#fff',
		hintTextColor : 'grey',
		height : '40dp',
		left : 60,
	} );

	passwordView.add( passwordField );

	contentView.add( passwordView );

	var signInbutton = Titanium.UI.createButton(
	{
		top : '20dp',
		title : 'Login',
		color : 'white',
		backgroundColor : '#cd6000',
		height : 40,
		borderRadius : '20dp',
		left : 40,
		right : 40,
	} );

	contentView.add( signInbutton );

	signInbutton.addEventListener( 'click', function( e )
	{
		passwordField.blur( );
		userNameField.blur( );
		if ( userNameField.value == '' || userNameField.value.split( ' ' ).join( '' ) == '' || passwordField.value == '' || passwordField.value.split( ' ' ).join( '' ) == '' )
		{
			if( isAndroid )
			{
				var toast = Ti.UI.createNotification(
				{
					message : "Please enter all the fields",
					duration : Ti.UI.NOTIFICATION_DURATION_LONG
				} );
				toast.show( );	
			}
			else
			{
				var closeAlert = Ti.UI.createAlertDialog(
				{
					title : 'eLeave',
					message : "Please enter all the fields",
					buttonNames : ['OK'],
				} );
				closeAlert.show( );
			}
		}
		else
		{
			loader.show( );
			login( );
		}

	} );
	
	var text = "Copyrights 2016. All Rights Reserved \neNoah iSolution";
	
	var attr = Titanium.UI.createAttributedString({
		text:text,
		attributes:[
		{
			type:Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
			value:'grey',
			range:[0,text.length]
		},
		{
			type:Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
			value:'#cd6000',
			range:[text.indexOf('eN'), ('e').length]
		}
		
		]
	});
	
	var copyrightlbl = Titanium.UI.createLabel(
	{
		
		top : '10dp',
		font :
		{
			fontFamily : 'Calibri',
			fontSize : '10',
			fontWeight : 'normal'
		},
		attributedString:attr,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,

	} );

	contentView.add( copyrightlbl );

	mainView.add( contentView );

	loginWindow.add( mainView );

	function login( )
	{
		var xhr = Ti.Network.createHTTPClient( );
		//alert(loginURL);
		xhr.open( "POST", loginURL );
		xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
		xhr.setRequestHeader( 'user-agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/50.0.2661.102 Chrome/50.0.2661.102 Safari/537.36' );
		xhr.send(
		{
			"username" : userNameField.value,
			"password" : passwordField.value,
		} );

		xhr.onload = function( e )
		{
			
			loader.hide( );

			try
			{
				var json = JSON.parse( this.responseText );
				Ti.API.info( "-------------------------Login-----------------" );
				Ti.API.info( "Received text: " + this.responseText );
				
				if( json.error_code != '200' )
				{
					alert( json.error_msg );
					return;
				}
				
				var ID = json.user_id;
				var leaveListWindow = require( 'ui/common/LeaveListWindow' );

				Ti.App.Properties.setString( "UserId", ID );

				var obj = new leaveListWindow( ID );
				
				isAndroid?obj.open():navWin.openWindow(obj, {animated:true});
				
				userNameField.value = "";
			    passwordField.value = "";

			}
			catch(e)
			{
				Ti.API.info( "Exception: " + e );
				alert( "An error occurred while processing your request. Please try again later" );
				return;
			}
		};

		xhr.onerror = function( e )
		{
			Ti.API.info( "STATUS: " + this.status );
			Ti.API.info( "TEXT:   " + this.responseText );
			//alert( "ERROR:  " + e.error );
			Ti.API.info( "READY STATE:  " + this.readyState );
			if ( e.code == 0 )
			{
				alert( "Unable to process your request. Kindly check your internet connectivity." );
				return;
			}
			else if ( e.code == 404 || e.code == 408 || e.code == 500 )
			{
				alert( "An error occurred while processing your request. Please try again later" );
				return;
			}
			else
			{
				alert( "An error occurred while processing your request. Please try again later" );
				return;
			}
		};
	}
	
	var navWin = isAndroid ? "" : Ti.UI.iOS.createNavigationWindow(
	{
		window : loginWindow,
		animated : true,
	} );

	return isAndroid ? loginWindow : navWin;
}

module.exports = Login;

