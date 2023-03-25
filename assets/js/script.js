
$(function () {

    // add event listener to save buttons which stores text inputs to local storage
    var timeBlocksContainer = $('#hours');
    var timeBlocks = timeBlocksContainer.children();

    for(var i = 0; i < timeBlocks.length; i++){
        timeBlocks.eq(i).find('button').on('click', function(){
            var button = $(this);
            localStorage.setItem(button.parent().attr('id'), button.parent().find('textarea').val());
        })
    }

    // applies past/present/future classes to each time block based off current time
    var currentTime = dayjs().hour();

    for(var i = 0; i < timeBlocks.length; i++){
        var timeBlockHour = +timeBlocks.eq(i).attr('id').split("-")[1];
        if(timeBlockHour < 9){
            timeBlockHour += 12;
        }
        if(timeBlockHour < currentTime){
            timeBlocks.eq(i).addClass('past');
            break;
        }else if(timeBlockHour === currentTime){
            timeBlocks.eq(i).addClass('present');
            break;
        }else{
            timeBlocks.eq(i).addClass('future');
        }
    }

    // get any user input that was saved in localStorage and set each text area to corresponding inputs
    for(var i = 0; i < timeBlocks.length; i++){
        timeBlocks.eq(i).find('textarea').val(localStorage.getItem(timeBlocks.eq(i).attr('id')));
    }

    // display current date at top of page
    $('#currentDay').text(dayjs().format('MMM D, YYYY'));
  });
  