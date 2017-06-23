$(document).ready(function(){
$("#login-form").submit(function(e){
        var cnt = 0;
        var check = 0;
    email = $("#login-email").val();
    password = $("#login-password").val();
    if(email=="")
    {
        $(".field-signupform-email").addClass("has-error");
        $("#login-email").next(".help-block-error").html("Email cannot be blank.");
        check = 1;
    }
    if (!(isValidEmailAddress(email))) {
        $(".field-signupform-email").addClass("has-error");
        $("#login-email").next(".help-block-error").html("Enter a valid email");
        check = 1;    	
    }
    if(password=="")
    {
        $(".field-signupform-password").addClass("has-error");
        $("#login-password").next(".help-block-error").html("Password cannot be blank.");
        check = 1;    	
    }
    if(check==1)
    	return false;
	$.ajax({
		type : 'POST',
		url : baseurl + '/loginvalidate',
        async: false,
		data : {
			email : email,
            password : password
		},
		success : function(data) {
			if ($.trim(data)=='empty') {
                $(".field-signupform-email").addClass("has-error");
                $("#login-email").next(".help-block-error").html("Email cannot be blank.");
                cnt = 1;
            }            
			else if ($.trim(data)=='error') {
                $(".field-signupform-email").addClass("has-error");
                $("#login-email").next(".help-block-error").html("Email not found");
                cnt = 1;
            }
            else if ($.trim(data)=="passerr") {
                $(".field-signupform-password").addClass("has-error");
                $("#login-password").next(".help-block-error").html("Incorrect Password");
                cnt = 1;
            }            
            else if ($.trim(data)=='success') {
                cnt = 0;
            }

        }
	});
    if (cnt==1) {
        return false;
    }
    else
    return true;
});
$(document).keydown(function(e) {

  if (e.keyCode == 27) 
  { 
 		$('.invoice-popup-overlay').hide();
		$('.invoice-popup-overlay').css("opacity", "0");
  }   // esc
});
$(".pop-close").click(function(){
        $('.invoice-popup-overlay').hide();
		$('.invoice-popup-overlay').css("opacity", "0");
});

$('#w0').bind('submit', function (e) {
    var button = $('#submitbtn');

    // Disable the submit button while evaluating if the form should be submitted
    button.prop('disabled', true);

    var valid = true;    

    // Do stuff (validations, etc) here and set
    // "valid" to false if the validation fails

    if (!valid) { 
        // Prevent form from submitting if validation failed
        e.preventDefault();

        // Reactivate the button if the form was not submitted
        button.prop('disabled', false);
    }
});

});
$(function() {
  $('body').on('keydown', '#lists-listname', function(e) {
    console.log(this.value);
    if (e.which === 32 &&  e.target.selectionStart === 0) {
      return false;
    }  
  });
});
function isValidEmailAddress(email) {
	var emailreg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	return emailreg.test(email);
}
function IsAlphaNumeric(e) {
	var specialKeys = new Array();
	specialKeys.push(8); // Backspace
	specialKeys.push(9); // Tab
	specialKeys.push(46); // Delete
	specialKeys.push(36); // Home
	specialKeys.push(35); // End
	specialKeys.push(37); // Left
	specialKeys.push(39); // Right
	specialKeys.push(27); // Space
	var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
	var ret = ((keyCode >= 48 && keyCode <= 57)
			|| (keyCode >= 65 && keyCode <= 90) || (keyCode == 32)
			|| (keyCode >= 97 && keyCode <= 122) || (specialKeys
			.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode));
	return ret;
}

function IsAlphaNumericnospace(e) {
	var specialKeys = new Array();
	specialKeys.push(8); // Backspace
	specialKeys.push(9); // Tab
	specialKeys.push(46); // Delete
	specialKeys.push(36); // Home
	specialKeys.push(35); // End
	specialKeys.push(37); // Left
	specialKeys.push(39); // Right
	var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
	var ret = ((keyCode >= 48 && keyCode <= 57)
			|| (keyCode >= 65 && keyCode <= 90) || (keyCode != 32)
			|| (keyCode >= 97 && keyCode <= 122) || (specialKeys
			.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode));
	return ret;
}

function isAlpha(e) {
	var specialKeys = new Array();
	specialKeys.push(8); // Backspace
	specialKeys.push(9); // Tab
	specialKeys.push(46); // Delete
	specialKeys.push(36); // Home
	specialKeys.push(35); // End
	specialKeys.push(37); // Left
	specialKeys.push(39); // Right
	specialKeys.push(27); // Space
	var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
	var ret = ((keyCode >= 65 && keyCode <= 90) || (keyCode == 32)
			|| (keyCode >= 97 && keyCode <= 122) || (specialKeys
			.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode));
	return ret;
}

function isNumber(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}

function changeuserstatus(status,userid) {
        $("#"+userid).hide();
	$.ajax({
		type : 'POST',
		url : baseurl + '/changeuserstatus',
        async: false,
		data : {
			status : status,
            userid : userid
		},
		beforeSend: function() {
			//$("#"+userid).remove();
			},        
		success : function(data) {
                if ($.trim(data)=="success") {
                   
                }
        }
    });
}

function changehoststatus(status,userid) {
        $("#"+userid).hide();
	$.ajax({
		type : 'POST',
		url : baseurl + '/changehoststatus',
        async: false,
		data : {
			status : status,
            userid : userid
		},
		beforeSend: function() {
			//$("#"+userid).remove();
			},        
		success : function(data) {
                if ($.trim(data)=="success") {
                }
        }
    });
}

function changeliststatus(status,listid) {
	$.ajax({
		type : 'POST',
		url : baseurl + '/changeliststatus',
        async: false,
		data : {
			status : status,
            listid : listid
		},
		success : function(data) {
                if ($.trim(data)=="success") {
                	if(status=='unblock')
                		$("#list"+listid).html('<input type="button" class="btn btn-success" value="Block" onclick="changeliststatus(\'block\','+listid+')">');
                	if(status=='block')
                		$("#list"+listid).html('<input type="button" class="btn btn-success" value="Unblock" onclick="changeliststatus(\'unblock\','+listid+')">');
                }
        }
    });
}

function view_user(userid) {
	$("#messagecont").val("");
	$.ajax({
		type : 'POST',
		url : baseurl + '/getuserdetails',
        async: false,
		data : {
            userid : userid
		},
		success : function(data) {
			$('.invoice-popup-overlay').show();
			$('.invoice-popup-overlay').css("opacity", "1");
            $("#userdetails").show();
            $("#messagedetails").hide();
            $("#userdetails").html(data);
        }
    });            
}

function show_message_popup(userid) {
    $("#userdetails").hide();
    $("#messagedetails").show();
    $("#cuserid").val(userid);
}

