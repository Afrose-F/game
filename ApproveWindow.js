function ApproveWindow( Approveparam )
{

	var ApproveWindow = Ti.UI.createWindow(
	{
		backgroundColor : 'white',
	} );

	
	function errorMessage( )
	{
		alert( "Well, that didn't work" );
	}



	function getApproveResponse( )
	{
		var response = xhr.responseText;
		
		var json = JSON.parse( xhr.responseText );
		
		alert(json);
	}


	var xhr = Titanium.Network.createHTTPClient(
	{
		// function called when the response data is available
		onload : getApproveResponse,
		// function called when an error occurs
		onerror : errorMessage
	} );

	xhr.open( "POST", approveURL );
	xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
	xhr.setRequestHeader( 'user-agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/50.0.2661.102 Chrome/50.0.2661.102 Safari/537.36' );
	var params =
	{
		levelid : Approveparam.LevelId,
		statusid:Approveparam.StatusId,
		leaverequestid: Approveparam.LeaverequestId,
		userid:Approveparam.UserId,
		type :Approveparam.Type
	};
	// Send the request
	xhr.send( params );

	// add table view to the window

	return ApproveWindow;

}

module.exports = ApproveWindow;
