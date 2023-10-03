
    $('#searchBtn').on('click', function(event) {
        event.preventDefault();

        var searchTerm = $('search').val();
        
        
        
        console.log(searchTerm);

        searchTerm = searchTerm.replace(/ /g, '+');
        
        var url = "https://openlibrary.org/search.json?q=" + searchTerm;
        console.log(url);
        /*
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                },
                error: function() {
                console.log("error");
                }
            });
        */

    });










