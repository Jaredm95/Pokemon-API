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
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/?limit=949", false); // Requesting all the pokemon in the database
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

/* -------- Search Results Page -------- */

// Function for calling the API with the search from the index page
function initPokemon() {
    let pokemon = document.URL.substring(document.URL.indexOf('=') + 1); // Variable for grabbing the pokemon in the URL after the =

    let xhr = new XMLHttpRequest(); // XML Request
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/", false); // Requesting all the pokemon in the database
    xhr.send(); // sending the request
    console.log(xhr.status); // Logging the status of the request
    let pokeObject = JSON.parse(xhr.responseText); // Declaring a variable for the JSON object 
    console.log(pokeObject); // Logging the object
    
    getYear(); // Calling the function for displaying the year
    loadingPage(pokeObject); // calling the function that populates the page
}

// Function for populating the page with information on the searched pokemon
function loadingPage(pokeObject) {

    let pokemonVersion = pokeObject.species.url; // Variable for the URL of the Pokemon Species
    let pokemon = gettingMoreInfo(pokemonVersion); // Calling the Function that Calls the API with the URL for the Pokemon Species

    let pokemonEvo = pokemon.evolution_chain.url; // Variable for the URL of the Pokemon Evolution 
    let evolution = gettingMoreInfo(pokemonEvo); // Calling the Function that calls the API with the URL for the Pokemon Evolution

    /* Images */
    loadingImages(pokeObject); // Calling the Function for loading the images

    /* Title */
    loadingTitle(pokeObject); // Calling the Function for loading the Title

    /* Description */
    loadingDesc(pokemon); // Calling the Function for loading the description

    /* Moves */
    loadingMoveset(pokeObject); // Calling the Function for loading the moveset 

    /* Stats */
    loadingStats(pokeObject); // Calling the Function for loading the Stats

    /* Evolution */
    loadingEvolution(evolution); // Calling the Function for loading the Evolution

    /* Game Versions */
    loadingGames(pokeObject); // Calling the Function for loading the Game Versions
}

// Function for loading the images
function loadingImages(pokeObject) {
    let spriteOne = document.getElementById("spriteOne"); // Variable for the first picture
    let spriteTwo = document.getElementById("spriteTwo"); // Variable for the second picture
    let spriteThree = document.getElementById("spriteThree"); // Variable for the third picture
    let spriteFour = document.getElementById("spriteFour"); // Variable for the forth picture

    if (pokeObject.sprites.front_default != null) { // If the picture is there, do this 
        spriteOne.src = pokeObject.sprites.front_default; // Pulling in image one
    } else { // If the picture is not there, do this
        spriteOne.style.display = "none"; // Making the image not display
    }
    if (pokeObject.sprites.front_shiny != null) { // If the picture is there, do this
        spriteTwo.src = pokeObject.sprites.front_shiny; // Pulling in image two
    } else { // If the picture is not there, do this
        spriteTwo.style.display = "none"; // Making the image not display
    }
    if (pokeObject.sprites.back_default != null) { // If the picture is there, do this
        spriteThree.src = pokeObject.sprites.back_default; // Pulling in image three
    } else { // If the picture is not there, do this
        spriteThree.style.display = "none"; // Making the image not display
    }
    if (pokeObject.sprites.back_shiny != null) { // If the picture is there, do this
        spriteFour.src = pokeObject.sprites.back_shiny; // Pulling in image four
    } else { // If the picture is not there, do this
        spriteFour.style.display = "none"; // Making the image not display
    }
}

// Function for loading the Title
function loadingTitle(pokeObject) {
    let title = document.getElementById("title") // Variable for the main title of the page

    if (pokeObject.name != null) { // If the name of the Pokemon is there, do this
        let pokeName = pokeObject.name; // Variable for the name of the Pokemon

        // Loop for replacing the dashes in the Pokemon Name with spaces
        for (let y = 0; y < pokeName.length; y++) {
            pokeName = pokeName.replace("-", " "); // Replace all dashes with spaces
        } // End of loop

        title.innerHTML = pokeName; // Displaying the Name of the Pokemon Searched, with the first letter uppercase.
    } else { // if the name of the Pokemon is not there, do this
        title.style.display = "none"; // Making the title not display
    }
}

// Function for loading the description
function loadingDesc(pokemon) {
    let x; // Variable for the counter
    // Loop for finding the english Flavor Text
    for (x = 0; x < pokemon.flavor_text_entries.length; x++) {
        if (pokemon.flavor_text_entries[x].language.name == "en") { // IF the text is listed as english do this stuff
            document.getElementById("desc").innerHTML = pokemon.flavor_text_entries[x].flavor_text; // Displaying the flavor text
            break; // Breaking out of the Loop
        } // End of IF
    } // End of Loop
    if (x == pokemon.flavor_text_entries.length) { // If there is no en description do this
        document.getElementById("desc").style.display = "none"; // Making the description section not display
    }
}

