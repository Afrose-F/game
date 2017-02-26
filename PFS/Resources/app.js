Titanium.UI.setBackgroundImage('/images/bg_img.png');
//Titanium.UI.setBackgroundColor('#fff');
var osname = Ti.Platform.osname,
    version = Ti.Platform.version,
    deviceName = Ti.Platform.model,
    platform = Ti.Platform.name,
    pheight = Ti.Platform.displayCaps.platformHeight,
    pwidth = Ti.Platform.displayCaps.platformWidth;
var isSmallScreen = pheight == 480 ? true : false;
var isFourInch = pheight == 568 ? true : false;
var isIphone6 = pheight > 568 ? true : false;
var isAndroid = osname === 'android' ? true : false;

//Include Common files
var utils = require("/utils/utils");
var customviews = require("/utils/customViews");
var customtoolbar = require("/utils/customToolbar");
var httpRequest = require("/utils/webservice");
var iOS7 = utils.isiOS7Plus();

//Webservice Urls
var webserviceUrl = "http://placeforsports.com:81/PFS_Service.asmx/";

var loginUrl = webserviceUrl + "AuthenticateUser";
var teamListUrl = webserviceUrl + "GetAllTeam";
var activityListUrl = webserviceUrl + "GetAllActivities";
var newActivityUrl = webserviceUrl + "InsertActivity";
var activityDetailsUrl = webserviceUrl + "GetActivityDetails";
var membersEmailUrl = webserviceUrl + "GetTeamorGroupMembersEmailDetails";
var GetMembersEmailUrl = webserviceUrl + "GetEmailforActivity";
var individualListUrl = webserviceUrl + "GetIndividualSessionList";
var sessionListUrl = webserviceUrl + "GetSessionList";
var sessionDetailUrl = webserviceUrl + "GetIndividualSessionDetails";
var deleteActivityUrl = webserviceUrl + "DeleteActivities";
var BIPageVisitUrl = "http://enoahbi.com:4000/pagevisit";
var BIAppUrl = "http://enoahbi.com:4001/downloads";
//bootstrap the database
/*var db = Ti.Database.open('PFSDB');
 db.execute('CREATE TABLE IF NOT EXISTS sessionplan(userid TEXT, sessionid TEXT, isRead TEXT, plantype TEXT);');
 db.close();*/
if (isAndroid) {
} else {
	var navWin = {};
}(function() {
	//Ti.App.Properties.setBool("isEdited",false);
	if (Ti.App.Properties.hasProperty("email") && Ti.App.Properties.hasProperty("password") && Ti.App.Properties.getString("password") != "" && Ti.App.Properties.getString("email") != "") {
		var email = Ti.App.Properties.getString("email");
		var password = Ti.App.Properties.getString("password");

		if (utils.checkInternetConnection()) {
			httpRequest.loadWebservice({
				url : loginUrl,
				reqParams : {
					'login' : email,
					'password' : password
				},
				error : function(e) {
					var LoginWindow = require('/ui/common/LoginView');
					if (isAndroid) {
						
						new LoginWindow().open();
					} else {
						new LoginWindow().open();
					}

				},
				success : function(responseJSON, info) {

					if (responseJSON.data != null && responseJSON.data.length > 0) {
						//utils.showAlertWithMessage("Welcome " + responseJSON.data[0].FirstName);
						Ti.App.Properties.setString("userid", responseJSON.data[0].PFCID);
						Ti.App.Properties.setString("email", email);
						Ti.App.Properties.setString("password", password);
						Ti.App.Properties.setString("token", responseJSON.data[0].LoginToken);

						if (isAndroid) {
							var menuWindow = require('/ui/common/MenuView');
							new menuWindow().open();
							//win.close();
							info.hide();
						} else {
							var menuWindow = require('/ui/common/MenuView');
							navWin = Titanium.UI.iOS.createNavigationWindow({
								window : new menuWindow()
							});
							navWin.open();
							//win.close();
							info.hide();
						}

					} else {
						info.hide();
						utils.showAlertWithMessage("Login credentials are incorrect, please try again.");
						//return;
					}
				}
			}, 0);
		} else {
			utils.showAlertWithMessage('Please check your internet connectivity.');
			var LoginWindow = require('/ui/common/LoginView');
			if (isAndroid) {
				/*var anim = {
				 activityEnterAnimation : Ti.Android.R.anim.slide_in_right,
				 //activityExitAnimation : Ti.Android.R.anim.slide_out_left,
				 };*/
				new LoginWindow().open();
			} else {
				new LoginWindow().open();
			}

		}
	} else {
		var LoginWindow = require('/ui/common/LoginView');
		if (isAndroid) {

			new LoginWindow().open();
		} else {
			new LoginWindow().open();
		}

	}

})();
/*var webview = Titanium.UI.createWebView({
 url : 'http://homefoods.besaba.com/apis/payment_gateway/PayUMoney_form.php'
 });
 var window = Titanium.UI.createWindow();
 window.add(webview);
 window.open();
 webview.addEventListener('load', function() {
 Ti.API.info('The URL changed to ' + webview.url);
 var params = "";
 var parts = (webview.url).replace(/[?&]+([^=&]+)(=([^&]*))?/gi, function(m, key, value) {
 params = params + m;
 });
 url_base = (webview.url).replace(params, '');

 if (url_base == "http://homefoods.besaba.com/apis/payment_gateway/success.php") {
 Ti.API.debug('we have arrived at the page youre waiting for');
 }
 });*/