function sendmessage() {
    userid = $("#cuserid").val();
    message = $("#messagecont").val();
	if($.trim(message) == ""){
		$(".msgerrcls").show();
		$(".msgerrcls").html("Enter Message Content");
				$("#messagecont").keydown(function(){
       			 		$(".msgerrcls").hide();
							$(".msgerrcls").html("");
    			});
		return false;
	}	 
    
	$.ajax({
		type : 'POST',
		url : baseurl + '/sendmessage',
        async: false,
		data : {
            userid : userid,
            message : message
		},
		success : function(data) {
                $("#succmsg").show();
                $("#messagecont").val("");
        setTimeout(function() {
        $("#succmsg").hide();
						}, 5000);
               return false;                
        }
    });       
}

function updateCountryCode(){
	var countryDetails = $('#currency-countrydetails').val();
	var details = countryDetails.split("-");
	$('#currency-countrycode').val(details[0]);
	$('#currency-countryname').val(details[1]);
}

function updateCurrencyCode(){
	var countryDetails = $('#currency-currencydetails').val();
	var details = countryDetails.split("-");
	$('#currency-currencysymbol').val(details[0]);
	$('#currency-currencyname').val(details[1]);
	$('#currency-currencycode').val(details[2]);
}

function helpPageValidate(){
	$('.help-block').html("");
	var title = $('#help-name').val();
	//var subContent = $('#help-subcontent').val();
	//var mainContent = $('#help-maincontent').val();
    var subContent = CKEDITOR.instances['help-subcontent'].getData();
    var mainContent = CKEDITOR.instances['help-maincontent'].getData();
    $('#help-subcontent').val(subContent);
    $('#help-maincontent').val(mainContent);
	if($.trim(title) == ""){
		$('.field-help-name .help-block').html('Title cannot be empty');
		return false;
	}else if(subContent == ""){
		$('.field-help-subcontent .help-block').html('Sub-content cannot be empty');
		return false;
	}else if(mainContent == ""){
		$('.field-help-maincontent .help-block').html('Main content cannot be empty');
		return false;
	}else {
	    $("#submitbtn").attr("disabled",true);
		return true;
	}
}

function additionalvalidate()
{
	additionalname = $("#additionalamenities-name").val();
	additionaldescription = $("#additionalamenities-description").val();
	additionalimage = $("#additionalimgfile").val();
	if($.trim(additionalname)=="")
	{
		$(".field-additionalamenities-name").addClass("has-error");
		$(".field-additionalamenities-name .help-block").html("Name cannot be blank");
		return false;
	}
	else if($.trim(additionalimage)=="")
	{
		$(".logoimgerrcls").show();
		$("#additionalimgupload").html("");
		$('.logoimgerrcls').html("Please upload image");
			setTimeout(function() {
					$(".logoimgerrcls").slideUp();
					$('.logoimgerrcls').html('');
			}, 5000);	
			return false;	
	}
	return true;

}

function homecountriesvalidate()
{
	countryid = $("#homecountries-countryid").val();
	countryimage = $("#countryimgfile").val();
	if($.trim(countryid)=="")
	{
		$(".field-homecountries-countryid").addClass("has-error");
		$(".field-homecountries-countryid .help-block").html("Please select country");
		return false;
	}
	else if($.trim(countryimage)=="")
	{
		$(".logoimgerrcls").show();
		$("#countryimgupload").html("");
		$('.logoimgerrcls').html("Please upload image");
			setTimeout(function() {
					$(".logoimgerrcls").slideUp();
					$('.logoimgerrcls').html('');
			}, 5000);	
			return false;	
	}
	return true;

}

function commonvalidate()
{
	commonname = $("#commonamenities-name").val();
	commondescription = $("#commonamenities-description").val();
	commonimage = $("#commonimgfile").val();
	if($.trim(commonname)=="")
	{
		$(".field-commonamenities-name").addClass("has-error");
		$(".field-commonamenities-name .help-block").html("Name cannot be blank");
		return false;
	}
	else if($.trim(commonimage)=="")
	{
		$(".logoimgerrcls").show();
		$("#commonimgupload").html("");
		$('.logoimgerrcls').html("Please upload image");
			setTimeout(function() {
					$(".logoimgerrcls").slideUp();
					$('.logoimgerrcls').html('');
			}, 5000);	
			return false;	
	}
	return true;

}

function specialvalidate()
{
	specialname = $("#specialfeatures-name").val();
	specialdescription = $("#specialfeatures-description").val();
	specialimage = $("#specialimgfile").val();
	if($.trim(specialname)=="")
	{
		$(".field-specialfeatures-name").addClass("has-error");
		$(".field-specialfeatures-name .help-block").html("Name cannot be blank");
		return false;
	}
	else if($.trim(specialimage)=="")
	{
		$(".logoimgerrcls").show();
		$("#specialimgupload").html("");
		$('.logoimgerrcls').html("Please upload image");
			setTimeout(function() {
					$(".logoimgerrcls").slideUp();
					$('.logoimgerrcls').html('');
			}, 5000);	
			return false;	
	}
	return true;

}

function cancellationPageValidate() {
	$('.help-block').html("");
	var cancelfrom = $('#cancellation-cancelfrom').val();
	var cancelto = $('#cancellation-cancelto').val();
	if(parseInt(cancelfrom) > parseInt(cancelto)) {
		$('.field-cancellation-cancelto .help-block').html('CancelTo days should be greater than cancelFrom days');
		return false;
	}else{
		return true;
	}
}

function socialLoginSettingsValidate(){
	$('.help-block').html("");
	
	if($('.socialstatus').is(":checked")){
		$(".facebookstatus").val("1");
		$(".googlestatus").val("1");
	}else{
		$(".facebookstatus").val("0");
		$(".googlestatus").val("0");
	}
	var facebookstatus = $(".facebookstatus").val();
	var googlestatus = $(".googlestatus").val();
	
	
	//if($('.facebookstatus').is(":checked")){
	 if($.trim(facebookstatus) == 1){
		var fbAppId = $('.facebookappid').val();
		var fbSecret = $('.facebooksecret').val();
		
		if (fbAppId == ""){
			$('.field-sitesettings-facebookappid .help-block').html('App Id cannot be Empty');
			return false;
		}else if(fbSecret == ""){
			$('.field-sitesettings-facebooksecret .help-block').html('App Secret cannot be Empty');
			return false;			
		}
	}
	//if($('.googlestatus').is(":checked")){
	 if($.trim(googlestatus) == 1){
		var googleAppId = $('.googleappid').val();
		var googleSecret = $('.googlesecret').val();
		
		if (googleAppId == ""){
			$('.field-sitesettings-googleappid .help-block').html('App Id cannot be Empty');
			return false;
		}else if(googleSecret == ""){
			$('.field-sitesettings-googlesecret .help-block').html('App Secret cannot be Empty');
			return false;			
		}
	}
	return true;
}

function approve_order(reserveid)
{
	$.ajax({
		type : 'POST',
		url : baseurl + '/admin/orders/payapproveorder',
        async: false,
		data : {
            reserveid : reserveid,
		},
		success : function(data) {
                $("#paypalfom").html(data);
                $("#mobile-paypal-form").submit();
        }
    });   	
}

