var timeBlockContainerEl = $("#time-block-container");

// object to store the events that the user adds
// the keys are the hours of the day and the values are the event descriptions
// hours where the timeblock has no event description are not stored in the object
//      (there is no key associated with them)
var events = {}

// takes the hour in 24 hour time (i) and outputs a string that gives the hour in the format (hour)(AM/PM)
// (i.e. 10 becomes "10AM" and 15 becomes "3PM")
// the purpose of having the i is to make looping through the hours of a business day easier.
var convertHourFormat = function(i) {
    var hourMoment = moment().hour(i);
    return hourMoment.format("hA");
}

// create the timeblock for a specific hour
// utilizes the eventHour and eventText from loadTasks()
var createTimeBlock = function(eventHour, eventText) {
    // create the timeblock
    var timeBlock = $("<div>")
        .addClass("time-block row")
        .attr("data-time", eventHour);
    
    // create p element for displaying the hour of the timeblock
    var hourP = $("<p>")
        .addClass("hour col-1")
        .text(eventHour);
    
    var eventDescription = $("<textarea>").addClass("description col-10 past");
    $(eventDescription).val(eventText);

    var saveButton = $("<button>")
        .addClass("saveBtn col-1");
    var saveButtonIcon = $("<i>")
        .addClass("fas fa-save");
    saveButton.append(saveButtonIcon);

    // append all three elements to the timeblock
    timeBlock.append(hourP, eventDescription, saveButton);

    // color-code the timeblock before adding it to the page
    auditTimeBlock(timeBlock);

    timeBlockContainerEl.append(timeBlock);
};

// color-code a time-block
var auditTimeBlock = function(timeBlock) {
    var blockHourText = $(timeBlock).attr("data-time");

    // remove old classes from timeBlock textarea
    var timeBlockText = $(timeBlock).find("textarea");
    $(timeBlockText).removeClass("past present future");

    // Define moments for the hour corresponding to the block and for the current time,
    //      then get just the hour of the day (in 24-hour time).
    // The two hours are then compared to decide how to color the timeblocks
    // Doing it this way instead of using moment's isAfter and isBefore methods
    //      makes it easier to correctly color the block for the current hour.
    var blockHour = moment(blockHourText, "hA").hour();
    var currentHour = moment().hour();

    if (blockHour < currentHour) {
        $(timeBlockText).addClass("past");
    } else if (blockHour === currentHour) {
        $(timeBlockText).addClass("present");
    } else {
        $(timeBlockText).addClass("future");
    }
}

// display the current date in the header
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
        var eventHour = convertHourFormat(i);
        // if we have event text stored in events for that hour, then use that text
        // otherwise use an empty string
        if (events[eventHour]) {
            var eventText = events[eventHour];
        }
        else {
            var eventText = "";
        };

        createTimeBlock(eventHour, eventText);
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

// update the date displayed at the top of the page every hour
setInterval(function() {
    displayDate();
}, 1000 * 60 * 60);

// event listener for the save buttons
// saves the events when triggered
$("#time-block-container").on("click", "button", function() {
    var eventBlock = $(this).closest(".time-block");
    var eventHour = $(eventBlock).attr("data-time");
    var eventText = $(eventBlock).find(".description")
        .val().trim();
    events[eventHour] = eventText;
    saveEvents();
});

displayDate();
loadEvents();