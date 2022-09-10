var timeNow = moment();
function loadPage() {
    //set current time
    var timeContainer = $("#currentDay");
    timeContainer.text(timeNow.format("dddd, MMMM Do"))

    //build time block elements with custom classes
        var timeblockContainer = $(".container")
        var inGroup;
        var labelContainer;
        var labelTextContainer;
        var labelHour;
        var labelAP;
        var ident;
        var textArea;
        var areaClass;
        var inBtnContainer;
        var inBtn;
    //loop through hours 9-5
    for (i = 9; i < 18; i++) {
        inGroup = $("<div>")
        inGroup.addClass("input-group time-block row")
        labelContainer = $("<div>")
        labelContainer.addClass("input-group-prepend")
        labelTextContainer = $("<p>")
        if(i<12) {
            labelHour = i;
            labelAP = "AM"
        }
        else {
            if (i > 12) { labelHour = i - 12 }
            else { labelHour = i }
            labelAP = "PM"
        }
        //class for past, present, future
        if (i<timeNow.hour()) { areaClass = "past" }
        else if (i>timeNow.hour()) { areaClass = "future" }
        else { areaClass = "present" }

        //ident used as variable part of ids for storage and click event 
        ident = labelHour + labelAP;
        labelTextContainer.addClass("input-group-text hour");
        labelTextContainer.text(ident);
        textArea = $("<textarea>");
        textArea.addClass("form-control " + areaClass);
        textArea.attr("id", "text-area-" + ident);
        textArea.text(localStorage.getItem("item-" + ident));
        inBtnContainer = $("<div>");
        inBtnContainer.addClass("input-group-append");
        inBtn = $("<button>");
        inBtn.addClass("btn saveBtn");
        inBtn.attr("id", "save-btn-" + ident);
        inBtn.text("Save");
        labelContainer.append(labelTextContainer);
        inBtnContainer.append(inBtn);
        inGroup.append(labelContainer);
        inGroup.append(textArea);
        inGroup.append(inBtnContainer);
        timeblockContainer.append(inGroup);
    }
}

function saveItem (e) {
    var btnClicked = $(e.target)
    var ident = btnClicked.attr("id").split("-")[2]
    var areaClicked = $("#text-area-"+ident)
    if(areaClicked.val() == "") {
        localStorage.removeItem("item-" + ident)
    }
    else {
        localStorage.setItem("item-" + ident, areaClicked.val())
    }
    console.log(areaClicked.val())
}

$(".container").on("click", "button", saveItem)
loadPage();