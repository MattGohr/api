/*
API Key
IOBvI8cShqJ2IlGnOYWOjFMCeYFkmcU1

example
http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5

domain
api.giphy.com

*/
var topics = ['Men in Black', 'Planet of The Apes', 'Die Hard', 'Die Hard 2', 'Office Space', 'Atonemet', 'Star Wars', 'Baby Driver', 'Logan', 'Avengers', 'Thor', 'John Wick', 'John Wick 2', 'Spiderman Homecoming'];
var key = "&api_key=IOBvI8cShqJ2IlGnOYWOjFMCeYFkmcU1";
var limit = "&limit=" + 10;
var host = "http://api.giphy.com";
var searchPath = "/v1/gifs/search?q=";
var movieObj;


function populateButtons(newGyphName) {
  if (newGyphName) {
    var newBtn = $("<button>");
    newBtn.attr('class', 'btn btn-secondary movie-btn');
    newBtn.attr('id', newGyphName.replace(/ /g, "-"));
    newBtn.text(newGyphName);
    // $("#movie-buttons").append('<button class=\"btn btn-secondary\" id=\"' + topics[i].replace(/ /g, "-") + "\">" + topics[i] + '</button>');
    $("#movie-buttons").append(newBtn);
  } else {
    for (var i = 0; i < topics.length; i++) {
      var newBtn = $("<button>");
      newBtn.attr('class', 'btn btn-secondary movie-btn');
      newBtn.attr('id', topics[i].replace(/ /g, "-"));
      newBtn.text(topics[i]);
      // $("#movie-buttons").append('<button class=\"btn btn-secondary\" id=\"' + topics[i].replace(/ /g, "-") + "\">" + topics[i] + '</button>');
      $("#movie-buttons").append(newBtn);
      console.log(topics[i]);
    };
  }
};

function printMovieGyphs() {
  for (var i = 0; i < movieObj.data.length; i++) {

    var stillImg = movieObj.data[i].images.downsized_still.url;

    var newGyph = $("<img>");
    newGyph.attr('src', stillImg);
    newGyph.attr('class', "gyph img");
    newGyph.attr('alt', 'still');
    $("#picture-container").append(newGyph);

  }

}

populateButtons();

//create gyphs
$(".movie-btn").on("click", function() {

  //clear gyps contents
  $("#picture-container").children("img").remove();

  //replace spaces with "+"
  var searchWord = $(this).text().replace(/ /g, "+");

  //run api request
  $.ajax({
    url: host + searchPath + searchWord + key + limit,
    // url: "http://api.giphy.com/v1/gifs/search?q=Avengers" + key + limit,
    method: "GET"
  }).done(function(response) {
    movieObj = response;
    console.log(movieObj);
    //print outmovie objects
    printMovieGyphs();
    enableClickGyph();
  });
});

//add new button to header
$("#add-btn").on("click", function() {
  console.log("add clicked ");
  var x = $(".form-control").val();
  console.log(x);
  populateButtons(x);
})

function enableClickGyph() {
  $("img").on("click", function() {
    var alt = $(this).attr('alt');

    //if image is still then change the src to moving
    if (alt === "still") {
      var src = $(this).attr('src');
      console.log(src.replace("_s.gif", ".gif"));
      $(this).attr('src', src.replace("_s.gif", ".gif"))
      $(this).attr('alt', 'moving');
    } else {
      var src = $(this).attr('src');
      console.log(src.replace(".gif", "_s.gif"));
      $(this).attr('src', src.replace(".gif", "_s.gif"))
      $(this).attr('alt', 'still');
    }
  });
}