function approve_declined_order(reserveid)
{
	$.ajax({
		type : 'POST',
		url : baseurl + '/admin/orders/paydeclinedorder',
        async: false,
		data : {
            reserveid : reserveid,
		},
		success : function(data) {
                $("#paypalfom").html(data);
                $("#decline-form").submit();
        }
    });  	
}

function approve_guest_security(reserveid)
{
	$.ajax({
		type : 'POST',
		url : baseurl + '/admin/security/payguestsecurity',
        async: false,
		data : {
            reserveid : reserveid,
		},
		success : function(data) {
                $("#paypalfom").html(data);
                $("#guest-security-form").submit();
        }
    });   	
}	

function approve_host_security(reserveid)
{
	$.ajax({
		type : 'POST',
		url : baseurl + '/admin/security/payhostsecurity',
        async: false,
		data : {
            reserveid : reserveid,
		},
		success : function(data) {
                $("#paypalfom").html(data);
                $("#host-security-form").submit();
        }
    });   	
}

function approve_guesthost_security(reserveid,amt)
{
	$('.invoice-popup-overlay').show();
	$('.invoice-popup-overlay').css("opacity", "1");	
	$("#reserveid").val(reserveid);
	$("#securityamount").val(amt);
	$("#totalsecamt").html(amt);
	$("#paydiv").show();
}

function view_invoice(orderid)
{
	$.ajax({
		type : 'POST',
		url : baseurl + '/admin/orders/viewinvoice',
        async: false,
		data : {
            orderid : orderid,
		},
		success : function(data) {

			
			$('.invoice-popup-overlay').show();
			$('.invoice-popup-overlay').css("opacity", "1");
            $("#invoicediv").show();
            $("#invoicediv").html(data);			
        }
    });  	
}

function enable_payment(selval)
{
	if(selval=="both")
	{
		$("#amtdiv").show();
	}
	else
	{
		$("#amtdiv").hide();
	}
}

function pay_guesthost_security()
{
	selval = $("#payto").val();
	guestamt = $("#guestamt").val();
	hostamt = $("#hostamt").val();
	securityamt = parseFloat($("#securityamount").val());
	reserveid = $("#reserveid").val();
	totalamt = parseFloat(guestamt) + parseFloat(hostamt);
	if(selval=="")
	{
		$("#paytoerr").show();
		$("#paytoerr").html("Select the user to whom the payment belongs to");
		setTimeout(function(){
			$("#paytoerr").hide();
		},5000);
	}
	else if(selval=="both" && securityamt!=totalamt)
	{
		$("#amterr").show();
		$("#amterr").html('Sum of Guest and Host amount should be equal to total security deposit amount');
		setTimeout(function(){
			$("#amterr").hide();
		},5000);		
	}
	else
	{
		if(selval=="guest")
		{
			approve_guest_security(reserveid);
		}
		else if(selval=="host")
		{
			approve_host_security(reserveid);
		}
		else if(selval=="both")
		{
                $.ajax({
                    url : baseurl+'/admin/security/payguesthostsecurity',
                    type : "post",
                    dataType : "html",
                    data : {
                        reserveid : reserveid,
                        guestamt : guestamt,
                        hostamt : hostamt,
                    },	
                    success : function(responce) {
                        $('.payment-form').html(responce);
                        $('.payment-form').submit();
                    },
                });			
		}
	}
	
}

function updatecountryid(org)
{
	countryid = $("#tax-countryname").val();
	var details = countryid.split("-");
	$('#tax-countryid').val(details[0]);
	$('#countryname').val(details[1]);
}

function approve_cancelled_payment(reserveid,adminamt,selleramt,guestamt)
{

        $.ajax({
            url : baseurl+'/admin/orders/paycancelledorder',
            type : "post",
            dataType : "html",
            data : {
                reserveid : reserveid,
                adminamt : adminamt,
                selleramt : selleramt,
                guestamt : guestamt,
            },	
            success : function(responce) {
                $('.payment-form').html(responce);
                $('.payment-form').submit();
            },
        });			
	
}

function send_adminclaim_message()
{
	messages = $("#claimmessage").val();
	tripid = $("#reserveid").val();
	userid = $("#userid").val();
	hostid = $("#hostid").val();
	
	if($.trim(messages) == ""){
		
		$(".adminclaimerr").show();
		$(".adminclaimerr").html("Message Content cannot be blank.");
				$("#claimmessage").keydown(function(){
       			 		$(".adminclaimerr").hide();
							$(".adminclaimerr").html("");
    			});
		return false;
		return false;
	}
	
	$.ajax({
		type : 'POST',
		url : baseurl + '/admin/security/sendadminclaimmessage',
        async: false,
		data : {
			tripid : tripid,
			messages : messages,
			userid : userid,
			hostid : hostid,
		},
		beforeSend: function() {
			$("#loadingimg").show();
			},		
		success : function(data) {
			$("#loadingimg").hide();
			$("#claimmessage").val("");
			getclaimmessage();
        }
	});		
}

function start_file_upload(idname)
{
	var file = document.getElementById(idname).value;
	var fsize = ($('#'+idname)[0].files[0].size/1024)/1024;
	var ftype = $('#'+idname)[0].files[0].type;
    var file_data = $('#'+idname).prop('files')[0];   
    var formdata = new FormData();                  
    formdata.append('file', file_data);
    formdata.append('id', idname);
    /*if(fsize >= 2 )
	{
    	$("#imageerr").html("Image size upto 2 MB");
		setTimeout(function(){
			$('#imageerr').html('');
		}, 2000);     	
    	return;
	}
    if(ftype != 'image/jpeg' && ftype != 'image/jpg' && ftype != 'image/png' && ftype != 'image/gif')
	{
    	$("#imageerr").html("Please upload image files");
		setTimeout(function(){
			$('#imageerr').html('');
		}, 2000);     	
    	return;    	
	}*/

	if (formdata) {
		$('#submitall').attr('disabled', true);
		$.ajax({
			url: baseurl+'/startfileupload', // point to server-side PHP script 
			type: "POST",
			data: formdata,
			processData: false,
			contentType: false,
                beforeSend: function() {
                $("#"+idname+"upload").show();
                $("#"+idname+"upload").html("<img src="+baseurl+"/images/load.gif>");                
                },            
			success: function (res) {
                $("#"+idname+"file").val(res);
                $("#"+idname+"upload").show();
                $("#"+idname+"upload").html("Uploaded Successfully");
                $('#submitall').attr('disabled', false);
                setTimeout(function() {
                        $("#"+idname+"upload").hide();
                },5000);
			}
		});
	}
    return false;
}

