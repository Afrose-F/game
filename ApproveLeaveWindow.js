function ApproveLeaveWindow( leaveRequest )
{

	Ti.API.info( "RequestID: " + leaveRequest.id );

	var approveLeaveWindow = Ti.UI.createWindow(
	{
		backgroundColor : '#f2f2f2',
		//backgroundColor: '#E7EAF1',
		navBarHidden : true,
		tabBarHidden : true,
		fullscreen : false,
		theme : "Theme.AppCompat.Translucent.NoTitleBar",
		orientationModes: [
			Ti.UI.PORTRAIT,
		],
	} );

	utils.initLoader( approveLeaveWindow );
	loader.show( );

	var mainView = Ti.UI.createView(
	{
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		//layout: 'vertical',
	} );

	var headerView = Ti.UI.createView(
	{
		width : Ti.UI.FILL,
		height : '64dp',
		backgroundColor : '#304059',
		top : isAndroid?'0dp':'20dp',
	} );
	
	var backView = Ti.UI.createView({
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		layout: 'horizontal',
		left:'10dp',
	});
	
	var backImgView = Ti.UI.createImageView({
		width: '15dp',
		image: '/images/BackArrow.png',
	});
	
	backView.add(backImgView);
	
	var backLbl = Ti.UI.createLabel({
		width: Ti.UI.SIZE,
		text: 'Back',
		color: 'white',
		left: '5dp',
	});
	
	backView.addEventListener('click', function(e){
		isAndroid?approveLeaveWindow.close( ):navWin.close({animated:true});
	});
	
	backView.add(backLbl);
	headerView.add(backView);
	mainView.add( headerView );
	
	var statusBarAdjustmentView = Ti.UI.createView({
		width: Ti.UI.FILL,
		top: '0dp',
		height: '20dp',
		backgroundColor: '#304059',
	});

	isAndroid?"":mainView.add( statusBarAdjustmentView );

	function approverview( )
	{	
		loader.hide( );
		
		var response = xhr.responseText;

		var json = JSON.parse( xhr.responseText );

		Ti.API.info( "ResonseString: " + response );

		var a = json.leavemsg.leave_request_id;
		//alert(a);
		//var length = json.leave_list.length;
		//Ti.API.info(json);

		var _space = '      ';
		
		var contentView = Ti.UI.createScrollView(
		{
			width : '100%',
			layout : 'vertical',
			backgroundColor: 'transparent',
			contentWidth:0,
			borderRadius : '10dp',
			height : Ti.UI.FILL,
			bottom: '50dp',
			top:isAndroid?'64dp':'84dp',
		} );
		
		var employeeName = Titanium.UI.createLabel(
		{
			text : json.leavemsg.first_name.toUpperCase() + ", " + json.leavemsg.EmpID,
			color : '#cd6000',
			left : 10,
			top : 15,
			font :
			{
				fontFamily : 'Calibri',
				fontSize : '20',
				fontWeight : 'bold'
			},
			width : 290,
			height : Ti.UI.SIZE
		} );

		contentView.add( employeeName );
		
		var employeeDept = Titanium.UI.createLabel(
		{
			text : json.leavemsg.department_name,
			color : '#cd6000',
			left : 10,
			top : 10,
			font :
			{
				fontFamily : 'Calibri',
				fontSize : '12',
				fontWeight : 'bold'
			},
			wordWrap : true,
			width : 290,
			height : Ti.UI.SIZE
		} );

		contentView.add( employeeDept );
		
		var topView = Ti.UI.createView(
		{
			width : Ti.UI.FILL,
			height : '90dp',
			layout : 'vertical',
			backgroundColor : '#E7EAF1',
			//backgroundColor : 'rgb(231, 234, 2)',
			top : '10dp',
			//borderRadius : '10dp',
		} );

		var leaveGridhHeading2View = getLeaveGridView( 0 );
		//leaveGridhHeading2View.backgroundColor = '#F7F7F7';
		var leavetypeLbl = getLbl( 'Type', 'bold' );
		leavetypeLbl.left = 10,
		leaveGridhHeading2View.add( leavetypeLbl );
		var leaveAllocatedLbl = getLbl( 'Allocated', 'bold' );
		leaveGridhHeading2View.add( leaveAllocatedLbl );
		var leaveAvailedLbl = getLbl( 'Availed', 'bold' );
		leaveGridhHeading2View.add( leaveAvailedLbl );
		var balanceLeaveLbl = getLbl( 'Balance', 'bold' );
		leaveGridhHeading2View.add( balanceLeaveLbl );
		topView.add( leaveGridhHeading2View );

		var earnedView = getLeaveGridView( 1 );
		var earnedLeaveLbl = getLbl( 'Earned Leave', 'normal' );
		earnedLeaveLbl.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
		earnedLeaveLbl.color = 'black';
		earnedLeaveLbl.left = '10dp',
		//earnedLeaveLbl.
		
		earnedView.add( earnedLeaveLbl );
		Ti.API.info( "Leave Balance Array Length: " + json.empbalancegrid[0].leave_balance );

		var earnedLeaveAllocated = json.empbalancegrid[0].leave_allocated;
		var earnedLAllocLbl = getLbl( earnedLeaveAllocated, 'normal' );
		earnedLAllocLbl.color = 'black';
		earnedView.add( earnedLAllocLbl );

		var earnedLeaveAvailed = json.empbalancegrid[0].leave_availed;
		var earnedLAvailedLbl = getLbl( earnedLeaveAvailed, 'normal' );
		earnedLAvailedLbl.color = 'black';
		earnedView.add( earnedLAvailedLbl );

		var earnedLeaveBalance = json.empbalancegrid[0].leave_balance;
		var earnedLBLbl = getLbl( earnedLeaveBalance, 'normal' );
		earnedLBLbl.color = 'black';
		earnedView.add( earnedLBLbl );

		topView.add( earnedView );

		var optionalView = getLeaveGridView( 2 );
		var optionalLeaveLbl = getLbl( 'Optional Leave', 'normal' );
		optionalLeaveLbl.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
		optionalLeaveLbl.color = 'black', optionalView.add( optionalLeaveLbl );
		optionalLeaveLbl.left = '10dp';

		var optionalLeaveAllocated = json.empbalancegrid[1].leave_allocated;
		var optionalLAllocLbl = getLbl( optionalLeaveAllocated, 'normal' );
		optionalLAllocLbl.color = 'black', optionalView.add( optionalLAllocLbl );

		var optionalLeaveAvailed = json.empbalancegrid[1].leave_availed;
		var optionalLAvailedLbl = getLbl( optionalLeaveAvailed, 'normal' );
		optionalLAvailedLbl.color = 'black', optionalView.add( optionalLAvailedLbl );

		var optionalLeaveBalance = json.empbalancegrid[1].leave_balance;
		var optionalLBLbl = getLbl( optionalLeaveBalance, 'normal' );
		optionalLBLbl.color = 'black', optionalView.add( optionalLBLbl );

		topView.add( optionalView );

		contentView.add( topView );
		
		var leaveType = Titanium.UI.createLabel(
		{
			text : json.leavemsg.type,
			color : '#666666',
			left : 10,
			top: '15dp',
			font :
			{
				fontFamily : 'Calibri',
				fontSize : '16',
				fontWeight : 'bold'
			},
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE
		} );
		contentView.add( leaveType );
		
		
	
		var compoff = json.leavemsg.comp_off_date;
		
		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var date = new Date( compoff );
		//alert( date )
		var day = date.getDate( );
		var monthIndex = date.getMonth( );
		var year = date.getFullYear( );

		var compoffDate = day + '-' + monthNames[monthIndex] + '-' + year;
		//alert( compoffDate );

		if ( json.leavemsg.type == 'Comp Off' )
		{
			var compoffDateLabel = Titanium.UI.createLabel(
			{
				text : "Comp Off Date ",
				color : '#cd6000',
				left : 10,
				wordWrap : true,
				font :
				{
					fontFamily : 'Calibri',
					fontSize : '12',
					fontWeight : 'bold'
				},
				width : Ti.UI.SIZE,
				height : Ti.UI.SIZE
			} );

			var compoffDatevalue = Titanium.UI.createLabel(
			{
				text : compoffDate,
				color : '#666666',
				left : 10,
				wordWrap : true,
				font :
				{
					fontFamily : 'Calibri',
					fontSize : '12',
					fontWeight : 'bold'
				},
				width : Ti.UI.SIZE,
				height : Ti.UI.SIZE
			} );

			contentView.add( compoffDatevalue );
			contentView.add( compoffDateLabel );
		}
		var dateView = Ti.UI.createView({
			layout: 'horizontal',
			top: '15dp',
			width: screenWidth-20,
			height: Ti.UI.SIZE,
			//backgroundColor: 'green',
		});

		var fromDateView = Ti.UI.createView({
			layout: 'vertical',
			width: '33%',
			height: Ti.UI.SIZE,
			//backgroundColor: 'blue',
		});

		var fromDate1 = Titanium.UI.createLabel(
		{
			text : utils.getDateString(json.leavemsg.from_date),
			color : '#666666',
			left : 0,
			wordWrap : true,
			font :
			{
				fontFamily : 'Calibri',
				fontSize : '14',
				fontWeight : 'bold'
			},
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE
		} );


		var fromDatelabel1 = Titanium.UI.createLabel(
		{
			text : 'From',
			color : '#cd6000',
			left : 0,
			wordWrap : true,
			font :
			{
				fontFamily : 'Calibri',
				fontSize : '12',
				fontWeight : 'bold'
			},
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE
		} );

		fromDateView.add( fromDate1 );
		fromDateView.add( fromDatelabel1 );
		
		
		dateView.add( fromDateView );

		var toDateView = Ti.UI.createView({
			layout: 'vertical',
			width: '33%',
			height: Ti.UI.SIZE,
			//backgroundColor: 'white',
		});

		var toDate1 = Titanium.UI.createLabel(
		{
			text : utils.getDateString(json.leavemsg.to_date),
			color : '#666666',
			left : 0,
			wordWrap : true,
			font :
			{
				fontFamily : 'Calibri',
				fontSize : '14',
				fontWeight : 'bold'
			},
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE
		} );
		
		toDateView.add( toDate1 );

		var toDatelabel1 = Titanium.UI.createLabel(
		{
			text : "To",
			left : 0,
			color : '#cd6000',
			wordWrap : true,
			font :
			{
				fontFamily : 'Calibri',
				fontSize : '12',
				fontWeight : 'bold'
			},
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE
		} );
		toDateView.add( toDatelabel1 );

		dateView.add( toDateView );

		var calSuperView = Ti.UI.createView({
			layout: 'vertical',
			width: '33%',
			height: Ti.UI.SIZE,
			//backgroundColor: 'blue',
		});

		var calenderView = Titanium.UI.createView(
		{
			height : 36,
			width : 36,
			layout : 'absolute',
			backgroundImage : '/images/cal-icon.png',
		} );
		
		    leaveCount=0;
		    var d= json.leavemsg.no_of_days;
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
		   

		var daysCountLbl = Titanium.UI.createLabel(
		{
			top:'15dp',
			color : '#666666',
			font :
			{
				fontFamily : 'Calibri',
				fontSize : '12',
				fontWeight : 'bold'
			},
			text : leaveCount,
		} );
		calenderView.add( daysCountLbl );

		calSuperView.add( calenderView );
		
		var day = json.leavemsg.no_of_days > 1 ? "Days" : "Day";

		var daylabel = Titanium.UI.createLabel(
		{
			text : day,
			color : '#cd6000',
			wordWrap : true,
			font :
			{
				fontFamily : 'Calibri',
				fontSize : '12',
				fontWeight : 'bold'
			},
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			width : 290,
			height : Ti.UI.SIZE,
		} );
		calSuperView.add( daylabel );
		
		dateView.add( calSuperView );

		contentView.add(dateView );

		var appliedOnView = Ti.UI.createView({
			width: Ti.UI.FILL,
			height: '20dp',
			layout: 'horizontal',
			top: '10dp',
		});

		var appliedDateLabel1 = Titanium.UI.createLabel(
		{
			text : "Applied On: ",
			color : '#cd6000',
			left : 10,
			wordWrap : true,
			font :
			{
				fontFamily : 'Calibri',
				fontSize : '12',
				fontWeight : 'bold'
			},
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE
		} );
		appliedOnView.add(appliedDateLabel1);
		
		var tempArr = json.leavemsg.lecredate.split(' '); 		
		
		date = new Date( tempArr[0] );
		
		day = date.getDate( );
		monthIndex = date.getMonth( );
		year = date.getFullYear( );

		var dateVal = day + '-' + monthNames[monthIndex] + '-' + year;

		var appliedDate1 = Titanium.UI.createLabel(
		{
			text : dateVal,
			color : '#666666',
			left: 20,
			wordWrap : true,
			font :
			{
				fontFamily : 'Calibri',
				fontSize : '12',
				fontWeight : 'bold'
			},
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE
		} );
		
		appliedOnView.add(appliedDate1);
		
		contentView.add( appliedOnView );
		
		var reasonView = Ti.UI.createView({
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
			layout: 'vertical',
			//backgroundColor: 'green',
		});
		
		var reasonlabel = Titanium.UI.createLabel(
		{
			text : "Reason: ",
			color : '#cd6000',
			left : 10,
			font :
			{
				fontFamily : 'Calibri',
				fontSize : '12',
				fontWeight : 'bold'
			},
			width : 290,
			height : Ti.UI.SIZE
		} );
		reasonView.add( reasonlabel );

		var reason = Titanium.UI.createLabel(
		{
			text : json.leavemsg.reason,
			color : '#666666',
			
			left : 10,
			font :
			{
				fontFamily : 'Calibri',
				fontSize : '12',
				fontWeight : 'bold'
			},
			width : Ti.UI.SIZE,
			wordWrap : true,
			ellipsize : false,
			height : Ti.UI.SIZE
		} );
		reasonView.add( reason );
		
		contentView.add(reasonView);

		var bottomView = Ti.UI.createView(

		{
			width : '100%',
			height : Ti.UI.SIZE,
			backgroundColor : '#E7EAF1',
			layout:'vertical',
			top : '10dp',
			//borderRadius : '10dp',
		} );

		var approverHistoryView = getStatusHistoryView( 0 );
		//approverHistoryView.top = '10dp';
		//approverHistoryView.backgroundColor = '#516480';

		var approverNameLbl = getLbl( 'Name', 'bold' );
		approverNameLbl.color = '#cd6000';
		approverHistoryView.add( approverNameLbl );
		var approverRemarksLbl = getLbl( 'Remarks', 'bold' );
		approverRemarksLbl.color = '#cd6000';
		approverHistoryView.add( approverRemarksLbl );
		var approvedDateLbl = getLbl( 'Date', 'bold' );
		approvedDateLbl.color = '#cd6000';
		approverHistoryView.add( approvedDateLbl );
		var statusLbl = getLbl( 'Status', 'bold' );
		statusLbl.color = '#cd6000';
		approverHistoryView.add( statusLbl );

		bottomView.add( approverHistoryView );
		
		//alert("InfoTable Length:"+json.infotable.length);
		var statusView = getStatusHistoryView( 1 );
		if ( json.infotable.length == 0 )
		{
			statusView.bottom = '0dp';
			statusView.backgroundColor = '#E7EAF1';
			var norecordLbl = getLbl( 'No records Found', 'normal' );
			norecordLbl.color = 'black', statusView.add( norecordLbl );	
		} 
		else
		{
			var approver = json.leaveappr.approver_1;
			//alert(approver);
			approver = approver.split("-")[0];
			//alert(approver);
		
			var remarks = json.infotable[0].leave_remarks;
			//alert(remarks);
			
			var tempArr = json.infotable[0].leave_approved_datetime.split(' '); 		
		
			date = new Date( tempArr[0] );
		
			day = date.getDate( );
			monthIndex = date.getMonth( );
			year = date.getFullYear( );

			dateVal = day + '-' + monthNames[monthIndex] + '-' + year;
			
		
			//alert(Date);
			
			var status= json.infotable[0].wf_status_name;
			//alert(status);
		
			//var statusView = getStatusHistoryView( 1 );
			statusView.bottom = '0dp';
			statusView.backgroundColor = '#E7EAF1';
			var approverNameLbl = getLbl( approver, 'normal' );
			approverNameLbl.color = 'black', statusView.add( approverNameLbl );
			var approverRemarksLbl = getLbl( remarks, 'normal' );
			approverRemarksLbl.color = 'black', statusView.add( approverRemarksLbl );
			var approvedDateLbl = getLbl( dateVal, 'normal' );
			approvedDateLbl.color = 'black', statusView.add( approvedDateLbl );
			var statusLbl = getLbl( status, 'normal' );
			statusLbl.color = 'black', statusView.add( statusLbl );
		}
		
		bottomView.add( statusView );

		contentView.add( bottomView );

		mainView.add( contentView );

		var bottomButtonView = Ti.UI.createView(
		{
			//backgroundColor:'green',
			width : Ti.UI.FILL,
			bottom : '0dp',
			height : '50dp',
			//layout : 'horizontal',
		} );

		var approveButton = Ti.UI.createButton(
		{
			title : 'Approve',
			color: 'white',
			//width : '140dp',
			width: '50%',
			height : 50,
			//left : (screenWidth - 300)/2,
			left: 0,
			//borderRadius : '10dp',
			backgroundColor : '#32c24d',
		} );

		bottomButtonView.add( approveButton );
		
		var levelId = json.leavemsg.leave_nextlevel_id;
		var statusId = json.leavemsg.leave_status_id;
		var leaveRequestId = json.leavemsg.leave_request_id;
		var userId = json.leavemsg.EmpID;

		approveButton.addEventListener( 'click', function( e )
		{
			loader.show( );
			
			//var ApproveWindow = require( 'ui/common/ApproveWindow' );

			var Approveparam =
			{

				LevelId : levelId,
				StatusId : statusId,
				LeaverequestId : leaveRequestId,
				UserId : userId,
				Type : 1
			};

			approveLeave( Approveparam );
		} );
		
		var rejectButton = Ti.UI.createButton(
		{
			title : 'Reject',
			color: 'white',
			//left : 100,
			height : 50,
			//width : '140dp',
			width: '50%',
			//right : (screenWidth - 300)/2,
			right: '0dp',
			//borderRadius : '10dp',
			backgroundColor : 'red',

		} );

		bottomButtonView.add( rejectButton );

		rejectButton.addEventListener( 'click', function( e )
		{

			var rejectWindow = require( 'ui/common/RejectWindow' );

			var Rejectparam =
			{

				LevelId : levelId,
				StatusId : statusId,
				LeaverequestId : leaveRequestId,
				UserId : userId,
				Type : 2
			};

			new rejectWindow( Rejectparam, approveLeaveWindow, navWin ).open( );
		} );
		
		mainView.add( bottomButtonView );
	}


	approveLeaveWindow.add( mainView );

	function errorMessage( )
	{
		loader.hide( );
		alert( "An error occurred while processing your request. Please try again later" );
	}

	var xhr = Titanium.Network.createHTTPClient(
	{
		// function called when the response data is available
		onload : approverview,
		// function called when an error occurs
		onerror : errorMessage
	} );

	xhr.open( "POST", detailLeaveRequestURL );
	xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
	xhr.setRequestHeader( 'user-agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/50.0.2661.102 Chrome/50.0.2661.102 Safari/537.36' );
	var params =
	{
		id : leaveRequest.ID,
	};
	// Send the request
	xhr.send( params );

	function getStatusHistoryView( temp )
	{
		var view = Ti.UI.createView(
		{
			width : Ti.UI.FILL,

			height : '40dp',
			layout : 'horizontal',
		} );

		return view;
	}

	function getLbl( lblText, lblFontType )
	{
		var lbl = Ti.UI.createLabel(
		{
			width : '23%',
			height : '30dp',
			color : '#cd6000',
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			font :
			{
				fontWeight : lblFontType,
				fontSize : '12dp',
			},
			text : lblText,
		} );

		return lbl;
	}

	function getLeaveGridView( temp )
	{
		var view = Ti.UI.createView(
		{
			width : Ti.UI.FILL,
			background: 'transparent',
			height : '30dp',
			//color : 'black',
			layout : 'horizontal',
		} );

		return view;
	}
	
	function approveLeave( Approveparam )
	{

		function errorMessage( )
		{
			//alert( "Well, that didn't work" );
			//Ti.API.info(e.code);
			var closeAlert = Ti.UI.createAlertDialog(
			{
				title : 'eLeave',
				message : "An error occurred while processing your request. Please try again later",
				buttonNames : ['OK'],
			} );
			closeAlert.show( );
		}
	
		function getApproveResponse( )
		{
			loader.hide();
			
			var response = xhr.responseText;
			
			var json = JSON.parse( xhr.responseText );
			
			Ti.API.info("Approve Response: "+response);
			
			var closeAlert = Ti.UI.createAlertDialog(
			{
				title : 'eLeave',
				message : json.success,
				buttonNames : ['OK'],
			} );
			closeAlert.show( );
			closeAlert.addEventListener( 'click', function( e )
			{
				if ( e.index == 0 )
				{
					isAndroid?approveLeaveWindow.close( ):navWin.close({animated:true});
				}
				else
				{
					return;
				}
			} );
		}
	
		var xhr = Titanium.Network.createHTTPClient(
		{
			// function called when the response data is available
			onload : getApproveResponse,
			// function called when an error occurs
			onerror : errorMessage,
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
		
		Ti.API.info( params );
		
		//return;
		
		xhr.send( params );
	}

	var navWin = isAndroid ? "" : Ti.UI.iOS.createNavigationWindow(
	{
		window : approveLeaveWindow,
		animated : true,
	} );

	return isAndroid ? approveLeaveWindow : navWin;
}

module.exports = ApproveLeaveWindow;
