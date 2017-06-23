$(function() {

	prettyPrint(); //Apply Code Prettifier

    //Easy Pie Chart
    //------------------------

	    try {
		    $('.easypiechart#processing').easyPieChart({
		        barColor: '#95a9b1',
	        trackColor: 'rgba(0, 0, 0, 0.08)',
		        scaleColor: false,
		        scaleLength: 0,
		        lineCap: 'square',
		        lineWidth: 2,
		        size: 104,
		        onStep: function(from, to, percent) {
		            $(this.el).find('.percent').text(Math.round(percent));
		        }
		    });
		} catch(e) {

		}


	// Bootstrap JS
	//------------------------
	    $('.popovers').popover({container: 'body', trigger: 'hover', placement: 'top'}); //bootstrap's popover
	    $('.tooltips').tooltip(); //bootstrap's tooltip

    //Tabdrop
    //------------------------
    	jQuery.expr[':'].noparents = function(a,i,m){
    	        return jQuery(a).parents(m[3]).length < 1;
    	}; // Only apply .tabdrop() whose parents are not (.tab-right or tab-left)
    	$('.nav-tabs').filter(':noparents(.tab-right, .tab-left)').tabdrop();


	

    //Custom checkboxes
    //------------------------
		$(".bootstrap-switch").bootstrapSwitch();
		$('.icheck input').iCheck({
			checkboxClass: 'icheckbox_minimal-blue',
			radioClass: 'iradio_minimal-blue'
		});


    //Demo JSTree
    //------------------------
		$('#jstree-demo').jstree({
	    	"types" : {
	        	"default" : {
					"icon" : "fa fa-folder icon-state-warning icon-lg"
	            },
	            "file" : {
					"icon" : "fa fa-file icon-state-warning icon-lg"
	            }
	        },
	        "plugins": ["types"]
	    });

		$('#jstree-demo').jstree();


	//Project Switcher Demo
	//------------------------
		$('.project-switcher-dropdown>li>a').click(function() {
			$('.project-switcher>a.btn>span').text($(this).text());
		});


	//Sparklines
	//------------------------
		$("#currentbalance").sparkline([12700,8573,10145,21077,15380,14399,19158,17002,19201,10042], {
			type: 'bar',
			barColor: Utility.getBrandColor('inverse'),
			barSpacing: 2,
			height: '20',
			barWidth: 3
		});

		$("#salesvolume").sparkline([162700,82573,120145,91077,215380,204399,119158,140121,111312,121310], {
			type: 'bar',
			barColor: Utility.getBrandColor('inverse'),
		barSpacing: 2,
		height: '20',
		barWidth: 3
		});

		$("#infobar-earningsstats").sparkline([120,160,130,230,170,200,80,60,150,190,240,320,290,200,240,190,130,150,230,180,80,20,90,110,200,240,210,250], {
	      type: 'line',
	      lineColor: '#6678c1',
	      fillColor: '#e9ecf5',
	      height: '32',
	      lineWidth: 1.125,
	      width: '100%',
	      spotRadius: 0
	    });

	    $("#infobar-orderstats").sparkline([240,200,230,180,170,120,90,30,100,120,180,150,190,270,280,320,250,170,230,170,90,110,200,190,220,110,150,130], {
	      type: 'line',
	      lineColor: '#7f96a0',
	      fillColor: '#edf0f2',
	      height: '32',
	      lineWidth: 1.125,
	      width: '100%',
	      spotRadius: 0
	    });

	    $("#infobar-earnings").sparkline([15700,4573,12145,11077,25380,24399,29158,17002,11201,13042], {
	      type: 'line',
	      lineColor: Utility.getBrandColor('primary'),
	      fillColor: Utility.getBrandColor('inverse'),
	      height: '32',
	      lineWidth: 1,
	      width: '100%'
	    });

	    $("#infobar-unitssold").sparkline([1532,3573,2141,6077,4280,5399,6158,3002,2201,1151], {
	      type: 'bar',
	      barColor: Utility.getBrandColor('inverse'),
	      barSpacing: 2,
	      height: '20',
	      barWidth: 3
	    });

	    $("#infobar-orders").sparkline([704,579,144,442,383,399,555,805,401,943], {
	      type: 'bar',
	      barColor: Utility.getBrandColor('inverse'),
	      barSpacing: 2,
	      height: '20',
	      barWidth: 3
	    });
		

	//Demo Background Pattern

	$(".demo-blocks").click(function(){
		$('.layout-boxed').css('background',$(this).css('background'));
		return false;
	});



	// Weather - http://simpleweatherjs.com

	/* Does your browser support geolocation? */
	if ("geolocation" in navigator) {
	  $('.js-geolocation').show(); 
	} else {
	  $('.js-geolocation').hide();
	}

	/* Where in the world are you? */
	$('.js-geolocation').on('click', function() {
	  navigator.geolocation.getCurrentPosition(function(position) {
	    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
	  });
	});

	/* 
	* Test Locations
	* Austin lat/long: 30.2676,-97.74298
	* Austin WOEID: 2357536
	*/
	$(document).ready(function() {
	  loadWeather('Seattle',''); //@params location, woeid
	});

	function loadWeather(location, woeid) {
	  $.simpleWeather({
	    location: location,
	    woeid: woeid,
	    unit: 'c',
	    success: function(weather) {
	      html = '<h2><i class="ar ar-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
	      html += '<ul><li><i class="fa fa-fw fa-map-marker"></i> '+weather.city+', '+weather.region+'</li>';
	      html += '<li class="currently">'+weather.currently+'</li>';
	      // html += '<li>'+weather.alt.temp+'&deg;F</li></ul>';  
	      
	      $(".weather-widget").html(html);
	    },
	    error: function(error) {
	      $(".weather-widget").html('<p>'+error+'</p>');
	    }
	  });
	}


});



// Contacts Slide Out
// -------------------
// $(function() {
//   $('ul.contact-list>li').on('mouseover', function (e) {

//   	$(this).children('.contact-card').appendTo('body').show();

//   	var scrolledAmount = $(document).scrollTop();
//   	var liTop = $(this).offset().top;
//   	var topAmount = scrolledAmount+liTop-scrolledAmount-12;

//   	$('.contact-card').css({top: topAmount+'px'});
//   	$('body>.contact-card').show();
//   	e.stopPropagation();
//   	e.preventDefault();
//   });
//   $('body').on('mouseover', function (e) {
//   	$('body>.contact-card').hide();
//   	$('body>.contact-card').appendTo($('#'+$('body>.contact-card').attr('data-child-of')));
//   });
//   $('.contact-card, ul.contact-list').on('mouseover', function (e) {
//   	e.stopPropagation();
//   	e.preventDefault();
//   });
// });