function start_countryfile_upload(idname)
{
	var file = document.getElementById(idname).value;

    /*if(fsize >= 2 )
	{
    	$("#imageerr").html("Image size upto 2 MB");
		setTimeout(function(){
			$('#imageerr').html('');
		}, 2000);     	
    	return;
	}
    if(ftype != 'image/jpeg' && ftype != 'image/jpg' && ftype != 'image/png' && ftype != 'image/gif')
	{
    	$("#imageerr").html("Please upload image files");
		setTimeout(function(){
			$('#imageerr').html('');
		}, 2000);     	
    	return;    	
	}*/
	if(file=="")
	{
		$(".logoimgerrcls").show();
		$("#countryimgupload").html("");
		$(".logoimgerrcls").html('Please select image');
        setTimeout(function() {
                $(".logoimgerrcls").hide();
        },5000);		
	}
	else
	{
		var fsize = ($('#'+idname)[0].files[0].size/1024)/1024;
		var ftype = $('#'+idname)[0].files[0].type;
	    var file_data = $('#'+idname).prop('files')[0];   
	    var formdata = new FormData();                  
	    formdata.append('file', file_data);
	    formdata.append('id', idname);		
		if (formdata) {
			$('#submitall').attr('disabled', true);
			$.ajax({
				url: baseurl+'/startcountryfileupload', // point to server-side PHP script 
				type: "POST",
				data: formdata,
				processData: false,
				contentType: false,
	                beforeSend: function() {
	                $("#"+idname+"upload").show();
	                $("#"+idname+"upload").html("<img src="+baseurl+"/images/load.gif>");                
	                },            
				success: function (res) {
	                $("#"+idname+"file").val(res);
	                $("#"+idname+"upload").show();
	                $("#"+idname+"upload").html("Uploaded Successfully");
	                $('#submitall').attr('disabled', false);
	                setTimeout(function() {
	                        $("#"+idname+"upload").hide();
	                },5000);
				}
			});
		}
	}
    return false;
}

function start_additionalfile_upload(idname)
{
	var file = document.getElementById(idname).value;
    if(file=="")
    {
        $("#"+idname+"upload").show();
        $(".logoimgerrcls").html("");
        $("#"+idname+"upload").html("Please select image");
        setTimeout(function() {
                $("#"+idname+"upload").hide();
        },5000);
    }
    else
    {	
		var fsize = ($('#'+idname)[0].files[0].size/1024)/1024;
		var ftype = $('#'+idname)[0].files[0].type;
	    var file_data = $('#'+idname).prop('files')[0];   
	    var formdata = new FormData();                  
	    formdata.append('file', file_data);
	    formdata.append('id', idname);



	    /*if(fsize >= 2 )
		{
	    	$("#imageerr").html("Image size upto 2 MB");
			setTimeout(function(){
				$('#imageerr').html('');
			}, 2000);     	
	    	return;
		}
	    if(ftype != 'image/jpeg' && ftype != 'image/jpg' && ftype != 'image/png' && ftype != 'image/gif')
		{
	    	$("#imageerr").html("Please upload image files");
			setTimeout(function(){
				$('#imageerr').html('');
			}, 2000);     	
	    	return;    	
		}*/

		if (formdata) {
			$('#submitall').attr('disabled', true);
			$.ajax({
				url: baseurl+'/startadditionalfileupload', // point to server-side PHP script 
				type: "POST",
				data: formdata,
				processData: false,
				contentType: false,
	                beforeSend: function() {
	                $("#"+idname+"upload").show();
	                $("#"+idname+"upload").html("<img src="+baseurl+"/images/load.gif>");                
	                },            
				success: function (res) {
	                $("#"+idname+"file").val(res);
	                $("#"+idname+"upload").show();
	                $("#"+idname+"upload").html("Uploaded Successfully");
	                $(".logoimgerrcls").html("");
	                $('#submitall').attr('disabled', false);
	                setTimeout(function() {
	                        $("#"+idname+"upload").hide();
	                },5000);
				}
			});
		}
	}
    return false;
}

function start_commonfile_upload(idname)
{
	var file = document.getElementById(idname).value;
    if(file=="")
    {
        $("#"+idname+"upload").show();
        $(".logoimgerrcls").html("");
        $("#"+idname+"upload").html("Please select image");
        setTimeout(function() {
                $("#"+idname+"upload").hide();
        },5000);
    }
    else
    {	
		var fsize = ($('#'+idname)[0].files[0].size/1024)/1024;
		var ftype = $('#'+idname)[0].files[0].type;
	    var file_data = $('#'+idname).prop('files')[0];   
	    var formdata = new FormData();                  
	    formdata.append('file', file_data);
	    formdata.append('id', idname);
	    /*if(fsize >= 2 )
		{
	    	$("#imageerr").html("Image size upto 2 MB");
			setTimeout(function(){
				$('#imageerr').html('');
			}, 2000);     	
	    	return;
		}
	    if(ftype != 'image/jpeg' && ftype != 'image/jpg' && ftype != 'image/png' && ftype != 'image/gif')
		{
	    	$("#imageerr").html("Please upload image files");
			setTimeout(function(){
				$('#imageerr').html('');
			}, 2000);     	
	    	return;    	
		}*/

		if (formdata) {
			$('#submitall').attr('disabled', true);
			$.ajax({
				url: baseurl+'/startcommonfileupload', // point to server-side PHP script 
				type: "POST",
				data: formdata,
				processData: false,
				contentType: false,
	                beforeSend: function() {
	                $("#"+idname+"upload").show();
	                $("#"+idname+"upload").html("<img src="+baseurl+"/images/load.gif>");                
	                },            
				success: function (res) {
	                $("#"+idname+"file").val(res);
	                $("#"+idname+"upload").show();
	                $("#"+idname+"upload").html("Uploaded Successfully");
	                $(".logoimgerrcls").html("");
	                $('#submitall').attr('disabled', false);
	                setTimeout(function() {
	                        $("#"+idname+"upload").hide();
	                },5000);
				}
			});
		}
	}
    return false;
}

function start_specialfile_upload(idname)
{
	var file = document.getElementById(idname).value;
    if(file=="")
    {
        $("#"+idname+"upload").show();
        $(".logoimgerrcls").html("");
        $("#"+idname+"upload").html("Please select image");
        setTimeout(function() {
                $("#"+idname+"upload").hide();
        },5000);
    }
    else
    {		
		var fsize = ($('#'+idname)[0].files[0].size/1024)/1024;
		var ftype = $('#'+idname)[0].files[0].type;
	    var file_data = $('#'+idname).prop('files')[0];   
	    var formdata = new FormData();                  
	    formdata.append('file', file_data);
	    formdata.append('id', idname);
	    /*if(fsize >= 2 )
		{
	    	$("#imageerr").html("Image size upto 2 MB");
			setTimeout(function(){
				$('#imageerr').html('');
			}, 2000);     	
	    	return;
		}
	    if(ftype != 'image/jpeg' && ftype != 'image/jpg' && ftype != 'image/png' && ftype != 'image/gif')
		{
	    	$("#imageerr").html("Please upload image files");
			setTimeout(function(){
				$('#imageerr').html('');
			}, 2000);     	
	    	return;    	
		}*/

		if (formdata) {
			$('#submitall').attr('disabled', true);
			$.ajax({
				url: baseurl+'/startspecialfileupload', // point to server-side PHP script 
				type: "POST",
				data: formdata,
				processData: false,
				contentType: false,
	                beforeSend: function() {
	                $("#"+idname+"upload").show();
	                $("#"+idname+"upload").html("<img src="+baseurl+"/images/load.gif>");                
	                },            
				success: function (res) {
	                $("#"+idname+"file").val(res);
	                $("#"+idname+"upload").show();
	                $("#"+idname+"upload").html("Uploaded Successfully");
	                $(".logoimgerrcls").html("");
	                $('#submitall').attr('disabled', false);
	                setTimeout(function() {
	                        $("#"+idname+"upload").hide();
	                },5000);
				}
			});
		}
	}
    return false;
}

