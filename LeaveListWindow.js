function LeaveListWindow( ID )
{
	Ti.API.info("USER ID: "+ID);
	
	var hudProgress = require( 'ui/common/ANActivityIndicator' );
	var HUD = new hudProgress( "Loading..." );
	//HUD.show( );
	
	var jsonGlobal;
	
	var leaveListWindow = Ti.UI.createWindow(
	{
		backgroundColor : 'white',
		navBarHidden : true,
		tabBarHidden : true,
		fullscreen : false,
		theme : "Theme.AppCompat.Translucent.NoTitleBar",
		orientationModes: [
			Ti.UI.PORTRAIT,
		],
	} );

	leaveListWindow.addEventListener( "androidback", function( e )
	{
		var closeAlert = Ti.UI.createAlertDialog(
		{
			title : 'eLeave',
			message : "Do you want to exit?",
			buttonNames : ['OK', 'Cancel'],
		} );
		closeAlert.show( );
		closeAlert.addEventListener( 'click', function( e )
		{
			if ( e.index == 0 )
			{
				leaveListWindow.exitOnClose = true, leaveListWindow.close( );
			}
			else
			{
				return;
			}
		} );

	} );
	
	leaveListWindow.addEventListener( "focus", function( e )
	{
		utils.initLoader( leaveListWindow );
		//loader.show( );
		callLeaveRequestListAPI( );
	} );

	var mainView = Ti.UI.createView(
	{
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		layout : 'vertical',
	} );

	var topView = Ti.UI.createView(
	{
		width : Ti.UI.FILL,
		height : '64dp',
		backgroundColor : '#304059',
		//top : '0dp',
	} );

	var searchView = Ti.UI.createView(
	{
		width : Ti.UI.FILL,
		height : isAndroid?'50dp':Ti.UI.SIZE,
		//backgroundColor:'#666666'
		//backgroundColor: 'rgb(200,200,200)'
		backgroundColor : '#516480',
	} );
	
	
	//var isAndroid = ( Ti.Platform.osname == 'android' ) ? true : false;
	
	if(Ti.Platform.osname == 'android')
	
	{
		var search = Ti.UI.Android.createSearchView ( {
			color:'white',
			right:'20dp',
			showCancel: true			
		} );
	
	} else
	
	{

	var search = Ti.UI.createSearchBar(
	{
		//backgroundColor : 'blue',
		color : 'black',
		// barColor:'#000',
		showCancel : true,

	} );
	
	}

	searchView.add( search );

     

	search.addEventListener( 'change', function( e )
	{
	
		Ti.API.info(e.value);
		
	} );

    

	search.addEventListener( 'return', function( e )
	{
		search.blur( );
	} );


	search.addEventListener( 'cancel', function( e )
	{
		search.blur( );
	} );
	

	var logoutView = Ti.UI.createView(
	{
		width : '44dp',
		height : '44dp',
		right : 20,
		//backgroundColor: 'green',
	} ); 
	
	isAndroid?"":logoutView.top = '10dp';

	var logoutBtn = Ti.UI.createImageView(
	{
		width : '20dp',
		height : '20dp',
		image : '/images/logout.png',
	} );

	logoutView.addEventListener( "click", function( e )
	{
		logout( );
	} );

	logoutView.add( logoutBtn );
	
	topView.add( logoutView );
	
	var logoImgView = Ti.UI.createImageView({
		image: '/images/logo.png',
		width : 150,
	});
	
	
	topView.add(logoImgView);

	var statusBarAdjustmentView = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: '20dp',
		backgroundColor: '#304059',
	});

	isAndroid?"":mainView.add( statusBarAdjustmentView );

	mainView.add( topView );

	mainView.add( searchView );

	var contentView = Ti.UI.createView(
	{
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		//top : '64dp',
	} );

	var leaveListData = new Array();

	var leaveListTableView = Titanium.UI.createTableView(
	{
		//separatorColor : '#ccc',
		backgroundColor : 'white',
		data : leaveListData,
		search : search,
		style: 2,
		headerView: Ti.UI.createView({
			width: 0, height: 0,
		}),
		sectionCount: 1,
		seperatorColor: 'transparent',
		separatorStyle : isAndroid?"":Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
	} );

	function errorMessage( )
	{
		//alert( "Well, that didn't work" );
	}

	var leaverequestid = [];

	function getLeaveRequestList( )
	{
		//HUD.hide( );
		loader.hide( );
		var response = xhr.responseText;
		Ti.API.info(response);
		var json = JSON.parse( xhr.responseText );
		var length = json.leave_list.length;
		jsonGlobal = json;
		leaveListData = new Array( );
		leaverequestid = new Array( );
		
		if ( length == 0 )
		{
			var row = Titanium.UI.createTableViewRow(
			{
				height : 80,
				selectionStyle: isAndroid?"":Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
			} );

			var noLeaveLbl = Ti.UI.createLabel(
			{
				text : "No records available",
				color : 'gray',
			} );

			row.add( noLeaveLbl );

			var rowArr = [];

			rowArr.push( row );

			leaveListTableView.data = rowArr;

			return;
		}

		for ( var i = 0; i < length; i++ )
		{
			var leaveRequestId = json.leave_list[i].leave_request_id;

			Ti.API.info( leaveRequestId );

			leaverequestid.push( leaveRequestId );

			var leaveCount = 0;

			var _space = ' ';

			var day = json.leave_list[i].no_of_days > 1.00 && 0.50 ? "days" : "day";

			var d = json.leave_list[i].no_of_days;
			
			
			var s = d.split(".")[0];
			
			
			var s1 = d.split(".")[1];
			//alert(s1);
   				if (s1==0 || s1=='00')
   				{
   					s1 = s1.replace( '00', '' );
   					leaveCount=s;
   				}
   				 else{
   					leaveCount=d;
   				}
		   
		   
		/*	if ( s = s.replace( '.50', '.5' ) )
				;
			else
				s = s.replace( '00', '' );
			nodays = parseInt( s );*/

			var row = Titanium.UI.createTableViewRow(
			{
				height : 80,
				title: json.leave_list[i].first_name + "." + _space + json.leave_list[i].last_name + _space + json.leave_list[i].type,
				color: 'white',
				selectionStyle: isAndroid?"":Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
			} );

			var userName = Titanium.UI.createLabel(
			{
				text : json.leave_list[i].first_name + "." + _space + json.leave_list[i].last_name,
				color : '#666666',
				left : 70,
				top : 15,

				wordWrap : false,
				font :
				{
					fontFamily : 'Calibri',
					fontSize : '14',
					fontWeight : 'bold'
				},
				width : 290,
				height : Ti.UI.SIZE,
			} );
			row.add( userName );

			var profileImg = json.leave_list[i].profile_image;

			if ( typeof profileImg != "undefined" || profileImg != '' || profileImg == null)
			{
				var ImageLoader = require( '/ui/common/ImageLoader1' );
				var RemoteImage = Ti.UI.createImageView(
				{
					width : 48,
					height : 48,
					//borderColor:'black'',
					borderRadius : 24,
					//opacity:1
					top : 15,
					left : 10,
					//image : encodeURIComponent("http://10.0.9.36/dev/projects/econnectv12/assets/profileimages/" + profileImg),
				} );
				// Add to the parent view.
				row.add( RemoteImage );
				//if(isAndroid)
				//{
					url = encodeURI("http://econnect.enoahisolution.com/assets/profileimages/" + profileImg);
					//alert(url);
					ImageLoader.LoadRemoteImage( RemoteImage, url );
				//}
			}
			else
			{

				// Create an ImageView.
				var anImageView1 = Ti.UI.createImageView(
				{
					image : '/images/no image.png',
					width : 48,
					height : 48,
					//borderColor:'#666666',
					borderRadius : 24,
					//opacity : 1,
					top : 15,
					left : 10
				} );

				// Add to the parent view.
				row.add( anImageView1 );

			}

			var calenderView = Titanium.UI.createView(
			{
				//top : 15,
				right : 20,
				height : 34,
				width : 34,
				layout : 'absolute',
				backgroundImage : '/images/cal-icon.png'
			} );
			
			var dayView = Ti.UI.createView({
				width: Ti.UI.SIZE,
				height: Ti.UI.SIZE,
				left: '70dp',
				top: '60dp',
				layout: 'horizontal',
				//: 'green',
			});
			
			var dayKeyLbl = Ti.UI.createLabel({
				width: Ti.UI.SIZE,
				color: '#666666',
				text: 'Days: ',
				font:{
					fontFamily : 'Calibri',
					fontSize : '12',
					//fontWeight : 'bold',
				},
			});
			
			dayView.add(dayKeyLbl);
			
			var dayValueLbl = Titanium.UI.createLabel(
			{
				color : '#666666',
				font :
				{
					fontFamily : 'Calibri',
					fontSize : '12',
					//fontWeight : 'bold'
				},
				text : leaveCount,
			} );
			//calenderView.add( dayValueLbl );
			dayView.add(dayValueLbl);
			row.add( dayView );

			var leaveTypeValueLbl = Titanium.UI.createLabel(
			{
				text : json.leave_list[i].type,
				color : '#666666',
				left : 70,
				top : 30,

				font :
				{
					fontFamily : 'Calibri',
					fontSize : '12'
				},
				width : 290,
				height : Ti.UI.SIZE
			} );
			row.add( leaveTypeValueLbl );
			
			var dateView = Ti.UI.createView({
				width: Ti.UI.SIZE,
				top:45,
				left:70,
				height:Ti.UI.SIZE,
				layout:'horizontal'
				
			});

			var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

			var date = new Date( json.leave_list[i].from_date );
			var day = date.getDate( );
			var monthIndex = date.getMonth( );
			var year = date.getFullYear( );

			var fromDate = day + '-' + monthNames[monthIndex] + '-' + year;

			if ( json.leave_list[i].no_of_days > 1 )
			{
				var fromDateValueLbl = Titanium.UI.createLabel(
				{
					text : fromDate + _space + "to",
					color : '#666666',
					//left : 70,
					//top : 45,
					wordWrap : true,
					font :
					{
						fontFamily : 'Calibri',
						fontSize : '12'
					},
					width : Ti.UI.SIZE,
					height : Ti.UI.SIZE
				} );
				dateView.add( fromDateValueLbl );

				var date = new Date( json.leave_list[i].to_date );
				var day = date.getDate( );
				var monthIndex = date.getMonth( );
				var year = date.getFullYear( );

				var toDate = day + '-' + monthNames[monthIndex] + '-' + year;

				var toDateValueLbl = Titanium.UI.createLabel(
				{
					text : _space + toDate,
					color : '#666666',
					//left : 160,
					//top : 45,
					wordWrap : true,
					font :
					{
						fontFamily : 'Calibri',
						fontSize : '12'
					},
					width : Ti.UI.SIZE,
					height : Ti.UI.SIZE
				} );
				dateView.add( toDateValueLbl );
				row.add(dateView);
			}
			else
			{
				/*
				 var dateKeyLbl = Titanium.UI.createLabel(
				 {
				 text : 'Date:',
				 color : '#666666',
				 left : 10,
				 top : 65,
				 wordWrap : true,
				 font :
				 {
				 fontFamily : 'Calibri',
				 fontSize : '12',
				 fontWeight : 'bold'
				 },
				 width : 290,
				 height : Ti.UI.SIZE
				 } );
				 row.add( dateKeyLbl );*/

				var dateValueLbl = Titanium.UI.createLabel(
				{
					text : fromDate,
					color : '#666666',
					left : 70,
					top : 45,
					wordWrap : true,
					font :
					{
						fontFamily : 'Calibri',
						fontSize : '12'
					},
					width : 290,
					height : Ti.UI.SIZE
				} );
				row.add( dateValueLbl );
				
				
			}
			
			var separatorView = Ti.UI.createView(
			{
				//image: '/images/grid_bt_line.png',
				width : Ti.UI.FILL,
				height: '1dp',
				//backgroundColor: '#979797',
				//backgroundColor: '#9B9B9B',
				backgroundColor: '#BEBEBE',
				bottom : 0,
			} );
			
			row.add(separatorView);
			
			
			var approveView = Ti.UI.createView({
				width:'100dp',
				height:'80dp',
				right:0,
				bubbleParent: false,
				//backgroundColor:'green',
				layout: 'absolute'
			});
			
			var approvebutton = Ti.UI.createButton({
				//title:'approve',
				//color: 'black',
				bubbleParent: false,
				backgroundImage:'/images/econnect-tick.png',
				left: '5dp',
				width: '40dp',
				height: '40dp',
				buttonIndex:i,
			});
			
			approvebutton.addEventListener('touchstart', function (e){
				
				var levelId = jsonGlobal.leave_list[e.source.buttonIndex].leave_nextlevel_id;
				var statusId = jsonGlobal.leave_list[e.source.buttonIndex].leave_status_id;
				var leaveRequestId = jsonGlobal.leave_list[e.source.buttonIndex].leave_request_id;
				var userId = json.leave_list[e.source.buttonIndex].EmpID;
	
				loader.show( );
		
				var approveParam =
				{
	
					LevelId : levelId,
					StatusId : statusId,
					LeaverequestId : leaveRequestId,
					UserId : userId,
					Type : 1
				};
	
				quickApproveReject( approveParam, approveURL );
			});
			
			var rejectbutton = Ti.UI.createButton({
				//title:'reject',
				//color:'black',
				bubbleParent: false,
				backgroundImage:'/images/econnect-cancel.png',
				width: '40dp',
				height: '40dp',
				right: '5dp',
				buttonIndex:i,
			});
			
			rejectbutton.addEventListener('click', function (e){
				var levelId = jsonGlobal.leave_list[e.source.buttonIndex].leave_nextlevel_id;
				var statusId = jsonGlobal.leave_list[e.source.buttonIndex].leave_status_id;
				var leaveRequestId = jsonGlobal.leave_list[e.source.buttonIndex].leave_request_id;
				var userId = json.leave_list[e.source.buttonIndex].EmpID;
	
				loader.show( );
		
				var rejectParam =
				{
	
					LevelId : levelId,
					StatusId : statusId,
					LeaverequestId : leaveRequestId,
					UserId : userId,
					Type : 2
				};
	
				quickApproveReject( rejectParam, rejectURL );
			});
			
			approveView.add(approvebutton);
			approveView.add(rejectbutton);
			
			row.add(approveView);
			
			//Push the row to an array
			leaveListData.push( row );

		}

		leaveListTableView.setData( leaveListData );
	}


	contentView.add( leaveListTableView );

	mainView.add( contentView );

	leaveListWindow.add( mainView );
	
	/*
		

	*/
	function quickApproveReject ( param, url )
	{
	
		var xhr = Titanium.Network.createHTTPClient(
		{
			// function called when the response data is available
			onload : getApproveRejectResponse,
			// function called when an error occurs
			onerror : errorMessage
		} );
	
		xhr.open( "POST", url );
		xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
		xhr.setRequestHeader( 'user-agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/50.0.2661.102 Chrome/50.0.2661.102 Safari/537.36' );
		var params =
		{
			levelid : param.LevelId,
			statusid:param.StatusId,
			leaverequestid: param.LeaverequestId,
			userid:param.UserId,
			type :param.Type
		};
		//return;
		
		xhr.send( params );
	
		function errorMessage( )
		{
			//alert( "Well, that didn't work" );
			loader.hide( );
			var closeAlert = Ti.UI.createAlertDialog(
			{
				title : 'eLeave',
				message : "An error occurred while processing your request. Please try again later",
				buttonNames : ['OK'],
			} );
			closeAlert.show( );
		}
				
	
		function getApproveRejectResponse( )
		{
			loader.hide();
			
			var response = xhr.responseText;
			
			var json = JSON.parse( xhr.responseText );
			
			Ti.API.info("Response: "+response);
			
			utils.initLoader( leaveListWindow );
					//loader.show( );
			callLeaveRequestListAPI( );
	
		}
	}

	leaveListTableView.addEventListener( 'click', function( e )
	{	
		if( leaveListData.length <= 0 )
		{
			return;
		}
		
		var win2 = require( 'ui/common/ApproveLeaveWindow' );

		var eachrowleaverequestid = leaverequestid[e.index];

		var leaveRequest =
		{
			ID : eachrowleaverequestid
		};

		var obj = new win2( leaveRequest );
		
		isAndroid?obj.open():navWin.openWindow(obj, {animated:true});

		/*
		 var user =
		 {
		 employeeID:'1251',
		 employeeName:'ARUN JOSEPH',
		 employeeDepartment:'eADS',
		 leaveType : 'Earned Leave',
		 fromDate : '15-04-2016',
		 toDate : '15-04-2016',
		 noofDays: '5',
		 createdBy: 'Arun joseph',
		 appliedDate:'15-04-2016',
		 Reason: 'Going to Home Town',
		 approver1:'Kumaran',
		 approver2:'Hari'
		 };
		 */

		/*alert('Selected row is: ' + e.index);
		 alert('Name:' + e.rowData.subviews);
		 alert('Array:' + data.length);*/

	} );

	var xhr;

	function callLeaveRequestListAPI( )
	{
		leaveListData = new Array();
		leaverequestid = new Array( );
		loader.show( );
		xhr = Titanium.Network.createHTTPClient(
		{
			// function called when the response data is available
			onload : getLeaveRequestList,
			// function called when an error occurs
			onerror : errorMessage
		} );

		xhr.open( "POST", leaveRequestListURL );
		xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
		xhr.setRequestHeader( 'user-agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/50.0.2661.102 Chrome/50.0.2661.102 Safari/537.36' );
		var params =
		{
			user_id : ID,
		};
		xhr.send( params );
	}

	function logout( )
	{
		loader.show( );
		var xhr = Ti.Network.createHTTPClient( );

		xhr.open( "POST", logoutURL );

		xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
		xhr.setRequestHeader( 'user-agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/50.0.2661.102 Chrome/50.0.2661.102 Safari/537.36' );

		xhr.send(
		{
			"user_id" : Ti.App.Properties.getString( "UserID" ),
		} );

		xhr.onload = function( e )
		{
			Ti.API.info(xhr.responseText);
			loader.hide();
			isAndroid?leaveListWindow.close( ):navWin.close( );
		};

		xhr.onerror = function( e )
		{
			loader.hide();
			isAndroid?leaveListWindow.close( ):navWin.close( );
		};
	}
	
	leaveListWindow.add( loader );

	var navWin = isAndroid ? "" : Ti.UI.iOS.createNavigationWindow(
	{
		window : leaveListWindow,
		animated : true,
	} );

	return isAndroid ? leaveListWindow : navWin;
}

module.exports = LeaveListWindow;