// Function for loading the moveset
function loadingMoveset(pokeObject) {
    if (pokeObject.moves.length != 0) { // If there is moves, do this stuff
        let moveset = document.getElementById("moves"); // Variable for the moveset section of the page

        // Loop for displaying the moveset of the Pokemon
        for (let x = 0; x < pokeObject.moves.length; x++) {
            let pokeMove = document.createElement("li"); // Variable for the List Item holding the Pokemon move
            let moveName = pokeObject.moves[x].move.name; // Vairable for the move name
            // Loop for replacing the dashes in the name with spaces
            for (let i = 0; i < moveName.length; i++) {
                moveName = moveName.replace("-", " "); // Replace all the dashes with spaces
            } // End of Loop
            pokeMove.innerHTML = moveName; // Providing the move name to the List Item
            moveset.appendChild(pokeMove); // displaying the List Item in the moveset section
        } // Loop ends when the moves run out
    } else { // If there is not moves, do this
        document.getElementById('moveTitle').style.display = "none"; // Making the section not display
    }
}

// Function for loading the stats of the Pokemon
function loadingStats(pokeObject) {
    let stats = document.getElementById("stats"); // Variable for the stats section

    if (pokeObject.stats.length != 0) { // If there is stats, do this
        // Loop for displaying the Stats
        for (let x = 0; x < pokeObject.stats.length; x++) {
            let pokeStat = document.createElement("li"); // Variable for the List Items 
            pokeStat.innerHTML = pokeObject.stats[x].stat.name + ": " + pokeObject.stats[x].base_stat; // Filling the List items with 

            stats.appendChild(pokeStat); // Displaying the Stat
            let statMeter = document.createElement("meter"); // Variable for the Meter tag
            statMeter.min = 0; // Setting the min value of the meter to 0
            statMeter.max = 255; // Setting the max value of the Meter to 255
            statMeter.value = pokeObject.stats[x].base_stat; // Setting the value of the meter

            stats.appendChild(statMeter); // Displaying the meter
        } // Loop ends when stats runs out
    } else { // If there is not stats, do this
        document.getElementById('statTitle').style.display = "none"; // Making the title of the stats section not display
    }

}

// Function for loading the Evolution
function loadingEvolution(evolution) {
    if (evolution.chain.evolves_to.length > 1) { // If the Pokemon can evolve to multiple Pokemon then do this stuff
        document.getElementById("evoTitle").style.display = "block"; // Display the Evolution Title
        let evoList = document.getElementById("evo"); // Variable for the Evolutions section
        /* Starting Pokemon */
        let baseState = document.createElement("li"); // Variable for the first List Item
        baseState.innerHTML = evolution.chain.species.name; // Filling the first List Item with the name of the starting Pokemon
        evoList.appendChild(baseState); // Displaying the first List Item
        for (let x = 0; x < evolution.chain.evolves_to.length; x++) { // Loop for displaying all the Pokemon it Evolves too
            let evoOne = document.createElement("li"); // Variable for the List Item
            evoOne.innerHTML = evolution.chain.evolves_to[x].species.name; // Filling the List Item with the evolution of the Pokemon
            evoList.appendChild(evoOne); // Displaying the List Item
        } // End of Loop

    } else if (evolution.chain.evolves_to.length > 0) { // If the pokemon evolves into one Pokemon then do this stuff
        document.getElementById("evoTitle").style.display = "block"; // Displaying the Evolution Title
        let evoList = document.getElementById("evo"); // Variable for the Evolutions Section
        /* Starting Pokemon */
        let baseState = document.createElement("li"); // Variable for the First List Item 
        baseState.innerHTML = evolution.chain.species.name; // Filling the first List Item with the name of the starting Pokemon 
        evoList.appendChild(baseState); // Displaying the first List Item 
        /* Evolution One */
        let evoOne = document.createElement("li"); // Variable for the Second List Item
        evoOne.innerHTML = evolution.chain.evolves_to["0"].species.name; // Filling the Second List Item with the name of the First Evolution of Pokemon
        evoList.appendChild(evoOne); // Displaying the First Evolution
        /* Evolution Two */
        if (evolution.chain.evolves_to[0].evolves_to.length > 0) { // IF there is an Evolution after the first Evolution then do this stuff
            let evoTwo = document.createElement("li"); // Variable for the Third List Item
            evoTwo.innerHTML = evolution.chain.evolves_to["0"].evolves_to["0"].species.name; // Filling the Third List Item with the Name of second Evolution
            evoList.appendChild(evoTwo); // Displaying the Second Evolution
            // Shouldn't need another conditional Statement for third Evolutions
        } // End of IF Statment
    } else { // End of ELSE IF Statment
        document.getElementById('evoTitle').style.display = "none"; // Making the Evolution Title not display
    } // End of ELSE Statment

}