function updatelatlon() {
    countrydetails = $("#homecountries-countryid").val();
    var details = countrydetails.split("-");
    countryname = details[1];
   /* var geocoder =  new google.maps.Geocoder();
		geocoder.geocode( { 'address': countryname}, function(results, status) {
		alert(status);
		if (status == google.maps.GeocoderStatus.OK) {
			var latitude = results[0].geometry.location.lat();
			var longitude = results[0].geometry.location.lng();
        }
        });*/
}

/*** Site Management Validation ****/

function siteManagementValidate(){
var sitename = $("#sitename").val();
var sitetitle = $("#sitetitle").val();
var metakey = $("#metakey").val();
var metadesc = $("#metadesc").val();
var logoblackfile = $("#logoblackfile").val();
var logowhitefile = $("#logowhitefile").val();
var defaultuserimage = $("defaultuserimage").val();
if($.trim(sitename) == ""){
		$(".siteerrcls").show();
		$(".siteerrcls").html("Site Name cannot be blank");
		$("#sitename").keydown(function(){
			$(".siteerrcls").hide();
			$(".siteerrcls").html("");
		});
		return false;
	}
	if($.trim(sitetitle) == ""){
		$(".sitetitleerrcls").show();
		$(".sitetitleerrcls").html("Site Title cannot be blank");
		$("#sitetitle").keydown(function(){
			$(".sitetitleerrcls").hide();
			$(".sitetitleerrcls").html("");
		});
		return false;
	}
	if($.trim(metakey) == ""){
		$(".metakeyerrcls").show();
		$(".metakeyerrcls").html("Meta Keyword cannot be blank");
		$("#metakey").keydown(function(){
			$(".metakeyerrcls").hide();
			$(".metakeyerrcls").html("");
		});
		return false;
	
	}
	if($.trim(metadesc) == ""){
		$(".metadescerrcls").show();
		$(".metadescerrcls").html("Meta Description cannot be blank");
		$("#metadesc").keydown(function(){
			$(".metadescerrcls").hide();
			$(".metadescerrcls").html("");
		});
		return false;
	
	}
	if($.trim(logoblackfile) == ""){
		$(".logoimgerrcls").show();
		$(".logoimgerrcls").html("Upload Logo Image Black");
		$("#logoblackfile").keydown(function(){
				$(".logoimgerrcls").hide();
				$(".logoimgerrcls").html("");
		});
		return false;

	}
	if($.trim(logowhitefile) == ""){
		$(".logoimgwhiteerrcls").show();
		$(".logoimgwhiteerrcls").html("Upload Logo Image White");
		$("#logowhitefile").keydown(function(){
				$(".logoimgwhiteerrcls").hide();
				$(".logoimgwhiteerrcls").html("");
		});
		return false;

	}
	if($.tim(defaultuserimage) == ""){
		$(".defaultusererrcls").show();
		$(".defaultusererrcls").html("Upload Default User Image");
		$("#defaultuserimage").keydown(function(){
				$(".defaultusererrcls").hide();
				$(".defaultusererrcls").html("");
		});
		return false;
	}

}
function emailManagementValidate(){
var supportemail = $("#supportemail").val();
var noreplyname = $("#noreplyname").val();
var noreplyemail = $("#noreplyemail").val();
var noreplypassword = $("#noreplypassword").val();
var smtpport = $("#smtpport").val();

if($('.enablesmtp').is(":checked")){
   		 if($.trim(smtpport) == ""){
    				$(".smtpporterrcls").show();
					$(".smtpporterrcls").html("SMTP Port Number cannot be blank");
					$("#smtpport").keydown(function(){
							$(".smtpporterrcls").hide();
							$(".smtpporterrcls").html("");
					});
					return false;
   		}
}

if($.trim(supportemail) == ""){
		$(".supporterrcls").show();
		$(".supporterrcls").html("Support Email cannot be blank");
		$("#supportemail").keydown(function(){
				$(".supporterrcls").hide();
				$(".supporterrcls").html("");
		});
		return false;
}
 if (!(isValidEmailAddress(supportemail))) {
       $(".supporterrcls").show();
		 $(".supporterrcls").html("Enter valid email address");
		 $("#supportemail").keydown(function(){
				$(".supporterrcls").hide();
				$(".supporterrcls").html("");
		});
		return false;   	
    }
if($.trim(noreplyname) == ""){
		$(".noreplynameerrcls").show();
		$(".noreplynameerrcls").html("Site no-replay Name cannot be blank");
		$("#noreplyname").keydown(function(){
				$(".noreplynameerrcls").hide();
				$(".noreplynameerrcls").html("");
		});
		return false;
}
if($.trim(noreplyemail) == ""){
		$(".noreplyemailerrcls").show();
		$(".noreplyemailerrcls").html("Site no-replay Email cannot be blank");
		$("#noreplyemail").keydown(function(){
				$(".noreplyemailerrcls").hide();
				$(".noreplyemailerrcls").html("");
		});
		return false;
}
if (!(isValidEmailAddress(noreplyemail))) {
      $(".noreplyemailerrcls").show();
		$(".noreplyemailerrcls").html("Enter valid email address");
		$("#noreplyemail").keydown(function(){
				$(".noreplyemailerrcls").hide();
				$(".noreplyemailerrcls").html("");
		});
		return false; 	
    }
if($.trim(noreplypassword) == ""){
		$(".noreplypwderrcls").show();
		$(".noreplypwderrcls").html("Site no-replay Password cannot be blank");
		$("#noreplypassword").keydown(function(){
				$(".noreplypwderrcls").hide();
				$(".noreplypwderrcls").html("");
		});
		return false;
}
}

