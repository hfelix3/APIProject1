
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
                replacedImage(data);
          });
            } else {
              console.log('Error: ' + response.statusText);
            }
          })

          // TODO: ADD FOR LOOP TO REPLACE IMAGE RESULTS
          //REPLACING FIRST IMAGE BOX
          function replacedImage(data) {
          var rigthSideImageone = document.getElementById("image1");
          var coverId = data.docs[0].cover_i;
          var bookCover = "https://covers.openlibrary.org/b/id/"+ coverId +"-L.jpg"

          fetch(bookCover, {
            method: 'GET'
          })
          .then(function(response) {
            if (response.ok) {
              response.json()
              rigthSideImageone.setAttribute('src', bookCover);
            } else {
              console.log('Error: ' + response.statusText);
            }
          })
        };

});










