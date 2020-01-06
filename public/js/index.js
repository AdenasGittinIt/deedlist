// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $agreeBtn = $("#agree")

// The API object contains methods for each kind of request we'll make
var API = {
    savePerson: function(person) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "/api/people",
            data: JSON.stringify(person)
        });
    },
    getPublicNeeds: function() {
        return $.ajax({
            url: "api/needs/public",
            type: "GET"
        });
    },    
    
    getPrivateNeeds: function() {
        return $.ajax({
            url: "api/needs/:id",
            type: "GET"
        });
    },
    
    claimNeed: function(id) {
        return $.ajax({
            url: "api/need/" + id,
            type: "POST"
        });
    },
    saveNeed: function(need) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "/api/people",
            data: JSON.stringify(need)
        })
    }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
    API.getExamples().then(function(data) {
        var $examples = data.map(function(example) {
            var $a = $("<a>")
                .text(example.text)
                .attr("href", "/example/" + example.id);

            var $li = $("<li>")
                .attr({
                    class: "list-group-item",
                    "data-id": example.id
                })
                .append($a);

            var $button = $("<button>")
                .addClass("btn btn-danger float-right delete")
                .text("ｘ");

            $li.append($button);

            return $li;
        });

        $exampleList.empty();
        $exampleList.append($examples);
    });
};

// handlePersonSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handlePersonSubmit = function(event) {
    event.preventDefault();
    var first_name = $("#first_name").val().trim();
    var last_name = $("#last_name").val().trim();
    var email = $("#email").val().trim();
    var zip_code = $("#zip_code").val().trim();
    var private = $("#private").val();

    var person = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        zip_code: zip_code,
        private: private
    }

    if (!(first_name && last_name && email && zip_code && private)) {
        alert("Be sure you have completed all required fields");
        return;
    }

    API.savePerson(person).then(function() {
        // Need function to clear the modal inputs

    });
};

handleNeedSubmit = function(event) {
    event.preventDefault();
    var title = $("#title").val().trim();
    var category = $("#category").val().trim();
    var details = $("#details").val().trim();

    var need = {
    title: title,
    category: category,
    details: details,
    }

    if (!(title && category && details)) {
        alert("Be sure you have completed all required fields");
        return;
    }

    API.saveNeed(need).then(function() {
        //need function to clear the need form inputs
    })
}







// handleClaimBtnClick is called when an example's claim button is clicked
// Change the status from available to claimed from the db and refresh the list
var handleClaimBtnClick = function() {
    var idToClaim = $(this)
        .parent()
        .attr("data-id");
    API.claimNeed(idToClaim).then(function() {
        refreshNeeds();
    });
};

// dont load this yet

(function ($) {
    $.fn.invisible = function () {
        return this.each(function () {
            $(this).css("visibility", "hidden");
        });
    };
    $.fn.visible = function () {
        return this.each(function () {
            $(this).css("visibility", "visible");
        });
    };

}(jQuery))
$("#needClose").on('click', function(){
    $('#modal-need').invisible();
    $('#need2').visible();
});





// Add event listeners to the submit and delete buttons
$(document).ready(function(){

    $('#needForm').invisible();

    // materialize js
    $('.modal').modal();
    $('select').formSelect();
    $('.parallax').parallax();
    $('.tap-target').tapTarget();
    $('select').formSelect();
});
$exampleList.on("click", ".delete", handleClaimBtnClick)

//This click function sends the person payload to the server
$agreeBtn.on("click", handlePersonSubmit)

//this click function sends a get request to dispay all public needs
$continueBtn.on("click", getPublicNeeds)

