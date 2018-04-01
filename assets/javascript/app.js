// Variables
    // Initial Array of Characters
        var characterArray = ["Scooby Doo", "Link - Legend of Zelda", "Lightning - FFXIII", "Faith - Mirrors Edge", "Sora", "Lara Croft", "Dante - DMC", "Commander Shepard", "GLaDOS", "Master Chief", "Nathan Drake", "Bayonetta", "Tracer"]

// Functions
    // Render Buttons
        function renderButtons() {
            $("#buttonContainer").empty();

            for (var i = 0; i < characterArray.length; i++) {
                var button = $("<button>");
                button.addClass("characterButton");
                button.attr("dataCharacter",characterArray[i]);
                button.text(characterArray[i]);

                $("#buttonContainer").append(button);
            }
        }

    // Collect Gifs
    function collectCharacterGifs() {
        // Get the character name from the button clicked
        var characterName = $(this).attr("dataCharacter");
        var characterStr = characterName.split(" ").join("+");
      
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + characterStr + 
                       "&rating=pg-13&limit=20&api_key=Y89rkTa29gzRbDjqG56DnUBLXGaMF04c";
      
        $.ajax({
          method: "GET",
          url: queryURL,
        })
        .done(function( result ) {

            var dataArray = result.data;
      
          $("#gifContainer").empty();
          for (var i = 0; i < dataArray.length; i++) {
            var newDiv = $("<div>");
            newDiv.addClass("characterGif");
      
            var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
            newDiv.append(newRating);
      
            var newImg = $("<img>");
            newImg.addClass("img-fluid img-thumbnail");
            newImg.attr("src", dataArray[i].images.fixed_height_still.url);
            newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
            newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
            newImg.attr("data-state", "still");
            newDiv.append(newImg);
      
            $("#gifContainer").append(newDiv);
          }
        });
      }

    // Swap Animate State
        function animateStateGif() {
            var state = $(this).find("img").attr("data-state");
        
            if (state === "still") {
            $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
            $(this).find("img").attr("data-state", "animate");
            } else {
            $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
            $(this).find("img").attr("data-state", "still");
            }
        }

// Click Events
        // Submit Button
            $("#addCharacter").on("click", function(event) {
                event.preventDefault();

                var character = $("#characterInput").val().trim();

                characterArray.push(character);
                $("#characterInput").val("");

                renderButtons();
            });
        
        // Collect GIFs
            $(document).on("click", ".characterButton", collectCharacterGifs);

        // Swap Animate State
            $(document).on("click", ".characterGif", animateStateGif);

// Render Initial Page
            $(document).ready(function() {
                renderButtons();
            })