var searchTerm = "";
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=ZvdrAaokoiXgdWWmhGKsMAtlvpCK0ly7&limit=10";
var buttons = ['Carribean', 'Hawaii', 'Greece', 'Madagascar', 'Galapagos', 'Australia', 'New Zealand'];
var searched = false;
var idTag = "";
function searchAPI() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (i = 0; i < 10; i++) {
            idTag = searchTerm + i;
            var newDiv = $('<div>');
            searchTerm = searchTerm.replace(/ /g,'');
            newDiv.addClass("gifcontainer " + searchTerm + i)
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
                return splitStr.join(' ');
            }

            title.text(titleCase(response.data[i].title.substring(0, 22)));
            capDiv.append(title);
            capDiv.append(rating);
            newDiv.append(capDiv);
            var stars = $("<i class='far fa-star hvr-grow favorite'></i>");
            // star.html(stars);
            
            $(stars).attr("clicked", "false");
            $(stars).attr("data-parent", idTag);
            $(newDiv).prepend(stars);
            function download() {
                // var link = $('<a>');
                // link.attr("href", response.data[i].images.fixed_height.url);
                // // link.attr("target", "_blank");
                // link.attr("download", true);
                // link.text("Download");
                // var newButton = $('<button>');
                // var favButton = $('<button>');
                // favButton.text("+ Favorite");
                // favButton.addClass("favorite hvr-shrink");
                // newButton.text("Download");
                // newButton.addClass("download hvr-grow");
                // $(link).append(newButton);
                // $(link).append(favButton);
                // $(capDiv).append(link);
            }
            rating.addClass('ratings');
            rating.text("Rating: " + response.data[i].rating.toUpperCase());
            newImage.addClass("gifs")
            newImage.attr("data-state", "still");
            newImage.attr("data-still", response.data[i].images.fixed_height_still.url);
            newImage.attr("data-animate", response.data[i].images.fixed_height.url);
            newImage.attr("src", response.data[i].images.fixed_height_still.url)
            newImage.attr("alt", response.data[i].title)
            $('.results').prepend(newDiv);
        }
    })
}

for (var i = 0; i < buttons.length; i++) {
    var newButton = $('<button>');
    newButton.addClass("buttons hvr-bob");
    newButton.text(buttons[i]);
    $('.buttonList').append(newButton);
}
$(document).on("click", "#clear", function () {
    event.preventDefault();
    $('.results').empty();
})
$(document).on("click", "#search", function () {
    event.preventDefault();
    searchTerm = $('#searchTerm').val();
    searched = true;
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=ZvdrAaokoiXgdWWmhGKsMAtlvpCK0ly7&limit=10";
    if (searchTerm !== "") {
        var searchButton = $('<button>');
        searchButton.addClass('buttons');
        searchButton.text(searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1));
        $('.buttonList').append(searchButton);
        $('#searchTerm').val("");
    }
})
$(document).on("click", '.buttons', function () {
    event.preventDefault();
    searchTerm = $(this).text();
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=ZvdrAaokoiXgdWWmhGKsMAtlvpCK0ly7&limit=10";
    searchAPI();
})
$(document).on("click", '.gifs', function () {
    var state = $(this).attr('data-state');
    if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        state = $(this).attr('data-state', 'animate');
    }

    if (state === 'animate') {
        $(this).attr('src', $(this).attr('data-still'));
        state = $(this).attr('data-state', 'still');
    }
})
$(document).on("click", ".favorite", function () {
    $(".faves").removeClass("hide");
    $("#room").removeClass("col-md-12")
    $("#room").addClass("col-md-8")
    if($(this).attr("clicked")==="false"){
        $(this).attr("clicked" ,"true");
    $(this).removeClass("far fa-star").addClass("fas fa-star");
    var parentCard = $(this).attr("data-parent");
    parentCard = parentCard.replace(/ /g,'');
    console.log(parentCard);
    // for(var i=0;i<parentCard.length;i++){
    //     var words = [];
    //     words.push(parentCard[i]);
    //     console.log(i);
    //     words.join("");
    //     parentCard = words;
    // }
    var newFavCard = $("<Div>", {id: "fav"+parentCard, class: "favorites"});

        $(newFavCard).append($("." + parentCard).html());
        $(".favoritegifs").append(newFavCard);
    }
    else{
        $(this).attr("clicked", "false");
        $(this).removeClass("fas fa-star").addClass("far fa-star");
        parentCard = $(this).attr("data-parent");
        var currentId = ("fav" + parentCard);
        $('#'+currentId).remove();
        $(this).attr("clicked", "false");
        $(this).removeClass("fas fa-star");
        $(this).addClass("far fa-star");
    }
})