function paypalSettingsValidate()
{
var paypalemailid = $("#paypalemailid").val();
var apiuserid = $("#apiuserid").val();
var apipassword = $("#apipassword").val();
var apisignature = $("#apisignature").val();
var appid = $("#appid").val();
var braintreemerchantid = $("#braintreemerchantid").val();
var braintreepublickey = $("#braintreepublickey").val();
var braintreeprivatekey = $("#braintreeprivatekey").val();

if($.trim(paypalemailid) == ""){
		$(".paypalemailerrcls").show();
		$(".paypalemailerrcls").html("Paypal Email Id cannot be blank.");
		$("#paypalemailid").keydown(function(){
				$(".paypalemailerrcls").hide();
				$(".paypalemailerrcls").html("");
		});
		return false;
}
if (!(isValidEmailAddress(paypalemailid))) {
		$(".paypalemailerrcls").show();
		$(".paypalemailerrcls").html("Enter valid Email Address");
		$("#paypalemailid").keydown(function(){
				$(".paypalemailerrcls").hide();
				$(".paypalemailerrcls").html("");
		});
		return false;
}
if($.trim(apiuserid) == ""){
		$(".apiuseriderrcls").show();
		$(".apiuseriderrcls").html("Paypal API User Id cannot be blank.");
		$("#apiuserid").keydown(function(){
				$(".apiuseriderrcls").hide();
				$(".apiuseriderrcls").html("");
		});
		return false;
}
if($.trim(apipassword) == ""){
		$(".apipwderrcls").show();
		$(".apipwderrcls").html("Paypal API Password cannot be blank.");
		$("#apipassword").keydown(function(){
				$(".apipwderrcls").hide();
				$(".apipwderrcls").html("");
		});
		return false;
}
if($.trim(apisignature) == ""){
		$(".apisignerrcls").show();
		$(".apisignerrcls").html("Paypal API Signature cannot be blank.");
		$("#apisignature").keydown(function(){
				$(".apisignerrcls").hide();
				$(".apisignerrcls").html("");
		});
		return false;
}
if($.trim(appid) == ""){
		$(".appiderrcls").show();
		$(".appiderrcls").html("Paypal API Id cannot be blank.");
		$("#appid").keydown(function(){
				$(".appiderrcls").hide();
				$(".appiderrcls").html("");
		});
		return false;
}
if($.trim(braintreemerchantid) == ""){
		$(".braintreemerchantiderrcls").show();
		$(".braintreemerchantiderrcls").html("Merchant Id cannot be blank.");
		$("#braintreemerchantid").keydown(function(){
				$(".braintreemerchantiderrcls").hide();
				$(".braintreemerchantiderrcls").html("");
		});
		return false;
}
if($.trim(braintreepublickey) == ""){
	$(".braintreepublickeyerrcls").show();
	$(".braintreepublickeyerrcls").html("Public key cannot be blank.");
	$("#braintreepublickey").keydown(function(){
			$(".braintreepublickeyerrcls").hide();
			$(".braintreepublickeyerrcls").html("");
	});
	return false;
}
if($.trim(braintreeprivatekey) == ""){
	$(".braintreeprivatekeyerrcls").show();
	$(".braintreeprivatekeyerrcls").html("Private key cannot be blank.");
	$("#braintreeprivatekey").keydown(function(){
			$(".braintreeprivatekeyerrcls").hide();
			$(".braintreeprivatekeyerrcls").html("");
	});
	return false;
}
}

function manageCurrencyValidate(){
var currency = $("#currency-currencydetails option:selected").val();
var country = $("#currency-countrydetails option:selected").val();
if($.trim(currency) == ""){
		$(".field-currency-currencydetails").addClass("has-error");
    	$("#currency-currencydetails").change(function(){
        	$(".field-currency-currencydetails").removeClass("has-error");
    	});
    	return false;
}
if($.trim(country) == ""){
		$(".field-currency-countrydetails").addClass("has-error");
    	$("#currency-countrydetails").change(function(){
        	$(".field-currency-countrydetails").removeClass("has-error");
    	});
		return false;
}

}

function createListValidate(){
var listname = $("#lists-listname").val();

if($.trim(listname) == ""){
		$(".field-lists-listname").addClass("has-error");
    	$("#lists-listname").next(".help-block").html("List Name cannot be blank");
    	$("#lists-listname").keydown(function(){
        	$(".field-lists-listname").removeClass("has-error");
       	$("#lists-listname").next(".help-block").html("");
    	});
		return false;
}
$("#listcreatebtn").prop('disabled', true);
}
function listingValidate(){
var bedrooms = $("#bedrooms").val();
var beds = $("#beds").val();
var bathrooms = $("#bathrooms").val();
var accommodates = $("#accommodates").val();

if($.trim(bedrooms) == ""){
		$(".bedroomerrcls").show();
		$(".bedroomerrcls").html("Bedrooms cannot be blank.");
		$("#bedrooms").keydown(function(){
				$(".bedroomerrcls").hide();
				$(".bedroomerrcls").html("");
		});
		return false;
}
if ($.trim(bedrooms)==0) {
		$(".bedroomerrcls").show();
		$(".bedroomerrcls").html("Enter valid number for bedrooms");
		$("#bedrooms").keydown(function(){
				$(".bedroomerrcls").hide();
				$(".bedroomerrcls").html("");
		});
		return false;
}
if($.trim(beds) == ""){
		$(".bederrcls").show();
		$(".bederrcls").html("Beds cannot be blank.");
		$("#beds").keydown(function(){
				$(".bederrcls").hide();
				$(".bederrcls").html("");
		});
		return false;
}
if($.trim(beds) == 0){
		$(".bederrcls").show();
		$(".bederrcls").html("Enter valid number for beds");
		$("#beds").keydown(function(){
				$(".bederrcls").hide();
				$(".bederrcls").html("");
		});
		return false;
}
if($.trim(bathrooms) == ""){
		$(".bathroomerrcls").show();
		$(".bathroomerrcls").html("Bathrooms cannot be blank.");
		$("#bathrooms").keydown(function(){
				$(".bathroomerrcls").hide();
				$(".bathroomerrcls").html("");
		});
		return false;
}
if($.trim(bathrooms) == 0){
		$(".bathroomerrcls").show();
		$(".bathroomerrcls").html("Enter valid number for bathrooms");
		$("#bathrooms").keydown(function(){
				$(".bathroomerrcls").hide();
				$(".bathroomerrcls").html("");
		});
		return false;
}
if($.trim(accommodates) == ""){
		$(".accommodateerrcls").show();
		$(".accommodateerrcls").html("Accommodates cannot be blank.");
		$("#accommodates").keydown(function(){
				$(".accommodateerrcls").hide();
				$(".accommodateerrcls").html("");
		});
		return false;
}
if($.trim(accommodates) == 0){
		$(".accommodateerrcls").show();
		$(".accommodateerrcls").html("Enter valid number for accommodates");
		$("#accommodates").keydown(function(){
				$(".accommodateerrcls").hide();
				$(".accommodateerrcls").html("");
		});
		return false;
}
}
function additionalAmentiValidate(){
var amentiname = $("#additionalamenities-name").val();

if($.trim(amentiname) == ""){
		$(".field-additionalamenities-name").addClass("has-error");
    	$("#additionalamenities-name").next(".help-block").html("Name cannot be blank.");
    	$("#additionalamenities-name").keydown(function(){
        	$(".field-additionalamenities-name").removeClass("has-error");
       	$("#additionalamenities-name").next(".help-block").html("");
    	});
		return false;
}
}

