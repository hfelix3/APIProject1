
$('#searchBtn').on('click', function(event) {
  event.preventDefault();

  var searchTerm = $('#searchTerms').val();
  searchTerm = searchTerm.replace(/ /g, '+');


  //FOR REFACTOR, EXTRACT THIS AS ITS OWN FUNCTION
  var url = "https://openlibrary.org/search.json?title=" + searchTerm;
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

          //REPLACING FIRST IMAGE BOX WITH SEARCH RESULTS
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
          
          //FOORLOOP FOR SEARCH RESULTS
          $.each(books, function(index, book) { 

            try { //DO NOT LEARN TRY BLOCKS

            var bookDiv = $("<div class='p-2 w-48 h-99 overflow-hidden bg-slate-100 hover:bg-slate-200 flex-row border border-gray-300 rounded-lg shadow'>");

            var bookTitle = book.title;
            var bookAuthor = book.author_name[0];
            var bookPublishedYear = book.publish_year[0];
            var bookPublisher = book.publisher[0];
            var bookISBN = book.isbn[0];
            var bookCover = book.cover_i;
            var bookLanguage = book.language[0];
            var bookEbook = book.ebook_access;
            
            var bookCoverImg = $("<img>");
            var bookTitleH3 = $("<h3 class='underline flex flex-wrap'>");
            var bookAuthorP = $("<p>");
            var bookPublishedYearP = $("<p>");
            var bookPublisherP = $("<p>");
            var bookISBNP = $("<p>");
            var bookLanguageP = $("<p>");
            var bookEbookP = $("<p>");

            //TODO: assign variable into elements
            bookAuthorP.text(bookAuthor);
            bookTitleH3.text(bookTitle);
            bookPublishedYearP.text(bookPublishedYear);
            bookPublisherP.text(bookPublisher);
            bookISBNP.text(bookISBN);
            bookLanguageP.text(bookLanguage);
            bookEbookP.text(bookEbook);

            if (bookCover == null){
              console.log("notworking");
              bookCoverImg.attr("src", "https://www.press.uillinois.edu/books/images/no_cover.jpg");
            } else {
              bookCoverImg.attr("src", "https://covers.openlibrary.org/b/id/"+ bookCover +"-M.jpg");

            }
            

            //append elements to book div
            bookCoverImg.appendTo(bookDiv);
            bookTitleH3.appendTo(bookDiv);
            bookAuthorP.appendTo(bookDiv);
            bookPublishedYearP.appendTo(bookDiv);
            bookPublisherP.appendTo(bookDiv);
            bookISBNP.appendTo(bookDiv);
            bookLanguageP.appendTo(bookDiv);
            bookEbookP.appendTo(bookDiv);
            //final append finished, book div to search results
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

//SEARCH WITH ENTER KEY FUNCTION
// Get the input field
var input = document.getElementById("searchTerms");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("searchBtn").click();
  }
});