// Function for loading the Game Versions
function loadingGames(pokeObject) {
    let games = document.getElementById("versions"); // Variable for the Game Versions Section

    if (pokeObject.game_indices.length != 0) { // If the are not in 0 games then do this stuff
        // Loop for displaying the versions of Pokemon the Pokemon appears in
        for (let x = 0; x < pokeObject.game_indices.length; x++) {
            let version = document.createElement("li"); // Variable for the List Item
            let game = pokeObject.game_indices[x].version.name; // Variable for the Game Name
            // Loop for checking the Game name and replacing the dashes with spaces
            for (let i = 0; i < game.length; i++) {
                game = game.replace("-", " "); // Game Name but with spaces
            } // End of Loop
            version.innerHTML = game; // Filling the List Item with the Game Name

            games.appendChild(version); // Displaying the Game Name
        }
    } else { // If they are in 0 games then do this stuff
        document.getElementById('gameTitle').style.display = "none"; // Making the Title not display
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

// Function for Displaying the sections after it is clicked
function display(section) {

    // Long if statement that could probably have been simplified but JavaScript is pissing me off and this works

    if (section == 'stats') { // If the parameter is stats do this stuff
        let area = document.getElementById('stats'); // Variable for the area we are changing
        area.style.display = "block"; // setting the area to display
        let arrow = document.getElementById('statsArrow'); // Vairable for changing the arrow
        arrow.setAttribute("onclick", "dontDisplay('stats');"); // Changing the function that the arrow calls with you click it
        arrow.setAttribute("class", "fas fa-chevron-up"); // Changing the direction of the arrow
    } else if (section == 'evo') { // If the parameter is evo do this stuff
        let area = document.getElementById('evo'); // Variable for the area we are changing
        area.style.display = "block"; // setting the area to display
        let arrow = document.getElementById('evoArrow'); // Vairable for changing the arrow
        arrow.setAttribute("onclick", "dontDisplay('evo');"); // Changing the function that the arrow calls with you click it
        arrow.setAttribute("class", "fas fa-chevron-up"); // Changing the direction of the arrow
    } else if (section == 'moves') { // If the parameter is moves do this stuff
        let area = document.getElementById('moves'); // Variable for the area we are changing
        area.style.display = "block"; // setting the area to display
        let arrow = document.getElementById('movesArrow'); // Vairable for changing the arrow
        arrow.setAttribute("onclick", "dontDisplay('moves');"); // Changing the function that the arrow calls with you click it
        arrow.setAttribute("class", "fas fa-chevron-up"); // Changing the direction of the arrow
    } else if (section == 'versions') { // If the parameter is versions do this stuff
        let area = document.getElementById('versions'); // Variable for the area we are changing
        area.style.display = "block"; // setting the area to display
        let arrow = document.getElementById('versionsArrow'); // Vairable for changing the arrow
        arrow.setAttribute("onclick", "dontDisplay('versions');"); // Changing the function that the arrow calls with you click it
        arrow.setAttribute("class", "fas fa-chevron-up"); // Changing the direction of the arrow
    }
}

// Function for Displaying the sections after it is clicked
function dontDisplay(section) {

    // Long if statement that could probably have been simplified but JavaScript is pissing me off and this works

    if (section == 'stats') { // If the parameter is stats do this stuff
        let area = document.getElementById('stats'); // Variable for the area we are changing
        area.style.display = "none"; // setting the area to not display
        let arrow = document.getElementById('statsArrow'); // Vairable for changing the arrow
        arrow.setAttribute("onclick", "display('stats');"); // Changing the function that the arrow calls with you click it
        arrow.setAttribute("class", "fas fa-chevron-down"); // Changing the direction of the arrow
    } else if (section == 'evo') { // If the parameter is evo do this stuff
        let area = document.getElementById('evo'); // Variable for the area we are changing
        area.style.display = "none"; // setting the area to not display
        let arrow = document.getElementById('evoArrow'); // Vairable for changing the arrow
        arrow.setAttribute("onclick", "display('evo');"); // Changing the function that the arrow calls with you click it
        arrow.setAttribute("class", "fas fa-chevron-down"); // Changing the direction of the arrow
    } else if (section == 'moves') { // If the parameter is moves do this stuff
        let area = document.getElementById('moves'); // Variable for the area we are changing
        area.style.display = "none"; // setting the area to not display
        let arrow = document.getElementById('movesArrow'); // Vairable for changing the arrow
        arrow.setAttribute("onclick", "display('moves');"); // Changing the function that the arrow calls with you click it
        arrow.setAttribute("class", "fas fa-chevron-down"); // Changing the direction of the arrow
    } else if (section == 'versions') { // If the parameter is versions do this stuff
        let area = document.getElementById('versions'); // Variable for the area we are changing
        area.style.display = "none"; // setting the area to not display
        let arrow = document.getElementById('versionsArrow'); // Vairable for changing the arrow
        arrow.setAttribute("onclick", "display('versions');"); // Changing the function that the arrow calls with you click it
        arrow.setAttribute("class", "fas fa-chevron-down"); // Changing the direction of the arrow
    }
}
