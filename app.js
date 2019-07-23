{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> */}


 var topics = ["The Office", "Mindhunter", "Baseball", "Football", "Basketball"];

 function genBtns(){
    $('.button-container').empty();
     for(var i =0; i < topics.length; i++){
        var buttonHtml = "<button class='btn-clk' data-person='" + topics[i] + "'>" + topics[i] + "</button>";
        
        $('.button-container').append(buttonHtml);
     }

 }



$('#add-btn').on('click', function() {
    var inputVal = $('#add-term').val();
    if(inputVal){
        topics.push(inputVal);
        $('.error').removeClass('show').addClass('hide');
        $('#add-term').val('');
        genBtns();
    }
    else {
        console.log('Fail');
        //here we shoulld show error
        $('.error').removeClass('hide').addClass('show');
    }
});
//Adding a click listener to all buttons 
$(document).on("click", '.btn-clk', function() {

    var topics = $(this).attr("data-person");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topics + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

//Ajax GET request 
    $.ajax({
        url: queryURL,
        method: "GET"
      })

       // After the data comes back from the API
       .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
            var gifDiv = $("<div>");

            //Storing the rating 
            var rating = results[i].rating;

            //Placing the rating in a p tag 
            var p = $("<p>").text("Rating: " + rating);

            //Image tag 
            var personImage = $("<img>");

// Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height.url);

  // Appending the paragraph and personImage we created to the "gifDiv" div we created
gifDiv.append(p);
gifDiv.append(personImage);

 // Appending the paragraph and personImage we created to the "gifDiv" div we created
$("#gifs-appear-here").prepend(gifDiv);
            }
        }

          });
        });

 var queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };
    genBtns();



