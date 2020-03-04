class Quote {

    constructor(quote, author, source) {
        this._quote = quote;
        this._author = author;
        this._source = source;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    getQuote() {
        let quotes = [
            {
                "quote": "No one belongs here more than you",
                "author": "Brené Brown",
                "source": "Braving the Wilderness"
            },
            {
                "quote": "Qui court deux lievres a la fois, n’en prend aucun",
                "author": "Unknown",
                "source": "French Proverb"
            },
            {
                "quote": "Petit a petit, l’oiseau fait son nid",
                "author": "Unknown",
                "source": "French Proverb"
            },
            {
                "quote": "Imagine others complexly",
                "author": "John Green",
                "source": "ALAN Conference"
            },
            {
                "quote": "You are an aperture through which the universe is looking at and exploring itself",
                "author": "Alan W Watts",
                "source": ""
            },
            {
                "quote": "You're under no obligation to be the same person you were 5 minutes ago",
                "author": "Alan W Watts",
                "source": ""
            },
            {
                "quote": "The way to get started is to quit talking and begin doing",
                "author": "Walt Disney",
                "source": ""
            },
            {
                "quote": "You never fail until you stop trying",
                "author": "Albert Einstein ",
                "source": ""
            },
            {
                "quote": "The universe is always conspiring for your good",
                "author": "Lexie Burton-Brown",
                "source": ""
            }
            // {
            //     "quote": "",
            //     "author": "",
            //     "source": ""
            // }
        ];

        let randomQuote = quotes[this.getRandomInt(0, quotes.length)];
        let quoteValues = Object.values(randomQuote);
        document.getElementById('quote-text').innerHTML = quoteValues[0];
        if (quoteValues[2] === "") {
            document.getElementById('quote-author').innerHTML = quoteValues[1];
        } else {
            document.getElementById('quote-author').innerHTML = quoteValues[1] + ", <em>" + quoteValues[2] + "</em>";
        }
    }

}
