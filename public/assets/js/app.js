// Get request when scrape button is clicked
$(".scrape-btn").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function() {
        location.reload();
    })
});

$(document).on("click", ".view-comments", function() {
    $.ajax({
        method: "GET",
        url: `/articles/${$(this).attr("data-id")}`
    }).then(function(notes) {
        console.log(notes)
        // $(".comments-modal").modal("show");
    })
})