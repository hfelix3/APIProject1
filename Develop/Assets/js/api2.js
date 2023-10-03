$(document).ready(function() {
    $('#search').on('click', function() {
        
    
        var isbn = $('#isbn').val();
        var url = "https://betweengameactions.com/api.php?type=buy&isbn=" + isbn;
    
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                setPrices(data.result.offers.booksrun);
            },
            error: function() {
            console.log("error");
            }
        });
    
    });
    
    function setPrices(priceObject) {
        var used = priceObject.used;
        var usedPrice = used.price;
        var usedCartUrl = used.cart_url;
        var newbook = priceObject.new;
        var newPrice = newbook.price;
        var newCartUrl = newbook.cart_url;
        var rent = priceObject.rent;
        var shipping = priceObject.shipping;
        var ebook = priceObject.ebook;
        var ebookCartUrl = ebook.cart_url;
        var ebookPrice = ebook.price;
        
        if(used) {
            console.log("Buy it used for $" + usedPrice);
            console.log(usedCartUrl);
        }
        if(newbook) {
            console.log("Buy this new for $" + newPrice);
            console.log(newCartUrl);
        }
        if(rent) {
            for(var item in rent) {
                console.log("Rent this item for $" + rent[item].price);
                console.log(rent[item].cart_url);
            }
        }   
        if(ebook) {
            console.log(ebookPrice);
        }   
    
    }
    
    
    });