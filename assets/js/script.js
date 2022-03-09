var timeBlockContainerEl = document.querySelector("#time-block-container");

var createTimeBlocks = function() {
    // in the for loop, i is the number of hours since midnight (the hour in 24-hour time)
    for (i = 9; i <= 17; i++) {
        var timeBlockEl = document.createElement("div");
        timeBlockEl.className = "time-block row";
        
        // create a time variable that gives the time of the block in the format (hour)(AM/PM)
        // (i.e. 10AM or 3PM)
        if (i < 12) {
            var time = i + "AM";
        }
        else if (i === 12) {
            var time = i + "PM";
        }
        else {
            var time = (i - 12) + "PM";
        }

        timeBlockEl.setAttribute("data-time", time);
        
        hourEl = document.createElement("h2");
        hourEl.textContent = time;
        hourEl.className = "hour col-1";
        timeBlockEl.appendChild(hourEl);
        
        eventDescripEl = document.createElement("textarea");
        // may remove the past class from this declaration and handle the time separately
        eventDescripEl.className = "description col-10 past";
        timeBlockEl.appendChild(eventDescripEl);

        saveButtonEl = document.createElement("button");
        saveButtonEl.className = "saveBtn col-1";
        saveButtonEl.innerHTML = "<i class='fas fa-save'></i>";
        timeBlockEl.appendChild(saveButtonEl);

        timeBlockContainerEl.appendChild(timeBlockEl);
    };
};

createTimeBlocks();