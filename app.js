/**
 * @author	: afrose.f
 *
 * Class	: app.js
 *
 * Purpose	:
 *
 */

var isAndroid = ( Ti.Platform.osname == 'android' ) ? true : false;

var customFont = isAndroid ? 'AvenirLTStd-Light' : 'Avenir Light';
var boldFont = isAndroid ? 'AvenirLTStd-Heavy' : 'Avenir Heavy';
var mediumFont = isAndroid ? 'AvenirLTStd-Medium' : 'Avenir Medium';

var webServiceURL = "http://sandbox.enoahprojects.com/econnectv15/webservicesv1/";
//var webServiceURL = "http://econnect.enoahisolution.com/";

//var loginURL = webServiceURL + "home/mobile_app_login";
var loginURL = webServiceURL + "mobile_app_login";
//var leaveRequestListURL = webServiceURL + "applyleave/get_pending_leave_request_list";
var leaveRequestListURL = webServiceURL + "get_pending_leave_request_list";
//var detailLeaveRequestURL = webServiceURL + "applyleave/approver_view_mobileapp";
var detailLeaveRequestURL = webServiceURL + "approver_view_mobileapp";
//var approveURL = webServiceURL + "applyleave/app_leave_approve_reject";
var approveURL = webServiceURL + "app_leave_approve_reject";
//var rejectURL = webServiceURL + "applyleave/app_leave_approve_reject";
var rejectURL = webServiceURL + "app_leave_approve_reject";
//var logoutURL = webServiceURL + "home/mobile_app_logout";
var logoutURL = webServiceURL + "mobile_app_logout";

Ti.API.info(loginURL);
Ti.API.info(leaveRequestListURL);
Ti.API.info(detailLeaveRequestURL);
Ti.API.info(approveURL);
Ti.API.info(rejectURL);
Ti.API.info(logoutURL);


var screenWidth = Ti.Platform.displayCaps.platformWidth;

var screenHeight = Ti.Platform.displayCaps.platformHeight;

Ti.API.info(Ti.Platform.osname);

if( isAndroid )
{
	screenWidth = ( screenWidth / ( Titanium.Platform.displayCaps.dpi / 160 ) );
	screenHeight = ( screenHeight / ( Titanium.Platform.displayCaps.dpi / 160 ) );
}

var version = Ti.Platform.version;

Ti.API.info('Version: '+version);


var utils = require('/ui/common/Utils');
var loader = utils.getActivityIndicatorView( "Please Wait.." );


Ti.API.info( "Screen Width: " + screenWidth );
Ti.API.info( "Screen Height: " + screenHeight );

var loginWindow = require( 'ui/common/Login' );
var win = new loginWindow( );

win.open( );

//(setTimeout(function(){win.open();},2000));
