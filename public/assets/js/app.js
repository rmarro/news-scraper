// Get request when scrape button is clicked
$(".scrape-btn").on("click", function() {
    $.ajax({
        method: "GET",
        url: "articles/scrape"
    }).then(function() {
        location.reload();
    })
});


// Save article button
$(document).on("click", ".save-article", function() {
    $.ajax({
        method: "POST",
        url: `/articles/save/${$(this).attr("data-id")}`
    }).then(function() {
        location.reload();
    })
});

// Unsave article button
$(document).on("click", ".unsave-article", function() {
    $.ajax({
        method: "POST",
        url: `/articles/unsave/${$(this).attr("data-id")}`
    }).then(function() {
        location.reload();
    })
});

// Submit comment button
$(document).on("click", "#submit-comment", function() {
    event.preventDefault();
    var newNote = {
        body: $("#commentBox").val().trim()
    };
    $.ajax({
        method: "POST",
        url: `/articles/${$(this).attr("data-id")}`,
        data: newNote
    }).then(function() {
        // location.reload();
    })
});

// Delete comment button
$(document).on("click", ".delete-comment", function() {
    $.ajax({
        method: "DELETE",
        // Grab the article id from the panel title and the note id from the delete button
        url: `/articles/${$(".panel-title").attr("data-id")}/${$(this).attr("data-noteid")}`
    }).then(function() {
        location.reload();
    })
})


// **********************************************
// MODAL NOT WORKING, SWITCHED TO SEPARATE PAGES
// SAVE INCASE REVISIT THIS
// $(document).on("click", ".view-comments", function() {
//     $.ajax({
//         method: "GET",
//         url: `/articles/${$(this).attr("data-id")}`
//     }).then(function(notes) {
//         console.log(notes)
//         // $(".comments-modal").modal("show");
//     })
// });