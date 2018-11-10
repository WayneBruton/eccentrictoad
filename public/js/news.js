$(function(){
    const newsURL = `https://newsapi.org/v2/top-headlines?sources=medical-news-today&apiKey=dcb1aad26e88428385fb0916aaa983b2`;
    axios.get(newsURL)
        .then(response => {
            const newsData = response.data.articles;
            console.log(newsData);
            newsData.forEach(article => {
                let title = article.title;
                let description = article.description;
                let url = article.url;
                let urlToImage = article.urlToImage;
                let cardHolder = `<div class="p-2 bd-highlight test">
                                    <div class="card" style="width: 18rem;">
                                    <img class="card-img-top" src="${urlToImage}" alt="Card image cap">
                                    <div class="card-body">
                                    <h5 class="card-title">${title}</h5>
                                    <p class="card-text">${description}</p>
                                    <a href="${url}" class="btn btn-primary" target="blank">Read..</a>
                                    </div>
                                    </div>
                                    </div>`;
                $(cardHolder).appendTo('#newsCard');
            });    
        })
        .catch(response => {
            let cardHolder = `<div class="p-2 bd-highlight test">
                                    <div class="card" style="width: 18rem;">
                                    <div class="card-body">
                                    <h5 class="card-title">Connection Error</h5>
                                    <p class="card-text">Connection error</p>
                                    <a href="#" class="btn btn-primary">Try again later</a>
                                    </div>
                                    </div>
                                    </div>`;
                $(cardHolder).appendTo('#newsCard');
                $('.alert').css("display", "block");

            
        }); 
});