function commonAmentiValidate(){
var amentiname = $("#commonamenities-name").val();

if($.trim(amentiname) == ""){
		$(".field-commonamenities-name").addClass("has-error");
    	$("#commonamenities-name").next(".help-block").html("Name cannot be blank.");
    	$("#commonamenities-name").keydown(function(){
        	$(".field-commonamenities-name").removeClass("has-error");
       	$("#commonamenities-name").next(".help-block").html("");
    	});
		return false;
}
}

function hometypeValidate(){
var hometype = $("#hometype-hometype").val();

if($.trim(hometype) == ""){
		$(".field-hometype-hometype").addClass("has-error");
    	$("#hometype-hometype").next(".help-block").html("Hometype cannot be blank.");
    	$("#hometype-hometype").keydown(function(){
        	$(".field-hometype-hometype").removeClass("has-error");
       	$("#hometype-hometype").next(".help-block").html("");
    	});
		return false;
}
}

function roomtypeValidate(){
var roomtype = $("#roomtype-roomtype").val();

if($.trim(roomtype) == ""){
		$(".field-roomtype-roomtype").addClass("has-error");
    	$("#roomtype-roomtype").next(".help-block").html("Roomtype cannot be blank.");
    	$("#roomtype-roomtype").keydown(function(){
        	$(".field-roomtype-roomtype").removeClass("has-error");
       	$("#roomtype-roomtype").next(".help-block").html("");
    	});
		return false;
}
}

function homePriorityValidate(){
var hometype = $("#hometype-hometype option:selected").val();
var priority = $("#hometype-priority option:selected").val();

if($.trim(hometype) == ""){
		$(".field-hometype-hometype").addClass("has-error");
    	$("#hometype-hometype").next(".help-block").html("Select Hometype");
    	$("#hometype-hometype").change(function(){
        	$(".field-hometype-hometype").removeClass("has-error");
       	$("#hometype-hometype").next(".help-block").html("");
    	});
		return false;
}
if($.trim(priority) == ""){
		$(".field-hometype-priority").addClass("has-error");
    	$("#hometype-priority").next(".help-block").html("Select Priority");
    	$("#hometype-priority").change(function(){
        	$(".field-hometype-priority").removeClass("has-error");
       	$("#hometype-priority").next(".help-block").html("");
    	});
		return false;
}
}

function safetyValidate(){
var safname = $("#safetycheck-name").val();

if($.trim(safname) == ""){
		$(".field-safetycheck-name").addClass("has-error");
    	$("#safetycheck-name").next(".help-block").html("Name cannot be blank.");
    	$("#safetycheck-name").keydown(function(){
        	$(".field-safetycheck-name").removeClass("has-error");
       	$("#safetycheck-name").next(".help-block").html("");
    	});
		return false;
}
}

function specialformValidate(){
var spcname = $("#specialfeatures-name").val();

if($.trim(spcname) == ""){
		$(".field-specialfeatures-name").addClass("has-error");
    	$("#specialfeatures-name").next(".help-block").html("Name cannot be blank.");
    	$("#specialfeatures-name").keydown(function(){
        	$(".field-specialfeatures-name").removeClass("has-error");
       	$("#specialfeatures-name").next(".help-block").html("");
    	});
		return false;
}
}

function commissionValidate(){
var minval = $("#commission-min_value").val();
var maxval = $("#commission-max_value").val();
var perctge = $("#commission-percentage").val();
	if($.trim(minval) == ""){
		$(".field-commission-min_value").addClass("has-error");
    	$("#commission-min_value").next(".help-block").html("Min Value cannot be blank.");
    	$("#commission-min_value").keydown(function(){
        	$(".field-commission-min_value").removeClass("has-error");
       	$("#commission-min_value").next(".help-block").html("");
    	});
		return false;
	 }
	 if($.trim(maxval) == ""){
		$(".field-commission-max_value").addClass("has-error");
    	$("#commission-max_value").next(".help-block").html("Max value cannot be blank.");
    	$("#commission-max_value").keydown(function(){
        	$(".field-commission-max_value").removeClass("has-error");
       	$("#commission-max_value").next(".help-block").html("");
    	});
		return false;
	 }
	 
	  if(parseInt(minval) > parseInt(maxval) || minval==maxval || minval<=0 || maxval<=0 || perctge <=0 || perctge > 100){
		$(".commerr").show();
		$(".commerr").html("Give correct price range");
		setTimeout(function() {
			$('.commerr').fadeOut('slow');
		      }, 5000);		
		return false;
		}	
		
	 if($.trim(perctge) == ""){
		$(".field-commission-percentage").addClass("has-error");
    	$("#commission-percentage").next(".help-block").html("Percentage cannot be blank.");
    	$("#commission-percentage").keydown(function(){
        	$(".field-commission-percentage").removeClass("has-error");
       	$("#commission-percentage").next(".help-block").html("");
    	});
		return false;
	 }


}
function siteChargeValidate(){
var minval = $("#sitecharge-min_value").val();
var maxval = $("#sitecharge-max_value").val();
var perctge = $("#sitecharge-percentage").val();
	if($.trim(minval) == ""){
		$(".field-sitecharge-min_value").addClass("has-error");
    	$("#sitecharge-min_value").next(".help-block").html("Min Value cannot be blank.");
    	$("#sitecharge-min_value").keydown(function(){
        	$(".field-sitecharge-min_value").removeClass("has-error");
       	$("#sitecharge-min_value").next(".help-block").html("");
    	});
		return false;
	 }	 
	 if($.trim(maxval) == ""){
		$(".field-sitecharge-max_value").addClass("has-error");
    	$("#sitecharge-max_value").next(".help-block").html("Max value cannot be blank.");
    	$("#sitecharge-max_value").keydown(function(){
        	$(".field-sitecharge-max_value").removeClass("has-error");
       	$("#sitecharge-max_value").next(".help-block").html("");
    	});
		return false;
	 }
	  if(parseInt(minval) > parseInt(maxval) || minval==maxval || minval<=0 || maxval<=0 || perctge <=0 || perctge > 100){
		$(".commerr").show();
		$(".commerr").html("Give correct price range");
		setTimeout(function() {
			$('.commerr').fadeOut('slow');
		      }, 5000);		
		return false;
		}	 
	 
	 if($.trim(perctge) == ""){
		$(".field-sitecharge-percentage").addClass("has-error");
    	$("#sitecharge-percentage").next(".help-block").html("Percentage cannot be blank.");
    	$("#sitecharge-percentage").keydown(function(){
        	$(".field-sitecharge-percentage").removeClass("has-error");
       	$("#sitecharge-percentage").next(".help-block").html("");
    	});
		return false;
	 }

}

