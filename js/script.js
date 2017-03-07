// Mixing jQuery and Node.js code in the same file? Yes please!

$(function() {

    // Display some statistics about this computer, using node's os module.

    var os = require('os');
    var prettyBytes = require('pretty-bytes');
    var shell = require('shell');


    $('.stats').append('Number of cpu cores: <span>' + os.cpus().length + '</span>');
    $('.stats').append('Free memory: <span>' + prettyBytes(os.freemem()) + '</span>');
    $('.copyrights').append('</br>https://newsapi.org/ | Haswin Vidanage</span>');
    // Electron's UI library. We will need it for later.

    var ulSites = $('.flipster1 ul');
    var ul = $('.flipster2 ul');

    var apiKey = "cdceec8cb0684d8d98ce4503d5989969";
    //hdv edit

    var site = "techcrunch";
    var yql = "";



    // var sites = [
    //     ["BBC", "http://i.newsapi.org/bbc-news-m.png"],
    //     ["Techcrunch", "http://i.newsapi.org/techcrunch-m.png"]
    // ];

    var sites = [
        { name: "BBC", image: "http://i.newsapi.org/bbc-news-m.png", url: "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=" + apiKey },
        { name: "Techcrunch", image: "http://i.newsapi.org/techcrunch-m.png", url: "https://newsapi.org/v1/articles?source=techcrunch&apiKey=" + apiKey },
        { name: "CNN", image: "http://i.newsapi.org/cnn-m.png", url: "https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=" + apiKey },
        { name: "Buzzfeed", image: "http://i.newsapi.org/buzzfeed-m.png", url: "https://newsapi.org/v1/articles?source=buzzfeed&sortBy=top&apiKey=" + apiKey },
        { name: "Google News", image: "http://i.newsapi.org/google-news-m.png", url: "https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=" + apiKey },
        { name: "Newsweek", image: "http://i.newsapi.org/newsweek-m.png", url: "https://newsapi.org/v1/articles?source=newsweek&sortBy=top&apiKey=" + apiKey },
        { name: "Reuters", image: "http://i.newsapi.org/reuters-m.png", url: "https://newsapi.org/v1/articles?source=reuters&sortBy=top&apiKey=" + apiKey }

    ];

    for (i = 0; i < sites.length; i++) {
        populateMenu(sites[i].name, sites[i].image);
    }
    // Initialize the flipster plugin.

    $('.flipster1').flipster({
        style: 'carousel'
    });

    // When an article is clicked, open the page in the system default browser.
    // Otherwise it would open it in the electron window which is not what we want.

    $('.flipster1').on('click', 'a', function(e) {

        e.preventDefault();

        showLoader();
        ulSites.remove(); //remove the menu

        var obj = sites.filter(function(obj) {
            return obj.name === e.target.text;
        })[0];

        yql = obj.url;
        onSiteSelected();

    });


    function onSiteSelected() {
        $.getJSON(yql, function(response) {
            var res = $(response);


            //populate method runs for each element
            response.articles.forEach(populate);
            // console.log("-----------Title Population---------");

            // Initialize the flipster plugin.

            $('.flipster2').flipster({
                style: 'carousel'
            });

            // When an article is clicked, open the page in the system default browser.
            // Otherwise it would open it in the electron window which is not what we want.

            $('.flipster2').on('click', 'a', function(e) {

                e.preventDefault();

                // Open URL with default browser.
                shell.openExternal(e.target.href);

            });

        }, "jsonp");
    }


    function populate(article, index) {

        hideLoader();
        var li = $('<li><img /><a target="_blank"></a></li>');
        li.find('a')
            .attr('href', article.url)
            .text(article.title);

        li.find('img').attr('src', article.urlToImage);

        li.appendTo(ul);


    }


    function populateMenu(name, image) {
        hideLoader();
        var li = $('<li><img /><a target="_blank"></a></li>');
        li.find('a')
            .attr('href', name)
            .text(name);
        li.find('img').attr('src', image);
        li.appendTo(ulSites);

    }

    function hideLoader() {
        $('#loader').hide();
    }

    function showLoader() {
        $('#loader').show();
    }
});