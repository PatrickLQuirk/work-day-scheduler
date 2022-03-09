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
        
        var hourH2 = $("<h2>")
            .addClass("hour col-1")
            .text(blockHour);
        
        var eventDescription = $("<textarea>").addClass("description col-10 past");

        var saveButton = $("<button>")
            .addClass("saveBtn col-1");
        var saveButtonIcon = $("<i>")
            .addClass("fas fa-save");
        saveButton.append(saveButtonIcon);

        timeBlock.append(hourH2, eventDescription, saveButton);

        timeBlockContainerEl.append(timeBlock);
    };
};

createTimeBlocks();