function taxValidate(){
var country = $("#tax-countryname option:selected").val();
var taxname = $("#tax-taxname").val();
var perctge = $("#tax-percentage").val();

if($.trim(country) == ""){
		$(".field-tax-countryname").addClass("has-error");
    	$("#tax-countryname").next(".help-block").html("Select country");
    	$("#tax-countryname").change(function(){
        	$(".field-tax-countryname").removeClass("has-error");
       	$("#tax-countryname").next(".help-block").html("");
    	});
		return false;
	 }
	 if($.trim(taxname) == ""){
		$(".field-tax-taxname").addClass("has-error");
    	$("#tax-taxname").next(".help-block").html("Tax Name cannot be blank.");
    	$("#tax-taxname").keydown(function(){
        	$(".field-tax-taxname").removeClass("has-error");
       	$("#tax-taxname").next(".help-block").html("");
    	});
		return false;
	 }
	 if($.trim(perctge) == ""){
		$(".field-tax-percentage").addClass("has-error");
    	$("#tax-percentage").next(".help-block").html("Percentage cannot be blank.");
    	$("#tax-percentage").keydown(function(){
        	$(".field-tax-percentage").removeClass("has-error");
       	$("#tax-percentage").next(".help-block").html("");
    	});
		return false;
	 }
	 if(perctge <=0 || perctge > 100){
	 	$(".field-tax-percentage").addClass("has-error");
    	$("#tax-percentage").next(".help-block").html("Please Give Correct Percentage Value.");
    	$("#tax-percentage").keydown(function(){
        	$(".field-tax-percentage").removeClass("has-error");
       	$("#tax-percentage").next(".help-block").html("");
    	});
		return false;
	 }
}

function homepageSettingValidate() {
var bannertitle = $("#bannertitle").val();
var bannerdesc = $("#bannerdesc").val();
var placescount = $("#placescount").val();
var placesdesc = $("#placesdesc").val();
var customerscount = $("#customerscount").val();
var customersdesc = $("#customersdesc").val();
var supporttime = $("#supporttime").val();
var supportdesc = $("#supportdesc").val();

if($.trim(bannertitle) == ""){
		$(".bannertitlecls").show();
		$(".bannertitlecls").html("Banner Title cannot be blank.");
				$("#bannertitle").keydown(function(){
       			 		$(".bannertitlecls").hide();
							$(".bannertitlecls").html("");
    			});
		return false;
}

if($.trim(bannerdesc) == ""){
		$(".bannerdesccls").show();
		$(".bannerdesccls").html("Banner Description cannot be blank.");
				$("#bannerdesc").keydown(function(){
       			 		$(".bannerdesccls").hide();
							$(".bannerdesccls").html("");
    			});
		return false;
}
if($.trim(placescount) == ""){
		$(".placescountcls").show();
		$(".placescountcls").html("Places Count cannot be blank.");
				$("#placescount").keydown(function(){
       			 		$(".placescountcls").hide();
							$(".placescountcls").html("");
    			});
		return false;
}
if($.trim(placesdesc) == ""){
		$(".placesdesccls").show();
		$(".placesdesccls").html("Places Description cannot be blank.");
				$("#placesdesc").keydown(function(){
       			 		$(".placesdesccls").hide();
							$(".placesdesccls").html("");
    			});
		return false;	
}
if($.trim(customerscount) == ""){
		$(".customerscountcls").show();
		$(".customerscountcls").html("Customers Count cannot be blank.");
				$("#customerscount").keydown(function(){
       			 		$(".customerscountcls").hide();
							$(".customerscountcls").html("");
    			});
		return false;	
}
if($.trim(customersdesc) == ""){
		$(".customersdesccls").show();
		$(".customersdesccls").html("Customers Description cannot be blank.");
				$("#customersdesc").keydown(function(){
       			 		$(".customersdesccls").hide();
							$(".customersdesccls").html("");
    			});
		return false;	
}
if($.trim(supporttime) == ""){
		$(".supporttimecls").show();
		$(".supporttimecls").html("Support Time cannot be blank.");
				$("#supporttime").keydown(function(){
       			 		$(".supporttimecls").hide();
							$(".supporttimecls").html("");
    			});
		return false;	
}

if($.trim(supportdesc) == ""){
		$(".supportdesccls").show();
		$(".supportdesccls").html("Support Time cannot be blank.");
				$("#supportdesc").keydown(function(){
       			 		$(".supportdesccls").hide();
							$(".supportdesccls").html("");
    			});
		return false;	
}
}

function validatebutton() {
        title = $("#buttonsliders-title").val();
        description = $("#buttonsliders-description").val();
        buttonname = $("#buttonsliders-buttonname").val();
        buttonlink = $("#buttonsliders-buttonlink").val();
        filename = $("#inputfile").val();
        var check = 0;
        if ($.trim(title)=="") {
                $(".field-buttonsliders-title").addClass("has-error");
                $("#buttonsliders-title").next(".help-block-error").html("Title cannot be blank.");
                check = 1;
        }
        if ($.trim(description)=="") {
                $(".field-buttonsliders-description").addClass("has-error");
                $("#buttonsliders-description").next(".help-block-error").html("Description cannot be blank.");
                check = 1;
        }
        if ($.trim(buttonname)=="") {
                $(".field-buttonsliders-buttonname").addClass("has-error");
                $("#buttonsliders-buttonname").next(".help-block-error").html("Button Name cannot be blank.");
                check = 1;
        }
        if ($.trim(buttonlink)=="") {
                $(".field-buttonsliders-buttonlink").addClass("has-error");
                $("#buttonsliders-buttonlink").next(".help-block-error").html("Button Link cannot be blank.");
                check = 1;
        }
        if ($.trim(filename)=="") {
                $("#imageerrcls").html("Please select image");
                check = 1;
        }
        if (check==1) {
                return false;
        }
}

function validatetext() {
        title = $("#textsliders-slidertext").val();
        filename = $("#inputfile").val();
        var check = 0;
        if ($.trim(title)=="") {
                $(".field-textsliders-slidertext").addClass("has-error");
                $("#textsliders-slidertext").next(".help-block-error").html("Slider text cannot be blank.");
                check = 1;
        }
        if ($.trim(filename)=="") {
                $("#imageerrcls").html("Please select image");
                check = 1;
        }
        if (check==1) {
                return false;
        }
       
}

function adminemailvalidate()
{
	adminemail = $("#adminemail").val();
	adminpassword = $("#adminpassword").val();
	if($.trim(adminemail) == ""){
			$(".adminemailerrcls").show();
			$(".adminemailerrcls").html("Email cannot be blank");
			$("#adminemail").keydown(function(){
					$(".adminemailerrcls").hide();
					$(".adminemailerrcls").html("");
			});
			return false;
	}	
	if($.trim(adminpassword) == ""){
			$(".adminpasserrcls").show();
			$(".adminpasserrcls").html("Password cannot be blank");
			$("#adminpassword").keydown(function(){
					$(".adminpasserrcls").hide();
					$(".adminpasserrcls").html("");
			});
			return false;
	}	
	return true;
}