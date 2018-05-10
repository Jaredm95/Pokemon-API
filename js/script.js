/* Index Page */

// Function for collecting the value of the user search
function getSearchValue() {
    let value = document.getElementById("search").value; // Getting the value of the search

    searchingForPoke(value); // Calling the function that searchs the API results

}

// Function for calling the Pokemon API for the inital Search
function callingPokemon() {
    // https://pokeapi.co/ <-- Pokemon api

    let xhr = new XMLHttpRequest(); // XML Request
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/?limit=949&offset=0", false); // Requesting all the pokemon in the database
    xhr.send(); // sending the request
    console.log(xhr.status); // Logging the status of the request
    let pokeObject = JSON.parse(xhr.responseText); // Declaring a variable for the JSON object 
    console.log(pokeObject); // Logging the object 

    return pokeObject; // returning the JSON results
}

// function for searching for the Pokemon
function searchingForPoke(poke) {
    // Loop for checking and replacing the spaces of a search with dashes
    for (let i = 0; i < poke.length; i++) {
        poke = poke.replace(" ", "-");
    } // End of loop
    let pokemon = poke.toLowerCase(); // Variable for the Pokemon name that was searched
    let pokeObject = callingPokemon(); // Calling the Function that calls the Pokemon API
    let x = 0;
    // Loop for searching the results of the API call and comparing them to the search
    while (pokemon != pokeObject.results[x].name && x < pokeObject.results.length - 1) {
        x++; // Add the counter 
    }
    if (x < pokeObject.results.length - 1) { // Calling the Search page 
        window.location = "search.html?=" + pokemon;
    } else { // Displaying the error message
        document.getElementById("here").innerHTML = "Search Not found";
    }

}

/* Search Results Page */

// Function for calling the API with the search from the index page
function initPokemon() {
    let pokemon = document.URL.substring(document.URL.indexOf('=') + 1); // Variable for grabbing the pokemon in the URL after the =

    let xhr = new XMLHttpRequest(); // XML Request
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/", false); // Requesting all the pokemon in the database
    xhr.send(); // sending the request
    console.log(xhr.status); // Logging the status of the request
    let pokeObject = JSON.parse(xhr.responseText); // Declaring a variable for the JSON object 
    console.log(pokeObject); // Logging the object

    loadingPage(pokeObject); // calling the function that populates the page
}

// Function for populating the page with information on the searched pokemon
function loadingPage(pokeObject) {

    let pokemonVersion = pokeObject.species.url; // Variable for the URL of the Pokemon Species
    let pokemon = gettingMoreInfo(pokemonVersion); // Calling the Function that Calls the API with the URL for the Pokemon Species

    let pokemonEvo = pokemon.evolution_chain.url; // Variable for the URL of the Pokemon Evolution 
    let evolution = gettingMoreInfo(pokemonEvo); // Calling the Function that calls the API with the URL for the Pokemon Evolution

    /* Images */

    let spriteOne = document.getElementById("spriteOne"); // Variable for the first picture
    let spriteTwo = document.getElementById("spriteTwo"); // Variable for the second picture
    let spriteThree = document.getElementById("spriteThree"); // Variable for the third picture
    let spriteFour = document.getElementById("spriteFour"); // Variable for the forth picture

    spriteOne.src = pokeObject.sprites.front_default; // Pulling in image one
    spriteTwo.src = pokeObject.sprites.front_shiny; // pulling in image two
    spriteThree.src = pokeObject.sprites.back_default; // pulling in image three
    spriteFour.src = pokeObject.sprites.back_shiny; // Pulling in image four

    /* Title */

    let title = document.getElementById("title") // variable for the main title of the page

    let pokeName = pokeObject.name; // Variable for the Pokemon Name

    title.innerHTML = pokeName.charAt(0).toUpperCase() + pokeName.slice(1); // Displaying the Name of the Pokemon Searched, with the first letter uppercase.

    /* Description */

    // document.getElementById("desc").innerHTML = pokemon.flavor_text_entries[1].flavor_text; // Displaying the EN Description of the Pokemon
    for (let x = 0; x < pokemon.flavor_text_entries.length; x++) {
        if (pokemon.flavor_text_entries[x].language.name == "en") {
            document.getElementById("desc").innerHTML = pokemon.flavor_text_entries[x].flavor_text;
            break;
        }
    }

    /* Moves */

    let moveset = document.getElementById("moves"); // Variable for the moveset section of the page

    // Loop for displaying the moveset of the Pokemon
    for (let x = 0; x < pokeObject.moves.length; x++) {
        let pokeMove = document.createElement("li"); // Variable for the p tag holding the Pokemon move
        pokeMove.innerHTML = pokeObject.moves[x].move.name; // Providing the move name to the p tag
        moveset.appendChild(pokeMove); // displaying the p tag in the moveset section
    } // Loop ends when the moves run out

    /* Stats */

    let stats = document.getElementById("stats"); // Variable for the stats section

    // Loop for displaying the Stats
    for (let x = 0; x < pokeObject.stats.length; x++) {
        let pokeStat = document.createElement("li"); // Variable for the List Items 
        pokeStat.innerHTML = pokeObject.stats[x].stat.name + ": " + pokeObject.stats[x].base_stat; // Filling the List items with 

        stats.appendChild(pokeStat); // Displaying 
    } // Loop ends when stats runs out

    /* Evolution */
    if (evolution.chain.evolves_to.length > 1) {
        document.getElementById("evoTitle").style.display = "block";
        let evoList = document.getElementById("evo");
        /* Starting Pokemon */
        let baseState = document.createElement("li");
        baseState.innerHTML = evolution.chain.species.name;
        evoList.appendChild(baseState);
        for (let x = 0; x < evolution.chain.evolves_to.length; x++) {
            let evoOne = document.createElement("li");
            evoOne.innerHTML = evolution.chain.evolves_to[x].species.name;
            evoList.appendChild(evoOne);
        }

    } else if (evolution.chain.evolves_to.length > 0) {
        document.getElementById("evoTitle").style.display = "block";
        let evoList = document.getElementById("evo");
        /* Starting Pokemon */
        let baseState = document.createElement("li");
        baseState.innerHTML = evolution.chain.species.name;
        evoList.appendChild(baseState);
        /* Evolution One */
        let evoOne = document.createElement("li");
        evoOne.innerHTML = evolution.chain.evolves_to["0"].species.name;
        evoList.appendChild(evoOne);
        /* Evolution Two */
        if (evolution.chain.evolves_to[0].evolves_to.length > 0) {
            let evoTwo = document.createElement("li");
            evoTwo.innerHTML = evolution.chain.evolves_to["0"].evolves_to["0"].species.name;
            evoList.appendChild(evoTwo);
        }
    } else {
        document.getElementById('evoTitle').style.display = "none";
    }
}

// Function for calling the API with new URL's, used fo gathering additional information that isn't in the original JSON object
function gettingMoreInfo(pokemonID) {
    let xhr = new XMLHttpRequest(); // XML Request
    xhr.open("GET", pokemonID, false); // Requesting all the pokemon in the database
    xhr.send(); // sending the request
    console.log(xhr.status); // Logging the status of the request
    let pokeObject = JSON.parse(xhr.responseText); // Declaring a variable for the JSON object 
    console.log(pokeObject); // Logging the object

    return pokeObject; // Returning the JSON data
}

// Function for setting the date in the footer
function getYear() {
    let d = new Date();
    document.getElementById("bottom").innerHTML = d.getFullYear();
}
