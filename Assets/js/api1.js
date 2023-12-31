function runSearch() {
  var searchTerm = $('#searchTerms').val();
  localStorage.setItem("searchTerm", searchTerm);
  searchTerm = searchTerm.replace(/ /g, '+');
  
  //FOR REFACTOR, EXTRACT THIS AS ITS OWN FUNCTION?
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

        function createBookList(books) {
          var searchResults = $("#searchresults");
          searchResults.empty();
          //FOORLOOP FOR SEARCH RESULTS
          $.each(books, async function(index, book) { 
            try {
            var bookDiv = $("<div>");
            var bookTitle = book.title;
            var bookAuthor = book.author_name[0];
            var bookPublishedYear = book.publish_year[0];
            var bookPublisher = book.publisher[0];
            var bookISBN = book.isbn[0];
            var bookCover = book.cover_i;
            var bookLanguage = book.language[0];
            var bookEbook = book.ebook_access;
            var bookCoverImg = $("<img>");
            var bookTitleH3 = $("<h3>");
            var bookAuthorP = $("<p>");
            var bookPublishedYearP = $("<p>");
            var bookPublisherP = $("<p>");
            var bookISBNP = $("<p>");
            var bookLanguageP = $("<p>");
            var bookEbookP = $("<p>");
            var bookPrices = $("<a>");
            // add class for tailwind styling
            bookPrices.addClass("bookPrices text-blue-400 hover:text-blue-600 underline"); //The API2 will pull the ISBNs later targeting the isbn stored in the purchase element
            bookDiv.addClass("p-2 w-48 h-99 overflow-hidden bg-slate-100 hover:bg-slate-200 flex-row border border-gray-300 rounded-lg shadow");
            bookTitleH3.addClass("underline")
            bookPrices.attr("data-isbn", bookISBN);
            bookAuthorP.text("Author: " + bookAuthor);
            bookTitleH3.text("Title: " + bookTitle);
            bookPublishedYearP.text("Year published: " + bookPublishedYear);
            bookPublisherP.text("Publisher: " + bookPublisher);
            bookISBNP.text("ISBN: " +bookISBN);
            bookLanguageP.text("Language: " + bookLanguage);
            bookEbookP.text("E-book: " + bookEbook);
            bookPrices.text("Loading store offers...");
            if (bookCover == null){
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
            bookPrices.appendTo(bookDiv);
            //final append finished, book div to search results
            bookDiv.appendTo(searchResults);
         } catch (error) { console.log(book, error);
          }  
      });
        setISBNs(); //THIS IS WHERE API2 IS CALLED
    };
};

function setISBNs() {
  var isbnelements = document.querySelectorAll(".bookPrices");
  $.each(isbnelements, function(index, element) {
    var isbn = isbnelements[index].getAttribute("data-isbn");
        var url = "https://atlnettech.com/api.php?type=buy&isbn=" + isbn;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: async function(data) {
              var stringbuilder = "";
              console.log(data.result.offers.booksrun);
              if(data.result.offers.booksrun.new != "none") {
                stringbuilder = stringbuilder + "<a href='"+ data.result.offers.booksrun.new.cart_url +"'>Buy new for $" + data.result.offers.booksrun.new.price + "</a>\r\n";
              }
              if(data.result.offers.booksrun.used != "none") {
                stringbuilder = stringbuilder + "<a href='"+ data.result.offers.booksrun.used.cart_url +"'>Buy used for $" + data.result.offers.booksrun.used.price + "</a>\r\n";
              }
              if (stringbuilder == "") { stringbuilder = "No store offers found."; }
              $(isbnelements[index]).html(stringbuilder);         
            },
            error: function() {
            console.log("error");
            }
          });
  });
}
//SEARCH WITH ENTER KEY FUNCTION.
// Get the input field
var input = document.getElementById("searchTerms");
// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action
    event.preventDefault();
    // Trigger the button element with a click
    $("#searchBtn").click();
  }
});

function setPrices(url, priceObject) {
  console.log(url);
  try {
    var newbook = priceObject.new ?? "";
    var newPrice = newbook.price ?? 0; 
    var newCartUrl = newbook.cart_url ?? "";
    var booksrunValues = [ newbook, newPrice, newCartUrl];
  } catch (error) {  };
return booksrunValues;
};

if(localStorage.getItem("searchTerm") != undefined) {
  $('#searchTerms').val( localStorage.getItem("searchTerm"));
  runSearch();
}

$('#searchBtn').on('click', function(event) {
  event.preventDefault();
  runSearch();
});