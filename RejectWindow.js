function RejectWindow( Rejectparam, approveLeaveWindow, navWin )
{
	var win = Ti.UI.createWindow(
	{
		//backgroundColor : 'white',
		//title : 'Card Demo',
		modal: true,
	} );
	
	win.addEventListener("focus", function(e){
		utils.initLoader( win );
	});

	var overlayView = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		backgroundColor: 'rgb(135,135,135)',
		opacity: 0.8, 
	});

	var mainView = Ti.UI.createView(
	{
		width : "90%",
		height : "65%",
		backgroundColor: '#f2f2f2',
		borderRadius: 20,
	} );

	var contentView = Ti.UI.createView(
	{
		layout : 'vertical',
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		top : '0dp'
	} );

	var remarklbl = Ti.UI.createLabel(
	{
		text : 'Reject remarks',
		color : '#cd6000',
		font :
			{
				fontFamily : 'Calibri',
				fontSize : '20',
				fontWeight : 'bold'
			},
		left : 10,
		top : 20
	} );

	contentView.add( remarklbl );

	var commentsArea = Ti.UI.createTextArea(
	{
		//hintText:'Comments',
		borderWidth : 2,
		maxLength : 100,
		width : Ti.UI.FILL,
		right : 10,
		backgroundColor:'#fff',
		borderColor : '#bbb',
		borderRadius : 5,
		color : 'black',
		left : 10,
		top : 20,
		height : '55%',
	} );

	contentView.add( commentsArea );

	var buttonView = Ti.UI.createView(
	{
		layout: 'absolute',
		width : Ti.UI.FILL,
		top : '20dp',
		height : 50,

	} );

	// Create a Button.
	var submitButton = Ti.UI.createButton(
	{
		title : 'Submit',
		height : 40,
		//borderRadius:'20dp',
		backgroundColor:'#304059',
		width : '100dp',
		left : (screenWidth - 250)/2,
		color: 'white',
	} );

	// Listen for click events.
	submitButton.addEventListener( 'click', function( )
	{
		
		if (commentsArea.value == '' || commentsArea.value.split( ' ' ).join( '' ) == '')
		{	
			if( isAndroid )
			{
				var toast = Ti.UI.createNotification(
				{
					message : "Enter the remarks",
					duration : Ti.UI.NOTIFICATION_DURATION_SHORT
				} );
				toast.show( );	
			}
			else
			{
				var closeAlert = Ti.UI.createAlertDialog(
				{
					title : 'eLeave',
					message : "Please enter Reject Remarks",
					buttonNames : ['OK'],
				} );
				closeAlert.show( );
			}
			
			return;
		}
		
		sendRequest( );	
	} );

	// Add to the parent view.
	buttonView.add( submitButton );

	var cancelButton = Ti.UI.createButton(
	{
		title : 'Cancel',
		height : 40,
		backgroundColor:'#304059',
		//borderRadius:'20dp',
		width : '100dp',
		right : (screenWidth - 250)/2,
		color: 'white',
	} );

	// Listen for click events.
	cancelButton.addEventListener( 'click', function( )
	{
		win.close( );
	} );

	// Add to the parent view.
	buttonView.add( cancelButton );

	contentView.add( buttonView );
	mainView.add( contentView );

	function errorMessage( )
	{
		loader.hide( );
		var closeAlert = Ti.UI.createAlertDialog(
		{
			title : 'eLeave',
			message : "An error occurred while processing your request. Please try again later",
			buttonNames : ['OK'],
		} );
		closeAlert.show( );
	}

	function getRejectResponse( )
	{
		var response = xhr.responseText;
		
		Ti.API.info("coming here");
		
		//HUD.hide();

		var json = JSON.parse( xhr.responseText );

		//alert( json );
		
		loader.hide( );
		
		win.close( );
		
		isAndroid?approveLeaveWindow.close( ):navWin.close({animated:true});
	}

	var hudProgress = require('ui/common/ANActivityIndicator');
	var HUD, xhr;
	function sendRequest( )
	{
		loader.show( );
		xhr = Titanium.Network.createHTTPClient(
		{
			// function called when the response data is available
			onload : getRejectResponse,
			// function called when an error occurs
			onerror : errorMessage
		} );
	
		xhr.open( "POST", rejectURL );
		xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
		xhr.setRequestHeader( 'user-agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/50.0.2661.102 Chrome/50.0.2661.102 Safari/537.36' );
		var params =
		{
			levelid : Rejectparam.LevelId,
			statusid : Rejectparam.StatusId,
			leaverequestid : Rejectparam.LeaverequestId,
			userid : Rejectparam.UserId,
			type : Rejectparam.Type,
			remark: commentsArea.value,
		};
		// Send the request
		xhr.send( params );		
	}

	// add table view to the window

	win.add( overlayView );

	win.add( mainView );

	return win;

}

module.exports = RejectWindow;
