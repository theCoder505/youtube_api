function keyWordsearch() {
    gapi.client.setApiKey('AIzaSyDXIVGhh_NXRm2Bfi6zAIBM_IUkirt5nag');
    gapi.client.load('youtube', 'v3', function() {
        makeRequest();
    });
}

function makeRequest() {
    $(".loader").removeClass("d-none");
    var request = gapi.client.youtube.search.list({
        q: encodeURIComponent($("#query").val()).replace(/%20/g, "+"),
        part: 'snippet',
        type: "video",
        maxResults: 25,
        order: "viewCount"
    });
    request.execute(function(response) {
        $('#results').empty();
        $('#results').append('<div class="loader d-none"></div>');
        var srchItems = response.result.items;
        console.log(srchItems.length);
        $.each(srchItems, function(index, item) {
            vidTitle = item.snippet.title;
            videoSrcId = item.id.videoId;
            vidThumburl = item.snippet.thumbnails.default.url;
            toShow = '<h3>' + vidTitle + '</h3> <br> <iframe class="cstmYTVideo" src="//www.youtube.com/embed/' + videoSrcId + '" frameborder="0" allowfullscreen></iframe> <br><br><hr><hr><br>';

            $('#results').append(toShow);
        });
        if (srchItems.length === 0) {
            // alert("No Such Result Found");
            $('#results').append("<div class='centerAlert'><h2> No Such Result Found </h2></div>");
        }
    });
}


$("#query").keypress(function(e) {
    if (e.which == 13) {
        // do work
        $("#search-button").click();
    }
});