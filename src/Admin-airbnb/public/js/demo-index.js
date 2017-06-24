jQuery(document).ready(function() {
    $.wijets().make(); // Advanced Panels

    //------------------------------
    // Chartist
    //------------------------------

        var Chartist1 = new Chartist.Line('#chart1', {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [4,5,7,6,4,7,6,7,4,7,6,3],
            [3,4,4,5,3,5,3,6,3,4,5,2],
            [1,2,1,3,1,2,1,3,1,2,3,1]
          ]
        }, {
                height: 300,
                fullWidth: true,
                low: 0,
                high: 7,
                showArea: true,


                  lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                  }),

                axisY: {
                  onlyInteger: true,
                  offset: 20,
                  labelInterpolationFnc: function(value) {
                  return '$' + value + 'K'
                },

            },
            plugins: [
              Chartist.plugins.tooltip({prefix: "$", suffix: "K"})
            ]
        });

        Chartist1.on('draw', function(data) {


          if(data.type === 'point') {
              data.element.animate({
                y1: {
                  begin: 100 * data.index,
                  dur: 100,
                  from: data.y + 100,
                  to: data.y,
                  easing: Chartist.Svg.Easing.easeOutQuint
                },
                y2: {
                  begin: 100 * data.index,
                  dur: 100,
                  from: data.y + 100,
                  to: data.y,
                  easing: Chartist.Svg.Easing.easeOutQuint
                }
              });
          }

          if(data.type === 'line' || data.type === 'area') {
            data.element.animate({
              d: {
                begin: 100 * data.index,
                dur: 100,
                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint
              }
            });
          }
        });




        var chartistData2 = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
            [2,4,3,5,4,5,6,7,4,5,3,4],
            [3,6,2,6,2,7,4,5,2,6,5,6],
            [1,3,1,2,1,3,2,3,1,2,3,2]
            ]
        };

        var chartistOptions2 = {
          height: 300,
          seriesBarDistance: 10,
          axisX: {
            offset: 20
          },
          axisY: {
            offset: 20,
            labelInterpolationFnc: function(value) {
              return '$' + value + 'K'
            },
            scaleMinSpace: 0
          },
          plugins: [
            Chartist.plugins.tooltip({prefix: "$", suffix: "K"})
          ]
        };

        //var Chartist2 = new Chartist.Bar('#chart2', chartistData2, chartistOptions2);


        $(window).on('resize', function() {
              Chartist1.update();
              Chartist2.update();
        });

        $('#chartist-tab a').on('shown.bs.tab', function (e) {
            Chartist1.update();
            Chartist2.update();
        })


   
    //------------------------------
    // Sparklines in Tiles
    //------------------------------


    var responsiveSparklineTiles = function() {

        $("#sparkline-revenue").sparkline([24,19,26,28,22,19,10,13,10,15,22,26,16,22,20,27,32,31,29,22,19,8,2,5,6,14,6,10,13,8,19,21,26,29,24], {
            type: 'line',
            width: '100%',
            height: 32,
            fillColor: '#add07c',
            lineWidth: 0,
            lineColor: '#add07c',
            chartRangeMin: 0,
            disableInteraction: true,
            spotRadius: 0
        });

        $("#sparkline-commission").sparkline([27,26,21,18,8,12,10,6,15,7,6,2,8,11,13,9,14,18,27,28,26,32,22,19,18,16,19,20,17,24,20,29,26,20,24], {
            type: 'line',
            width: '100%',
            height: 32,
            lineWidth: 1,
            fillColor: '#fafafa',
            lineColor: '#e1e1e1',
            chartRangeMin: 0,
            disableInteraction: true,
            spotRadius: 0
        });

        $("#sparkline-item").sparkline([5,3,9,6,5,9,7,3,5,2,5,7,5,2,5,3,9,6,5,9,7,3,5,2,5,7,5,2], {
            type: 'bar',
            barSpacing: 4,
            barWidth: 2,
            height: 32,
            barColor: '#e1e1e1',
            disableInteraction: true,
            spotRadius: 0
        });

        $("#tiles-sparkline-stats-pageviews").sparkline([2455,1234,776,349,1776,2234,2455], {
            type: 'line',
            lineColor: '#ccc',
            lineWidth: '1',
            fillColor: 'rgba(0, 0, 0, 0.02)',
            height: 96,
            width: '100%',
            minSpotColor: false,
            maxSpotColor: false,
            spotColor: false,
            spotRadius: '2',
            highlightSpotColor: '#999999',
            highlightLineColor: 'transparent'
        });

        $("#tiles-sparkline-stats-totalsales").sparkline([2455,3534,5776,4349,5179,524,1123], {
            type: 'line',
            lineColor: '#ccc',
            lineWidth: '1',
            fillColor: 'rgba(0, 0, 0, 0.02)',
            height: 96,
            width: '100%',
            minSpotColor: false,
            maxSpotColor: false,
            spotColor: false,
            spotRadius: '2',
            highlightSpotColor: '#999999',
            highlightLineColor: 'transparent'
        });

        $("#tiles-sparkline-stats-totalorders").sparkline([255,134,76,120,350,400,98], {
            type: 'line',
            lineColor: '#ccc',
            lineWidth: '1',
            fillColor: 'rgba(0, 0, 0, 0.02)',
            height: 96,
            width: '100%',
            minSpotColor: false,
            maxSpotColor: false,
            spotColor: false,
            spotRadius: '2',
            highlightSpotColor: '#999999',
            highlightLineColor: 'transparent'
        });
    }

    var refreshSparklines;
    $(window).resize(function(e) {
        clearTimeout(refreshSparklines);
        refreshSparklines = setTimeout(responsiveSparklineTiles, 500);
    });

    responsiveSparklineTiles();


    //------------------------------
    // Todo App
    //------------------------------

    $("#sortable-todo, #completed-todo").sortable({
          connectWith: ".connectedSortable",
          receive: function (event, ui) {
            $(ui.item[0]).find('.iCheck-helper')[0].dropped = true;
            $(ui.item[0]).find('.iCheck-helper').click()
          }
        }).disableSelection();

    $('#sortable-todo .iCheck-helper, #completed-todo .iCheck-helper').on('click', function () {
        if ($(this)[0].dropped == true) { $(this)[0].dropped = false; return; }
        if ($(this).closest('#sortable-todo').length)
            $(this).closest('li').appendTo('#completed-todo');
        else
            $(this).closest('li').appendTo('#sortable-todo');
    });


    //------------------------------
    // Date Range Pikcer
    //------------------------------


    $('#daterangepicker2').daterangepicker({
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
            'Last 7 Days': [moment().subtract('days', 6), moment()],
            'Last 30 Days': [moment().subtract('days', 29), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
        },
        opens: 'left',
        startDate: moment().subtract('days', 29),
        endDate: moment()
        },
        function(start, end) {
            $('#daterangepicker2 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY') + ' <b class="caret"></b>');
        }
    );


    //------------------------------
    // FullCalendar
    //------------------------------

    // Demo for FullCalendar with Drag/Drop internal


    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var calendar = $('#calendar-drag').fullCalendar({
        header: {
            left: 'title',
            right: 'prev,next month,agendaWeek,agendaDay'
        },
        titleFormat: {
            day: "ddd, MMM d, yy"
        },
        selectable: true,
        selectHelper: true,
        select: function(start, end, allDay) {
            var title = prompt('Event Title:');
            if (title) {
                calendar.fullCalendar('renderEvent',
                    {
                        title: title,
                        start: start,
                        end: end,
                        allDay: allDay
                    },
                    true // make the event "stick"
                );
            }
            calendar.fullCalendar('unselect');
        },
        editable: true,
        events: [
            {
                title: 'All Day Event',
                start: new Date(y, m, 8),
                backgroundColor: Utility.getBrandColor('midnightblue')
            },
            {
                title: 'Long Event',
                start: new Date(y, m, d-5),
                end: new Date(y, m, d-2),
                backgroundColor: Utility.getBrandColor('primary')
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d-3, 16, 0),
                allDay: false,
                backgroundColor: Utility.getBrandColor('success')
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d+4, 16, 0),
                allDay: false,
                backgroundColor: Utility.getBrandColor('success')
            },
            {
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                allDay: false,
                backgroundColor: Utility.getBrandColor('alizarin')
            },
            {
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false,
                backgroundColor: Utility.getBrandColor('inverse')
            },
            {
                title: 'Birthday Party',
                start: new Date(y, m, d+1, 19, 0),
                end: new Date(y, m, d+1, 22, 30),
                allDay: false,
                backgroundColor: Utility.getBrandColor('warning')
            },
            {
                title: 'Click for Google',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                url: 'http://google.com/',
                backgroundColor: Utility.getBrandColor('inverse')
            }
        ],
        buttonText: {
            prev: '<i class="fa fa-angle-left"></i>',
            next: '<i class="fa fa-angle-right"></i>',
            prevYear: '<i class="fa fa-angle-double-left"></i>',  // <<
            nextYear: '<i class="fa fa-angle-double-right"></i>',  // >>
            today:    '<span class="hidden-xs">Today</span><span class="visible-xs">T</span>',
            month:    '<span class="hidden-xs">Month</span><span class="visible-xs">M</span>',
            week:     '<span class="hidden-xs">Week</span><span class="visible-xs">W</span>',
            day:      '<span class="hidden-xs">Day</span><span class="visible-xs">D</span>'
        }
    });

    $("#sortable-tasks, #completed-tasks").sortable({
      connectWith: ".connectedSortable",
      receive: function (event, ui) {
        $(ui.item[0]).find('.iCheck-helper')[0].dropped = true;
        $(ui.item[0]).find('.iCheck-helper').click()
      }
    }).disableSelection();

    $('#sortable-tasks .iCheck-helper, #completed-tasks .iCheck-helper').on('click', function () {
        if ($(this)[0].dropped == true) { $(this)[0].dropped = false; return; }
        if ($(this).closest('#sortable-tasks').length)
            $(this).closest('li').appendTo('#completed-tasks');
        else
            $(this).closest('li').appendTo('#sortable-tasks');
    });

});