// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    $(".change-eaten").on("click", function (event) {
        var id = $(this).data("id");
        var devoured = $(this).data("devoured");



        // Send the PUT request.
        $.ajax("/api/burger/" + id, {
            type: "POST",
            
        }).then(
            function () {
                console.log("changed burger to", devoured);
                // Reload the page to get the updated list
                //location.reload();
            }
        );
    });

    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurger = {
            name: $("#ca").val().trim(),
            full: $("[name=full]:checked").val().trim()
        };

        // Send the POST request.
        $.ajax("/api/burger", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });


}
);
