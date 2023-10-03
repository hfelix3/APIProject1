
    $('#searchBtn').on('click', function(event) {
        event.preventDefault();

        var searchTerm = $('#searchTerms').val();
        searchTerm = searchTerm.replace(/ /g, '+');

        var url = "https://openlibrary.org/search.json?q=" + searchTerm;
        console.log(url);

            fetch(url, {
                method: 'GET'
              })
                .then(function(response) {
                  if (response.ok) {
                    response.json()
                .then(function(data) {
                      console.log(data);
                });
                  } else {
                    console.log('Error: ' + response.statusText);
                  }
                })

    });










