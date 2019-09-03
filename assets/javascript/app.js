var topics = ["one piece", "dragon ball Z", "Attack on titan", "bleach", "black clover", "one punch man", "my hero academia", "the rise of the shield hero"];

$(".anime-button").on("click", function(){
    console.log("click");
    var animeTopic = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animeTopic + "&api_key=pBoZ5ew5vY9MyeB385dHVb7HDpi81uea";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        $("#gif-container").empty();

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r") {
                var gifDiv = $("<div class='item'>");
                var raiting = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animeImage = $("<img>");
                animeImage.attr("src", results[i].images.fixed_height_still.url);
                animeImage.attr("data-still", results[i].images.fixed_height_still.url);
                animeImage.attr("data-animate", results[i].images.fixed_height.url);
                animeImage.attr("data-still", "still");

                gifDiv.append(animeImage);
                gifDiv.append(p);

                $("#gif-container").prepend(gifDiv);
                $(animeImage).on("click", function(){
                    var state = $(this).attr("data-state");
                    if(state === "still"){
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    };
                });
            };
        };
    });
});

function remakeButtons() {
    $("#add-topic").on("click", function(event) {
        event.preventDefault();
        var anime = $("#inputDefault").val().trim();
        topics.push(anime);
        console.log(topics);
        $("#inputDefault").val("");
        renderButtons();
        displayImages();
    });
};

$(document).ready(function() {
    remakeButtons();
    renderButtons();
    displayImages();
});