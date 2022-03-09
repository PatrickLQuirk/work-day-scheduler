var timeBlockContainerEl = $("#time-block-container");

var createTimeBlocks = function() {
    // in the for loop, i is the number of hours since midnight (the hour in 24-hour time)
    for (i = 9; i <= 17; i++) {
        
        // create a blockHour variable that gives the hour of the block in the format (hour)(AM/PM)
        // (i.e. 10AM or 3PM)
        if (i < 12) {
            var blockHour = i + "AM";
        }
        else if (i === 12) {
            var blockHour = i + "PM";
        }
        else {
            var blockHour = (i - 12) + "PM";
        }

        var timeBlock = $("<div>")
            .addClass("time-block row")
            .attr("data-time", blockHour);
        
        var hourP = $("<p>")
            .addClass("hour col-1")
            .text(blockHour);
        
        var eventDescription = $("<textarea>").addClass("description col-10 past");

        var saveButton = $("<button>")
            .addClass("saveBtn col-1");
        var saveButtonIcon = $("<i>")
            .addClass("fas fa-save");
        saveButton.append(saveButtonIcon);

        timeBlock.append(hourP, eventDescription, saveButton);

        auditTimeBlock(timeBlock);
        displayDate();

        timeBlockContainerEl.append(timeBlock);
    };
};

var auditTimeBlock = function(timeBlock) {
    var blockHourText = $(timeBlock).attr("data-time");
    var blockHour = moment(blockHourText, "hA").hour();
    var currentHour = moment().hour();
    
    // remove old classes from timeBlock textarea
    var timeBlockText = $(timeBlock).find("textarea");
    $(timeBlockText).removeClass("past present future");

    if (blockHour < currentHour) {
        $(timeBlockText).addClass("past");
    } else if (blockHour === currentHour) {
        $(timeBlockText).addClass("present");
    } else {
        $(timeBlockText).addClass("future");
    }
}

var displayDate = function() {
    var currentDate = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentDate);
}

// update whether time-blocks are in past, present, or future every minute
setInterval(function() {
    $(".time-block").each(function(index, el){
        auditTimeBlock(el);
    });
}, 1000 * 60);

setInterval(function() {
    displayDate();
}, 1000 * 60 * 60 * 6);

createTimeBlocks();