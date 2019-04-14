var searchTerm = "";
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=ZvdrAaokoiXgdWWmhGKsMAtlvpCK0ly7&limit=10";
var buttons = ['Carribean','Hawaii','Greece','Madagascar','Galapagos','Australia','New Zealand'];
var searched = false;
console.log(queryURL);
function searchAPI(){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(searchTerm);
        console.log(response);
        for(i=0;i<10;i++){
            var newDiv = $('<div>');
            newDiv.addClass("gifcontainer")
            var newImage = $('<img>');
            newDiv.append(newImage);
            var capDiv = $('<div>');
            var rating = $('<p>');
            var title = $('<p>');
            title.addClass('ratings');
           //make title uppercase
            function titleCase(str) {
                var splitStr = str.toLowerCase().split(' ');
                for (var i = 0; i < splitStr.length; i++) {
                    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
                }
                // Directly return the joined string
                return splitStr.join(' '); }

                title.text(titleCase(response.data[i].title.substring(0,25)));
            capDiv.append(title);
            capDiv.append(rating);
            newDiv.append(capDiv);
            var link = $('<a>');
            link.attr("href", response.data[i].images.fixed_height.url);
            link.attr("download", "gif-download.jpg");
            // link.text("Download");
            var newButton = $('<button>')
            newButton.text("Download");
            newButton.addClass("download hvr-grow");
            $(link).append(newButton);
            $(capDiv).append(link);
            rating.addClass('ratings');
            rating.text("Rating: " + response.data[i].rating.toUpperCase());
            newImage.addClass("gifs")
            newImage.attr("data-state", "still");
            newImage.attr("data-still", response.data[i].images.fixed_height_still.url);
            newImage.attr("data-animate", response.data[i].images.fixed_height.url);
            newImage.attr("src", response.data[i].images.fixed_height_still.url)
            newImage.attr("alt", response.data[i].title)
            $('.results').prepend(newDiv );
        }
    })
}

for(var i=0;i<buttons.length;i++){
    var newButton = $('<button>');
    newButton.addClass('buttons');
    newButton.text(buttons[i]);
    $('.buttonList').append(newButton);
}
$(document).on("click", "#clear", function(){
    $('.results').empty();
})
$(document).on("click", "#search", function(){
    event.preventDefault();
    searchTerm = $('#searchTerm').val();
    searched = true;
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=ZvdrAaokoiXgdWWmhGKsMAtlvpCK0ly7&limit=10";
    var searchButton = $('<button>');
    searchButton.addClass('buttons');
    searchButton.text(searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1));
    $('.buttonList').append(searchButton);
    $('#searchTerm').val("");
})
$(document).on("click", '.buttons', function(){
    event.preventDefault();
    searchTerm = $(this).text();
    console.log(searchTerm);
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=ZvdrAaokoiXgdWWmhGKsMAtlvpCK0ly7&limit=10";
    searchAPI();
})
$(document).on("click", '.gifs', function(){
    var state = $(this).attr('data-state');
    if(state === 'still'){
        $(this).attr('src', $(this).attr('data-animate'));
        state = $(this).attr('data-state', 'animate');
    }
    
    if(state === 'animate'){
        $(this).attr('src', $(this).attr('data-still'));
        state = $(this).attr('data-state', 'still');
      }
})