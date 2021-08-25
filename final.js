function keyWordsearch() {
    gapi.client.setApiKey('AIzaSyDXIVGhh_NXRm2Bfi6zAIBM_IUkirt5nag');
    gapi.client.load('youtube', 'v3', function() {
        makeRequest();
    });
}

function makeRequest() {
    var request = gapi.client.youtube.search.list({
        q: encodeURIComponent($("#query").val()).replace(/%20/g, "+"),
        part: 'snippet',
        type: "video",
        maxResults: 25,
        order: "viewCount"
    });
    request.execute(function(response) {
        $('#results').empty()
        var srchItems = response.result.items;
        $.each(srchItems, function(index, item) {
            vidTitle = item.snippet.title;
            videoSrcId = item.id.videoId;
            vidThumburl = item.snippet.thumbnails.default.url;
            toShow = '<h2>' + vidTitle + '</h2> <iframe class="cstmYTVideo" src="//www.youtube.com/embed/' + videoSrcId + '" frameborder="0" allowfullscreen></iframe> <br><br>';

            $('#results').append(toShow);
        })
    })
}