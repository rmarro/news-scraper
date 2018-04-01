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
    console.log("comments button clicked");
    $(".comments-modal").modal("show");
})