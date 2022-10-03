//Get quotes from aoi Aynchormously
const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader")


//Show Loader
 function loading(){
   loader.hidden= false;
   quoteContainer.hidden = true;
 }

function complete(){
    
    loader.hidden= true;
    quoteContainer.hidden = false;
    
}

let quotes = []
//Show New Quote
function newQuote(){
    loading();
    const quote = quotes[Math.floor(Math.random()*quotes.length)]
    //console.log(quote)

    // To check if Author is empty
if(!quote.author){
    authorText.textContent = "Anonymous";
}else{
    authorText.textContent = quote.author;
}
//If quote is long change the for size

if(quote.text.length>50){
    quoteText.classList.add('long-quote');
    
}
else{
    quote.classList.remove('long-quote');
}

     //Set quote and hide loader
     quoteText.textContent = quote.text;
     complete();
}

async function getQuote(){
    loading();
    const URL = "https://type.fit/api/quotes"
    try {
        const response =  await fetch(URL);
        //console.log(response) //It is a type pf object
        quotes = await response.json();
        //console.log(quotes)
        newQuote()
        
    } catch (error) {
        //Error
    }
}

//To get tweet quote
function tweetQuote(){
const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`
window.open(twitterUrl,' _blank');

}
//Event Listners
twitterBtn.addEventListener('click',tweetQuote);
newQuoteBtn.addEventListener('click',newQuote);


getQuote();
