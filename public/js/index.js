
// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $agreeBtn = $("#agree")
var $continueBtn = $("to-needs")
var $logInBtn = $("#fake-log-in")
var clickOnce = true 
var $needDoneBtn = $("#done")

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

    getEmail: function(email) {
        console.log(email.email);
        return $.ajax({
            headers:{
                "Content-Type": "application/json"
            },
            type: "GET",
            url: "/api/people/" + email.email,
            data: JSON.stringify(email)
        })
    },

    getPublicNeeds: function() {
        return $.ajax({
            url: "api/needs/...",
            type: "GET"
        });
    },    
    
    getPrivateNeeds: function() {
        return $.ajax({
            url: "api/needs/"+id,
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
var refreshNeeds = function() {
    API.getNeeds().then(function(data) {
        var $needs = data.map(function(example) {
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

        $needsList.empty();
        $needsList.append($needs);
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
    };

    if (!(first_name && last_name && email && zip_code && private)) {
        alert("Be sure you have completed all required fields");

        return person;
    }
    
    API.savePerson(person).then(function(res) {

        sessionStorage.setItem(getEmail, email)
        console.log(person);
    }); 
};

//added step to enter email address


handleNeedSubmit = function(event) {
    event.preventDefault();
    var title = $("#title").val().trim();
    var category = $("#category").val().trim();
    var details = $("#details").val().trim();
    var email = sessionStorage.getItem(event, email);


    var need = {
    email:email,
    title: title,
    category: category,
    details: details,
    status: false,
    email: email
    }

    if (!(title && category && details)) {
        alert("Be sure you have completed all required fields");
        
        return need;
    }

    API.saveNeed(need).then(function(res) {
        //need function to clear the need form inputs
        console.log(res.id);
        var needID = sessionStorage.getItem(res, email)
        return needID;
    })
}


var handleEmailCheck = function(event) {
    event.preventDefault();
    var emailInput = $("#emailStart").val().trim();

    var email = {
        email: emailInput
    }
    
    API.getEmail(email).then(function(res) {
        if(res === null) {
            console.log("modal")
            // $("#modal-need").modal("modal-content")
            // $("#modal-need").modal("show")
            // $('#fake-log-in').attr("class","btn modal-trigger");
           if (clickOnce === true) {
            console.log("clicked")
            $("#fake-log-in").click();
            clickOnce = false;
           }
            
        }
        else {
            location.href = "/home"
        }
 
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
$("#emailModal").on('click', function(){
    $('#emailModal').invisible();
    $('#modal-need').visible();
})
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
    $('.sidenav').sidenav();
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip();
    $('.fixed-action-btn').floatingActionButton();
});



$exampleList.on("click", ".delete", handleClaimBtnClick)

//This click function sends the person payload to the server
$agreeBtn.on("click", handlePersonSubmit)

//this click function sends a get request to dispay all public needs
// $continueBtn.on("click", getPublicNeeds)


//checking the data base to see if an email exists
$logInBtn.on("click", handleEmailCheck)

$needDoneBtn.on("click", handleNeedSubmit)

$("#emailStart").val().trim() = sessionStorage.setItem("email");

API.savePerson(person).then(function(res) {
    var email = JSON.parse(res.email);
    sessionStorage.setItem(emailForNeed, email)
});

// function $addNeed(){
//     var i = 1;
//     var form = ('<br> <div class="input-field col s12"> <form> <select id="cat"> <option value="" disabled selected>Choose One</option> <option value="1">Chore </option> <option value="2">Errand</option> <option value="3">Meals</option> <option value="4">Gift</option> </select> <label>Please Select Category</label> <br> <div class="row"> <div class="input-field col s12"> <input placeholder="Need yard work done" id="needTitle" type="text" class="validate"> <label for="NeedTitle">Need Title</label> </div> <br> <div class="input-field col s12"> <input placeholder="someone with a lawn mower please help an elderly lady" id="needDetails" type="text" class="validate"> <label for="needDetails">Details about your need</label> </div> </div> </form> </div>')
//     var $addNew = $("div"); 
//     $addNew.attr({
//         id:"need",
//         class: "modal-content",
//         content: form
//     })
//     $(".addForm").prepend($addNew);
//     $addNew[i++]
// };

