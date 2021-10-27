
const quote = document.querySelector("#quote");
const author = document.querySelector("#author");
const quoteContainer = document.querySelector("#quote-container");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector(".new-quote");
const loader = document.querySelector(".loader");
//when page first reloads initialize an index from 0-1642
const initial_index = Math.floor(Math.random() * 1643);


//loader function to show before fetching quote
function loaderFunction(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
 //function to show after data is ready
 function complete(){
     if(!loader.hidden){
         loader.hidden = true;
         quoteContainer.hidden = false;
     }
 }
//get url for api
async function getQuote (index){
    loaderFunction();
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const proxyUrl1 = 'https://api.allorigins.win/raw?url=';
    //this api works
    const quotesApiUrl = 'https://type.fit/api/quotes';

    try{
       
        const response = await fetch(quotesApiUrl);
        const data = await response.json();
        
        quote.textContent = data[index]["text"];

        // if author is blank, add unkown
        if(data[index]["author"] === null){
            author.textContent = 'Unknown';
        }else{
            author.textContent = data[index]["author"];
        }

       
        //reduce font size for long quotes
        if(data[index]["text"].length >= 60){
            quote.classList.add("long-quote");
        }else{
            quote.classList.remove("long-quote"); 
        }
        complete();
    }catch(error){
        console.log(error);
    }
    
}

function tweetQuote(){
    const theAuthor = author.textContent;
    const theQuote = quote.textContent;
    const twitterURL = `https://twitter.com/intent/tweet?text=${theQuote} - ${theAuthor}`;
    window.open(twitterURL,"_blank");
}

//add event listner to the new-quote button
    newQuoteBtn.addEventListener("click",function(){
    //the api has a total of 1643 quotes so pick a random number from 0-1642 as index
        index = Math.floor(Math.random() * 1643);
        getQuote(index);
    
});

//tweet the generated quote via twitter
twitterBtn.addEventListener("click", tweetQuote);
//when the pages loads initially show a quote
getQuote(initial_index);