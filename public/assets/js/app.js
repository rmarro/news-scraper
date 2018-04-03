// Get request when scrape button is clicked
$(".scrape-btn").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function() {
        location.reload();
    })
});

// $(document).on("click", ".view-comments", function() {
//     $.ajax({
//         method: "GET",
//         url: `/articles/${$(this).attr("data-id")}`
//     }).then(function(notes) {
//         console.log(notes)
//         // $(".comments-modal").modal("show");
//     })
// });

// Save article button
$(document).on("click", ".save-article", function() {
    $.ajax({
        method: "POST",
        url: `/articles/save/${$(this).attr("data-id")}`
    }).then(function() {
        alert("Article saved!");
        location.reload();
    })
});

// Unsave article button
$(document).on("click", ".unsave-article", function() {
    $.ajax({
        method: "POST",
        url: `/articles/unsave/${$(this).attr("data-id")}`
    }).then(function() {
        alert("Article unsaved!");
        location.reload();
    })
});