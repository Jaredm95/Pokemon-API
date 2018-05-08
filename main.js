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
    let spriteOne = document.getElementById("spriteOne"); // Variable for the first picture
    let spriteTwo = document.getElementById("spriteTwo"); // Variable for the second picture
    let spriteThree = document.getElementById("spriteThree"); // Variable for the third picture
    let spriteFour = document.getElementById("spriteFour"); // Variable for the forth picture

    spriteOne.src = pokeObject.sprites.front_default; // Pulling in image one
    spriteTwo.src = pokeObject.sprites.front_shiny; // pulling in image two
    spriteThree.src = pokeObject.sprites.back_default; // pulling in image three
    spriteFour.src = pokeObject.sprites.front_shiny; // Pulling in image four

    let title = document.getElementById("title") // variable for the main title of the page

    let pokeName = pokeObject.name; // Variable for the Pokemon Name

    title.innerHTML = pokeName.charAt(0).toUpperCase() + pokeName.slice(1); // Displaying the Name of the Pokemon Searched, with the first letter uppercase.

    let moveset = document.getElementById("moves"); // Variable for the moveset section of the page

    // Loop for displaying the moveset of the Pokemon
    for (let x = 0; x < pokeObject.moves.length; x++) {
        let pokeMove = document.createElement("li"); // Variable for the p tag holding the Pokemon move
        pokeMove.innerHTML = pokeObject.moves[x].move.name; // Providing the move name to the p tag
        moveset.appendChild(pokeMove); // displaying the p tag in the moveset section
    } // Loop ends when the moves run out
    let stats = document.getElementById("stats");

    for (let x = 0; x < pokeObject.stats.length; x++) {
        let pokeStat = document.createElement("li");
        pokeStat.innerHTML = pokeObject.stats[x].stat.name + ": " + pokeObject.stats[x].base_stat;

        stats.appendChild(pokeStat);
    }
}

// Function for calling the Pokemon API
function callingPokemon() {
    // https://pokeapi.co/ <-- Pokemon api

    var xhr = new XMLHttpRequest(); // XML Request
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/?limit=1000&offset=0", false); // Requesting all the pokemon in the database
    xhr.send(); // sending the request
    console.log(xhr.status); // Logging the status of the request
    var pokeObject = JSON.parse(xhr.responseText); // Declaring a variable for the JSON object 
    console.log(pokeObject); // Logging the object 

    return pokeObject; // returning the JSON results
}

// Function for collecting the value of the user search
function getSearchValue() {

    var value = document.getElementById("search").value; // Getting the value of the search

    searchingForPoke(value); // Calling the function that searchs the API results

}

// function for searching for the Pokemon
function searchingForPoke(poke) {

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
