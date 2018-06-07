/* Index Page */

// Function for collecting the value of the user search
function getSearchValue() {
    /* Variables */
    let value = document.getElementById("search").value; 
    let i; 
    
    /* Checking that the Search isn't just a space */
    for (i = 0; i < value.length; i++) {
        if (value.charAt(i) != " " && value.charAt(0) != " ") { 
            break; 
        }
    } 
    if (i != value.length) { 
        callingPokemon(value); // Calling the API
    } else { 
        document.getElementById('errorMess').innerHTML = "Please Enter a valid search"; // Displaying Error Message
    }
}
// Function for calling the Pokemon API for the inital Search
function callingPokemon(poke) {
    /* Variables */
    let pokeObject;
    
    /* XML Request */
    let xhr = new XMLHttpRequest(); 
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/?limit=949", true); 
    xhr.send(); // sending the request
    xhr.onreadystatechange = function () { 
        if (this.readyState === this.DONE) { 
            pokeObject = JSON.parse(xhr.responseText); 
            searchingForPoke(poke, pokeObject);
        }
    }
}
// function for searching for the Pokemon
function searchingForPoke(poke, pokeObject) {
    /* Variables */
    let x;
    let pokemon;

    /* Replacing the spaces with dashes */
    for (let i = 0; i < poke.length; i++) {
        poke = poke.replace(" ", "-");
    } 
    pokemon = poke.toLowerCase(); 

    /* Checking if the Search is a Pokemon */
    for(x = 0; x < pokeObject.results.length; x++){
        if(pokeObject.results[x].name == pokemon){
            break;
        }
    }
    if (x < pokeObject.results.length) {
        window.location = "search.html?=" + pokemon;
    } else {
        /* Variables */
        let firstLetter = pokemon.charAt(0);
        let suggestionList = document.getElementById('here');

        document.getElementById('errorMess').innerHTML = "Can't find that Pokemon <br> did you mean:"; // Error Message 
        suggestionList.innerHTML = " "; // Clearing Suggestion List
        
        /* Checking for suggestions */
        for (let i = 0; i < pokeObject.results.length; i++) {
            if (pokeObject.results[i].name.charAt(0) == firstLetter) { 
                let pokeSuggest = document.createElement("li");
                let pokeLink = document.createElement("a"); 
                pokeLink.setAttribute("href", "search.html?=" + pokeObject.results[i].name); 
                pokeLink.innerHTML = pokeObject.results[i].name;
                pokeSuggest.appendChild(pokeLink); 
                suggestionList.appendChild(pokeSuggest);
            }
        }
        // Sliding the Suggestion list down #ThxjQuery 
        $('#here').slideDown("slow");
    }

}
// Function for removing the error message
function removingEMessage() {
    $('#here').slideUp("slow"); // Sliding up the Suggestion list
    document.getElementById('errorMess').innerHTML = " "; // Setting Error Message to nothing
    document.getElementById('here').innerHTML = " "; // Setting the suggestion list to nothing
}
/* -------- Search Results Page -------- */

