$(document).ready(function() {
    
        
    //function getSalesData(isbn) {
        var returnData = async function(isbn) {
            var url = "https://betweengameactions.com/api.php?type=buy&isbn=" + isbn;
            console.log(url);
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: async function(data) {
                    var a = await setPrices(data.result.offers.booksrun);
                    return a;
                },
                error: function() {
                console.log("error");
                }
                });
        
                }
                //return returnData();
        
        

        console.log("shit");
        //console.log(getSalesData("9780133594140"));
        console.log(returnData("9780133594140"));
    
    });




    function setPrices(priceObject) {
        var used = priceObject.used;
        var usedPrice = used.price;
        var usedCartUrl = used.cart_url;
        var newbook = priceObject.new;
        var newPrice = newbook.price;
        var newCartUrl = newbook.cart_url;
        var rent = priceObject.rent;
        var booksrunValues = [ newbook, newPrice, used, usedPrice, rent, newCartUrl];

        return booksrunValues;

    };


   