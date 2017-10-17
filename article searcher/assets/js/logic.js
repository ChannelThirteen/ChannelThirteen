    function showResults(){
    console.log("inside showResults function")
    var search = $("#search-input").val();
    var fromDate = $("#fromDate").val();
    var toDate = $("#toDate").val();
    var queryURL;
    var query2URL;    
        if(search !== null){
            if((fromDate === null || fromDate === "") && (toDate === null || toDate === "")){
                queryURL = "https://content.guardianapis.com/search?q=" + search + "&api-key=4c3b66fa-bd94-4809-9a76-6837f3a9dace";
                query2URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + "&api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931"
                // console.log("1");
                // console.log(fromDate);
                // console.log(toDate);
            } 
            else if((toDate === null || toDate === "") && (fromDate !== null || fromDate !== "")){
                queryURL = "https://content.guardianapis.com/search?q=" + search + "&from-date=" + fromDate + "&api-key=4c3b66fa-bd94-4809-9a76-6837f3a9dace";
                query2URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + "&begin_date=" + fromDate + "&api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
                // console.log("2");
                // console.log(fromDate);
                // console.log(toDate);
            } 
            else if((fromDate === null || fromDate === "") && (toDate !== null || toDate !== "")){
                queryURL = "https://content.guardianapis.com/search?q=" + search + "&to-date=" + toDate + "&api-key=4c3b66fa-bd94-4809-9a76-6837f3a9dace";
                query2URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + "&end_date=" + toDate + "&api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
            //  console.log("3");         
            //  console.log(fromDate);
                // console.log(toDate);
            } 
            else{
                queryURL = "https://content.guardianapis.com/search?q=" + search + "&from-date=" + fromDate + "&to-date=" + toDate + "&api-key=4c3b66fa-bd94-4809-9a76-6837f3a9dace";
                query2URL  = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + "&begin_date=" + fromDate + "&end_date=" + toDate + "&api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931"
                // console.log("4");
                // console.log(fromDate);
                // console.log(toDate);
            }
        }else {
            $("#data-goes-here").html("Search field is empty!");
        }
            $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(anything) {
                // console.log("Call was made");
                for (var i = 0; i < 3; i++) {
                        $("#data-goes-here").append("<h2>" + anything.response.results[i].webTitle + "</h2><br>"
                    + anything.response.results[i].webPublicationDate + "<br>"
                    + "<a target='_blank' href=" + anything.response.results[i].webUrl + ">" + anything.response.results[i].webUrl + "</a><br><br>");
                }
            });
                $.ajax({
              url: query2URL,
              method: "GET"
            }).done(function(status) {
                // console.log("call 2 was made");
                for (var j = 0; j < 3; j++) {    
                    $("#data2-goes-here").append("<h2>" + status.response.docs[j].snippet + "</h2><br>"
                    + status.response.docs[j].pub_date + "<br>"
                    + "<a target='_blank' href=" + status.response.docs[j].web_url + ">" + status.response.docs[j].web_url + "</a><br><br>");
                }
            });
//closing function
    }
    $("#submit").on("click", function(event){
        event.preventDefault();
        // console.log("button was clicked");
        clear();
        showResults();
    }); //closing on click
    $("#search-input").keypress(function(event) {
        console.log("this is the search input", event);
        if (event.which == 13) {
            event.preventDefault(); 
            clear();
            showResults();
        }
    });
    function clear(){
        console.log("clear")
        $("#data-goes-here").empty();
        $("#data2-goes-here").empty();
    }