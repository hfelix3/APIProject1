# Book Search and Buy

We are implementing two different API endpoints.  First we're using OPENLIBRARY.ORG to search for books.
This search is wide open, so it does title, author, subject, series, etc.  We are not forcing you to select individual search APIs

This API call to search is actually more than one.
The search call pulls up 100 items per page, and we used FETCH to pull this data.
The second call happens when displaying each book, and that's to pull the cover image.

((Insert screenshot))


The second API we are using is BOOKSRUN.COM.  This is only using the ISBN to pull a few bits of data.
Can we purchase this book directly, can we rent it, at what prices, etc.  Additionally if you can purchase it
we will include a link to purchase through an affiliate link

This API call I opted to try AJAX instead.

((Insert screenshot))


Upon clicking the search button the whole list of items is redrawn.

When returning to the page, it will re-initialize your search.


## User Story

As a Book Search and Buy user I want to be able to search books by their title, and easily purchase the book through an online retailer

## Acceptance Criteria

Given a search box
When I search for a book title I should get a list of relevant results
Then I should be able to open the listing for purchase through an online retailer.
