
$('#searchBtn').on('click', function(event) {
  event.preventDefault();

  var searchTerm = $('#searchTerms').val();
  searchTerm = searchTerm.replace(/ /g, '+');


  //FOR REFACTOR, EXTRACT THIS AS ITS OWN FUNCTION
  var url = "https://openlibrary.org/search.json?q=" + searchTerm;
  console.log(url);  //TODO REMOVE CONSOLE LOG

      fetch(url, {
          method: 'GET'
        })
          .then(function(response) {
            if (response.ok) {
              response.json()
          .then(function(data) {
                console.log(data);
                //TODO for each result, create a new row
                //createImage(data);
                createBookList(data.docs);
          });
            } else {
              console.log('Error: ' + response.statusText);
            }
          })

          // TODO: ADD FOR LOOP TO REPLACE IMAGE RESULTS
          //REPLACING FIRST IMAGE BOX
          function createImage(coverId) {
          //var rigthSideImageone = document.getElementById("image1");
          //var coverId = data.docs[0].cover_i;
          var bookCover = "https://covers.openlibrary.org/b/id/"+ coverId +"-L.jpg"

          fetch(bookCover, {
            method: 'GET'
          })
          .then(function(response) {
            if (response.ok) {
              response.json()
              //rigthSideImageone.setAttribute('src', bookCover);
              return bookCover;
            } else {
              console.log('Error: ' + response.statusText);
            }
          })
        };


        function createBookList(books) {
          var searchResults = $("#searchresults");
          searchResults.empty();
          
          
          $.each(books, function(index, book) { 

            try { //DO NOT LEARN TRY BLOCKS

            var bookDiv = $("<div>");

            var bookTitle = book.title;
            var bookAuthor = book.author_name[0];
            var bookPubilishedYear = book.publish_year[0];
            var bookPublisher = book.publisher[0];
            var bookISBN = book.isbn[0];
            var bookCover = book.cover_i;
            var bookLanguage = book.language[0];
            var bookEbook = book.ebook_access;
            
            var bookCoverImg = $("<img>");
            var bookTitleH3 = $("h3");
            var bookAuthorP = $("<p>");
            var bookPubilishedYearP = $("<p>");
            var bookPublisherP = $("<p>");
            var bookISBNP = $("<p>");
            var bookLanguageP = $("<p>");
            var bookEbookP = $("<p>");

            //TODO: assign variable into elements
            bookAuthorP.text(bookAuthor);
            bookCoverImg.attr("src", "https://covers.openlibrary.org/b/id/"+ bookCover +"-L.jpg");
            

            //append elemts to bookdiv
            bookCoverImg.appendTo(bookDiv);
            bookAuthorP.appendTo(bookDiv);
            //final append finished, bookdiv to searchresults
            bookDiv.appendTo(searchResults);














            } catch (error) {}  // DON'T LEARN THIS
            


            // console.log(index, book.title);
            // console.log(index, book.author_name[0]);
            // console.log(index, book.publish_year[0]);
            // console.log(index, book.publisher[0]);
            // console.log(index, book.ebook_access);
            // console.log(index, book.isbn[0]);
            // console.log(index, book.cover_i);
            // console.log(index, book.language[0]);

          }

          )};

});










