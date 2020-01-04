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
    getExamples: function() {
        return $.ajax({
            url: "api/examples",
            type: "GET"
        });
    },
    deleteExample: function(id) {
        return $.ajax({
            url: "api/examples/" + id,
            type: "DELETE"
        });
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
        refreshExamples();
    });

    $exampleText.val("");
    $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
    var idToDelete = $(this)
        .parent()
        .attr("data-id");

    API.deleteExample(idToDelete).then(function() {
        refreshExamples();
    });
};

// Add event listeners to the submit and delete buttons
$(document).ready(function(){

    // materialize js
    $('.modal').modal();
    $('select').formSelect();
    $('.parallax').parallax();
    $('.tap-target').tapTarget();
});
$exampleList.on("click", ".delete", handleDeleteBtnClick)

$agreeBtn.on("click", handlePersonSubmit)

