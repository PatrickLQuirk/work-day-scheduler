var timeBlockContainerEl = $("#time-block-container");
var events = {}

// takes the hour in 24 hour time (i) and outputs a string that gives the hour in the format (hour)(AM/PM)
// (i.e. 10 becomes "10AM" and 15 becomes "3PM")
// the purpose of having the i is to make looping through the hours of a business day easier.
var convertHourFormat = function(i) {
    if (i < 12) {
        return i + "AM";
    }
    else if (i === 12) {
        return i + "PM";
    }
    else {
        return (i - 12) + "PM";
    };
}
var createTimeBlocks = function() {
    // in the for loop, i is the number of hours since midnight (the hour in 24-hour time)
    for (i = 9; i <= 17; i++) {
        
        // create a blockHour variable that gives the hour of the block in the format (hour)(AM/PM)
        // (i.e. 10AM or 3PM)
        var blockHour = convertHourFormat(i);

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
    loadEvents();
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

var loadEvents = function() {
    events = JSON.parse(localStorage.getItem("events"));
    if (!events) {
        events = {};
    };

    for (i = 9; i <= 17; i++) {
        var hour = convertHourFormat(i);
        if (events[hour]) {
            var eventText = events[hour];
            var timeBlock = $(timeBlockContainerEl).find("[data-time='" + hour + "']");
            $(timeBlock).find(".description")
                .val(eventText);
        }
    }
}

var saveEvents = function() {
    localStorage.setItem("events", JSON.stringify(events));
};

// update whether time-blocks are in past, present, or future every minute
setInterval(function() {
    $(".time-block").each(function(index, el){
        auditTimeBlock(el);
    });
}, 1000 * 60);

setInterval(function() {
    displayDate();
}, 1000 * 60 * 60 * 6);

$("#time-block-container").on("click", "button", function() {
    var eventBlock = $(this).closest(".time-block");
    var eventHour = $(eventBlock).attr("data-time");
    var eventText = $(eventBlock).find(".description")
        .val().trim();
    events[eventHour] = eventText;
    saveEvents();
})

createTimeBlocks();