// Function for getting the search on the Results page
function getSearch() {
    /* Variables */
    let value = document.getElementById("search").value; 
    let i; 
    
    /* making sure the value isn't just spaces */
    for (i = 0; i < value.length; i++) {
        if (value.charAt(i) != " " && value.charAt(0) != " ") { 
            break; 
        }
    } 
    if (i != value.length) { 
        callingPokemonSearch(value); // Calling the API
    } else { 
        document.getElementById('errorMess').innerHTML = "Please Enter a valid search"; // Displaying Error Message
    }
}
// Function for checking the results of the search on the results page
function searchingForPokeSearch(poke, pokeObject) {
    /* Variables */
    let pokemon;
    let x;

    /* Replacing the spaces of a search with dashes */
    for (let i = 0; i < poke.length; i++) {
        poke = poke.replace(" ", "-");
    } 
    pokemon = poke.toLowerCase(); // Variable for the Pokemon name that was searched

    // Loop for searching the results of the API call and comparing them to the search
    for(x = 0; x < pokeObject.results.length; x++){
        if(pokeObject.results[x].name == pokemon){
            break;
        }
    }
    if (x < pokeObject.results.length) { 
        window.location = "search.html?=" + pokemon;
    } else { 
        /* Variables */
        let firstLetter = pokemon.charAt(0);
        let suggestionList = document.getElementById('here');
        let y = 0;

        document.getElementById('errorMess').innerHTML = "Can't find that Pokemon <br> did you mean:"; // Error Message
        suggestionList.innerHTML = " "; // Clearing the lists
        document.getElementsByTagName("header")[0].setAttribute("class", "errHeader"); // Changing the header to the Error Header
        
        /* Getting suggestions */
        for (let i = 0; i < pokeObject.results.length; i++) {
            if (pokeObject.results[i].name.charAt(0) == firstLetter) { 
                let pokeSuggest = document.createElement("li"); 
                let pokeLink = document.createElement("a"); 
                pokeLink.setAttribute("href", "search.html?=" + pokeObject.results[i].name); 
                pokeLink.innerHTML = pokeObject.results[i].name; 
                pokeSuggest.appendChild(pokeLink); 
                suggestionList.appendChild(pokeSuggest); 
                y++; 
                if (y == 10) { 
                    break; 
                }
            } 
        }
        $("#here").slideDown("slow"); // Sliding the suggestion list is down #ThxjQuery
    }
}
// Function for removing the Suggestions on the results page
function removingList() {
    // Calling the function that removes the list
    removingEMessage();
    document.getElementsByTagName("header")[0].setAttribute("class", "alt"); // Setting the header on the results page to the alt class
}
// Function for calling the API for the list of all the Pokemon
function callingPokemonSearch(poke) {
    /* Variables */
    let pokeObject;

    /* XML Request */
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/?limit=949", true); 
    xhr.send(); 
    xhr.onreadystatechange = function () { 
        if (this.readyState === this.DONE) { 
            pokeObject = JSON.parse(xhr.responseText); 
            searchingForPokeSearch(poke, pokeObject); 
        }
    }
}
// Function for calling the API with the search from the index page
function initPokemon() {
    /* Variables */
    let pokeObject;
    let pokemon = document.URL.substring(document.URL.indexOf('=') + 1); 

    /* XML Request */
    let xhr = new XMLHttpRequest(); 
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/", true); 
    xhr.send(); 
    xhr.onreadystatechange = function () { 
        if (this.readyState === this.DONE) { 
            pokeObject = JSON.parse(xhr.responseText); 
            loadingPokemon(pokeObject);
        }
    }
    getYear(); // Calling the function for displaying the year
}
// Function for populating the page with information on the searched pokemon
function loadingPokemon(pokeObject) {
    /* Calling Functions */
    loadingImages(pokeObject);
    loadingTitle(pokeObject);
    loadingStats(pokeObject);
    loadingMoveset(pokeObject);
    loadingGames(pokeObject);

    /* Calling the Game Section */
    let pokemonVersion = pokeObject.species.url; 
    initGame(pokemonVersion);
}
// Function for calling the API with the game version
function loadingVersion(pokeObject) {
    loadingDesc(pokeObject); // Calling the function that loads the description
    let evo = pokeObject.evolution_chain.url; // Variable for the URL for the Evo list
    initEvo(pokeObject, evo); // Calling the initEvo function 
}
// Function for loading the images
function loadingImages(pokeObject) {
    /* Variables */
    let spriteOne = document.getElementById("spriteOne"); 
    let spriteTwo = document.getElementById("spriteTwo"); 
    let spriteThree = document.getElementById("spriteThree"); 
    let spriteFour = document.getElementById("spriteFour");

    /* Loading Images */
    if (pokeObject.sprites.front_default != null) {  
        spriteOne.src = pokeObject.sprites.front_default; 
    } else { 
        spriteOne.style.display = "none"; 
    }
    if (pokeObject.sprites.front_shiny != null) { 
        spriteTwo.src = pokeObject.sprites.front_shiny;
    } else { 
        spriteTwo.style.display = "none"; 
    }
    if (pokeObject.sprites.back_default != null) { 
        spriteThree.src = pokeObject.sprites.back_default; 
    } else { 
        spriteThree.style.display = "none"; 
    }
    if (pokeObject.sprites.back_shiny != null) { 
        spriteFour.src = pokeObject.sprites.back_shiny; 
    } else { 
        spriteFour.style.display = "none"; 
    }
}
// Function for loading the Title
function loadingTitle(pokeObject) {
    /* Variables */
    let title = document.getElementById("title") 
    let pokeName;

    /* Checking Name of Pokemon */
    if (pokeObject.name != null) { 
        pokeName = pokeObject.name; 

        /* Replacing Dashes with spaces */
        for (let y = 0; y < pokeName.length; y++) {
            pokeName = pokeName.replace("-", " "); 
        } 

        title.innerHTML = pokeName; 
    } else { 
        title.style.display = "none"; 
    }
}
// Function for loading the description
function loadingDesc(pokemon) {
    /* Variables */
    let x; 
    
    /* Finding the English Description of the Pokemon */
    for (x = 0; x < pokemon.flavor_text_entries.length; x++) {
        if (pokemon.flavor_text_entries[x].language.name == "en") { 
            document.getElementById("desc").innerHTML = pokemon.flavor_text_entries[x].flavor_text; 
            break; 
        } 
    } 
    if (x == pokemon.flavor_text_entries.length) { 
        document.getElementById("desc").style.display = "none"; 
    }
}
// Function for loading the moveset
function loadingMoveset(pokeObject) {
    /* Checking if there is moves */
    if (pokeObject.moves.length != 0) { 
        /* Variables */
        let moveset = document.getElementById("moves"); 

        /* Displaying the moves */
        for (let x = 0; x < pokeObject.moves.length; x++) {
            /* Variables */
            let pokeMove = document.createElement("li"); 
            let moveName = pokeObject.moves[x].move.name; 
            
            /* Replacing the dashes with spaces */
            for (let i = 0; i < moveName.length; i++) {
                moveName = moveName.replace("-", " "); 
            } 
            pokeMove.innerHTML = moveName; 
            moveset.appendChild(pokeMove); 
        } 
    } else { 
        document.getElementById('moveTitle').style.display = "none"; // Making the section not display
    }
}
// Function for loading the stats of the Pokemon
function loadingStats(pokeObject) {
    /* Variables */
    let stats = document.getElementById("stats"); 

    /* Checking if there is Stats for the Pokemon */
    if (pokeObject.stats.length != 0) { 
        
        /* Displaying the Stats */ 
        for (let x = 0; x < pokeObject.stats.length; x++) {
            /* List Item for the Stat */
            let pokeStat = document.createElement("li"); 
            pokeStat.innerHTML = pokeObject.stats[x].stat.name + ": " + pokeObject.stats[x].base_stat; 
            stats.appendChild(pokeStat); 

            /* Meter for the Stat */
            let statMeter = document.createElement("meter"); 
            statMeter.min = 0; 
            statMeter.max = 255; 
            statMeter.value = pokeObject.stats[x].base_stat; 
            stats.appendChild(statMeter); 
        } 
    } else { 
        document.getElementById('statTitle').style.display = "none"; // Making the title of the stats section not display
    }

}
// Function for loading the Evolution
function loadingEvolution(evolution, pokemon) {
    /* Variables */
    let pokeColor = pokemon.color.name; 

    /* Checking the Evoltion Chain */
    if (evolution.chain.evolves_to.length > 1) { 
        /* Variables */ 
        let evoList = document.getElementById("evo"); 
        let baseState;
        let linkOne;

        document.getElementById("evoTitle").style.display = "block"; // Displaying the section title

        /* Starting Pokemon */
        baseState = document.createElement("li"); 
        linkOne = document.createElement("a"); 
        linkOne.innerHTML = evolution.chain.species.name; 
        linkOne.setAttribute("href", "search.html?=" + evolution.chain.species.name); 
        linkOne.style.color = pokeColor;
        baseState.appendChild(linkOne); 
        evoList.appendChild(baseState);

        /* Displaying all the Pokemon it can evolve to */ 
        for (let x = 0; x < evolution.chain.evolves_to.length; x++) { 
            let evoOne = document.createElement("li"); 
            let evoLink = document.createElement("a"); 
            evoLink.innerHTML = evolution.chain.evolves_to[x].species.name; 
            evoLink.setAttribute("href", "search.html?=" + evolution.chain.evolves_to[x].species.name); 
            evoLink.style.color = pokeColor;
            evoOne.appendChild(evoLink); 
            evoList.appendChild(evoOne); 
        } 

    } else if (evolution.chain.evolves_to.length > 0) { 
        /* Variables */
        let evoList = document.getElementById("evo"); 
        let baseStat = document.createElement("li"); 
        let linkOne = document.createElement("a"); 
        let pokeColor = pokemon.color.name;
        let linkTwo = document.createElement("a");
        let evoOne = document.createElement("li");

        document.getElementById("evoTitle").style.display = "block"; // Displaying the Evolution Title

        /* Starting Pokemon */
        linkOne.innerHTML = evolution.chain.species.name;
        linkOne.setAttribute("href", "search.html?=" + evolution.chain.species.name);
        linkOne.style.color = pokeColor;
        baseStat.appendChild(linkOne);
        evoList.appendChild(baseStat); 

        /* Evolution One */
        linkTwo.innerHTML = evolution.chain.evolves_to["0"].species.name; 
        linkTwo.setAttribute("href", "search.html?=" + evolution.chain.evolves_to["0"].species.name);
        linkTwo.style.color = pokeColor;
        evoOne.appendChild(linkTwo);
        evoList.appendChild(evoOne); 

        /* Evolution Two */
        if (evolution.chain.evolves_to[0].evolves_to.length > 0) {
            /* Variables */
            let linkThree = document.createElement("a");
            let evoTwo = document.createElement("li");

            /* Evolution Two */
            linkThree.innerHTML = evolution.chain.evolves_to["0"].evolves_to["0"].species.name; 
            linkThree.setAttribute("href", "search.html?=" + evolution.chain.evolves_to["0"].evolves_to["0"].species.name);
            linkThree.style.color = pokeColor;
            evoTwo.appendChild(linkThree);
            evoList.appendChild(evoTwo); 

            /* Shouldn't need another conditional Statement for third Evolutions */
        } 
    } else { 
        document.getElementById('evoTitle').style.display = "none"; // Making the Evolution Title not display
    } 
}
// Function for loading the Game Versions
function loadingGames(pokeObject) {
    /* Variables */
    let games = document.getElementById("versions"); 

    /* Checking if there are Games */
    if (pokeObject.game_indices.length != 0) { 
       
        /* Displaying the Games the Pokemon Appears in */
        for (let x = 0; x < pokeObject.game_indices.length; x++) {
            let version = document.createElement("li"); 
            let game = pokeObject.game_indices[x].version.name; 
            
            /* Replacing the dashes with spaces */
            for (let i = 0; i < game.length; i++) {
                game = game.replace("-", " "); 
            } 
            version.innerHTML = game;
            games.appendChild(version); 
        }
    } else { 
        document.getElementById('versionsTitle').style.display = "none"; // Making the Title not display
    }
}
// Function for loading the Games the Pokemon is in
function initGame(pokemonID) {
    /* XML Request */
    let xhr = new XMLHttpRequest();
    xhr.open("GET", pokemonID, true);
    xhr.send();
    xhr.onreadystatechange = function () { 
        if (this.readyState === this.DONE) { 
            let pokeObject = JSON.parse(xhr.responseText); 
            loadingVersion(pokeObject);
        }
    }
}
// Function for loading the Evolution of the Pokemon
function initEvo(object, pokemonID) {
    /* XML Request */
    let xhr = new XMLHttpRequest();
    xhr.open("GET", pokemonID, true);
    xhr.send();
    xhr.onreadystatechange = function () { 
        if (this.readyState === this.DONE) {
            let pokeObject = JSON.parse(xhr.responseText); 
            loadingEvolution(pokeObject, object); 
        }
    }
}
// Function for setting the date in the footer
function getYear() {
    let d = new Date(); // Variable for the a Date object
    document.getElementById("bottom").innerHTML = d.getFullYear(); // Displaying the current year
}
// Function for Displaying the sections after it is clicked
function display(section) {
    $("#" + section + "Box").slideDown("slow"); // Sliding the box down
    document.getElementById(section + "Arrow").setAttribute("class", "fas fa-chevron-up"); // setting the arrow to up
    document.getElementById(section + "Title").setAttribute("onclick", "dontDisplay(" + '"' + section + '"' + ");"); // setting the title to call the dontDisplay function
}
// Function for Displaying the sections after it is clicked
function dontDisplay(section) {
    $("#" + section + "Box").slideUp("slow"); // Sliding the box up
    document.getElementById(section + "Arrow").setAttribute("class", "fas fa-chevron-down"); // setting the arrow to down
    document.getElementById(section + "Title").setAttribute("onclick", "display(" + '"' + section + '"' + ");"); // Setting the title to call the display function
}
