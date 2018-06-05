/* Index Page */

// Function for collecting the value of the user search
function getSearchValue() {
    let value = document.getElementById("search").value; // Getting the value of the search
    let i; // Counter
    // Loop for making sure the search isn't just space
    for (i = 0; i < value.length; i++) {
        if (value.charAt(i) != " " && value.charAt(0) != " ") { // If the character isn't blank, and the starting character isn't blank 
            break; // Break out of the loop
        }
    } // End loop
    if (i != value.length) { // If the counter is not equal to the length of the search
        callingPokemon(value); // Calling the API
    } else { // If the counter is the same amount of the search length
        document.getElementById('errorMess').innerHTML = "Please Enter a valid search"; // Displaying Error Message
    }
}
// Function for calling the Pokemon API for the inital Search
function callingPokemon(poke) {
    // https://pokeapi.co/ <-- Pokemon api
    let xhr = new XMLHttpRequest(); // XML Request
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/?limit=949", true); // Requesting all the pokemon in the database
    xhr.send(); // sending the request
    xhr.onreadystatechange = function () { // When the API ready state changes
        if (this.readyState === this.DONE) { // The API is done do stuff
            let pokeObject = JSON.parse(xhr.responseText); // Variable for the JSON 
            searchingForPoke(poke, pokeObject); // Calling the search function
        }
    }
}
// function for searching for the Pokemon
function searchingForPoke(poke, pokeObject) {
    // Loop for checking and replacing the spaces of a search with dashes
    for (let i = 0; i < poke.length; i++) {
        poke = poke.replace(" ", "-");
    } // End of loop
    let pokemon = poke.toLowerCase(); // Variable for the Pokemon name that was searched
    let x = 0;
    // Loop for searching the results of the API call and comparing them to the search
    while (pokemon != pokeObject.results[x].name && x < pokeObject.results.length - 1) {
        x++; // Add the counter 
    }
    if (x < pokeObject.results.length - 1) { // Calling the Search page 
        window.location = "search.html?=" + pokemon;
    } else { // Displaying the error message and the suggestion list
        document.getElementById('errorMess').innerHTML = "Can't find that Pokemon <br> did you mean:"; // Displaying the error message
        let firstLetter = pokemon.charAt(0); // Variable for the first letter of the search
        let suggestionList = document.getElementById('here'); // Variable for the suggestion list
        suggestionList.innerHTML = " ";
        // Loop for searching the Object for suggestions
        for (let i = 0; i < pokeObject.results.length; i++) {
            if (pokeObject.results[i].name.charAt(0) == firstLetter) { // If the first letter of the Pokemon and the first letter of the search match, then do this stuff
                let pokeSuggest = document.createElement("li"); // Variable for the list item
                let pokeLink = document.createElement("a"); // Variable for the anchor tag
                pokeLink.setAttribute("href", "search.html?=" + pokeObject.results[i].name); // Setting the link to go to the Pokemon
                pokeLink.innerHTML = pokeObject.results[i].name; // Setting the link to display the pokemon
                pokeSuggest.appendChild(pokeLink); // Putting the link in the List Item
                suggestionList.appendChild(pokeSuggest); // Putting the List Item in the List
            } // End of Loop
        }
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
    let value = document.getElementById("search").value; // Getting the value of the search
    let i; // Counter
    // Loop for making sure the value isn't just spaces
    for (i = 0; i < value.length; i++) {
        if (value.charAt(i) != " " && value.charAt(0) != " ") { // If the character isn't a space, and the starting character isn't a space
            break; // Break out of the loop
        }
    } // End of Loop
    if (i != value.length) { // If the counter isn't the same amount as the search length
        callingPokemonSearch(value); // Calling the API
    } else { // If the counter is as the same amount of the search length
        document.getElementById('errorMess').innerHTML = "Please Enter a valid search"; // Displaying Error Message
    }
}
// Function for checking the results of the search on the results page
function searchingForPokeSearch(poke, pokeObject) {
    // Loop for checking and replacing the spaces of a search with dashes
    for (let i = 0; i < poke.length; i++) {
        poke = poke.replace(" ", "-");
    } // End of loop
    let pokemon = poke.toLowerCase(); // Variable for the Pokemon name that was searched
    let x = 0; // Counter
    // Loop for searching the results of the API call and comparing them to the search
    while (pokemon != pokeObject.results[x].name && x < pokeObject.results.length - 1) {
        x++; // Add the counter 
    }
    if (x < pokeObject.results.length - 1) { // Calling the Search page 
        window.location = "search.html?=" + pokemon;
    } else { // Displaying the error message and the suggestion list
        document.getElementById('errorMess').innerHTML = "Can't find that Pokemon <br> did you mean:"; // Displaying the error message
        let firstLetter = pokemon.charAt(0); // Variable for the first letter of the search
        let suggestionList = document.getElementById('here'); // Variable for the suggestion list
        suggestionList.innerHTML = " ";
        let y = 0; // Secondary counter
        document.getElementsByTagName("header")[0].setAttribute("class", "errHeader"); // Setting the header to the Error header
        // Loop for searching the Object for suggestions
        for (let i = 0; i < pokeObject.results.length; i++) {
            if (pokeObject.results[i].name.charAt(0) == firstLetter) { // If the first letter of the Pokemon and the first letter of the search match, then do this stuff
                let pokeSuggest = document.createElement("li"); // Variable for the list item
                let pokeLink = document.createElement("a"); // Variable for the anchor tag
                pokeLink.setAttribute("href", "search.html?=" + pokeObject.results[i].name); // Setting the link to go to the Pokemon
                pokeLink.innerHTML = pokeObject.results[i].name; // Setting the link to display the pokemon
                pokeSuggest.appendChild(pokeLink); // Putting the link in the List Item
                suggestionList.appendChild(pokeSuggest); // Putting the List Item in the List
                y++; // Add the second counter
                if (y == 10) { // Check to see if the second counter is 10
                    break; // Break out of the loop
                }
            } // End of Loop
        }
        $("#here").slideDown("slow"); // Slide the suggestion list is down
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
    let xhr = new XMLHttpRequest(); // XML Request
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/?limit=949", true); // Requesting all the pokemon in the database
    xhr.send(); // sending the request
    xhr.onreadystatechange = function () { // when the ready state of the call changes do this
        if (this.readyState === this.DONE) { // If the ready state is done do stuff
            let pokeObject = JSON.parse(xhr.responseText); // Variable for the JSON
            searchingForPokeSearch(poke, pokeObject); // Calling the Loading page function
        }
    }
}
// Function for calling the API with the search from the index page
function initPokemon() {
    let pokemon = document.URL.substring(document.URL.indexOf('=') + 1); // Variable for grabbing the pokemon in the URL after the =

    let xhr = new XMLHttpRequest(); // XML Request
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/", true); // Requesting all the pokemon in the database
    xhr.send(); // sending the request
    xhr.onreadystatechange = function () { // when the ready state of the call changes do this
        if (this.readyState === this.DONE) { // If the ready state is done do stuff
            let pokeObject = JSON.parse(xhr.responseText); // Variable for the JSON
            loadingPokemon(pokeObject); // Calling the Loading page function
        }
    }
    getYear(); // Calling the function for displaying the year
}
// Function for populating the page with information on the searched pokemon
function loadingPokemon(pokeObject) {
    // Calling the function that loads the image
    loadingImages(pokeObject);
    // Calling the function that loads the title
    loadingTitle(pokeObject);
    // Calling the function that loads the Stats
    loadingStats(pokeObject);
    // Calling the function that loads the moveset
    loadingMoveset(pokeObject);
    // Calling the function that loads the games
    loadingGames(pokeObject);

    let pokemonVersion = pokeObject.species.url; // Variable for the URL of the Pokemon Species
    // Calling the function that loads the games
    initGame(pokemonVersion);
}
// Function for calling the API with the game version
function loadingVersion(pokeObject) {
    // Calling the function that loads the description
    loadingDesc(pokeObject);
    let evo = pokeObject.evolution_chain.url; // Variable for the URL for the Evo list
    initEvo(pokeObject, evo); // Calling the initEvo function 
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
function loadingEvolution(evolution, pokemon) {
    let pokeColor = pokemon.color.name; // Making the evolution links the color of the pokemon
    if (evolution.chain.evolves_to.length > 1) { // If the Pokemon can evolve to multiple Pokemon then do this stuff
        document.getElementById("evoTitle").style.display = "block"; // Display the Evolution Title
        let evoList = document.getElementById("evo"); // Variable for the Evolutions section
        /* Starting Pokemon */
        let baseState = document.createElement("li"); // Variable for the first List Item
        let linkOne = document.createElement("a"); // Variable for the first Anchor
        linkOne.innerHTML = evolution.chain.species.name; // Filling the Anchor text with the starting Pokemon
        linkOne.setAttribute("href", "search.html?=" + evolution.chain.species.name); // Linking the anchor text with the starting Pokemon
        linkOne.style.color = pokeColor;
        baseState.appendChild(linkOne); // Filling the first List Item with the anchor
        evoList.appendChild(baseState); // Displaying the first List Item
        for (let x = 0; x < evolution.chain.evolves_to.length; x++) { // Loop for displaying all the Pokemon it Evolves too
            let evoOne = document.createElement("li"); // Variable for the List Item
            let evoLink = document.createElement("a"); // Vairbale for the Anchor tag
            evoLink.innerHTML = evolution.chain.evolves_to[x].species.name; // Filling the Anchor Tag  with the evolution of the Pokemon
            evoLink.setAttribute("href", "search.html?=" + evolution.chain.evolves_to[x].species.name); // Linking the Anchor Tag to the Pokemon
            evoLink.style.color = pokeColor;
            evoOne.appendChild(evoLink); // Putting the Pokemon in the List Item
            evoList.appendChild(evoOne); // Displaying the List Item
        } // End of Loop

    } else if (evolution.chain.evolves_to.length > 0) { // If the pokemon evolves into one Pokemon then do this stuff
        document.getElementById("evoTitle").style.display = "block"; // Displaying the Evolution Title
        let evoList = document.getElementById("evo"); // Variable for the Evolutions Section
        let baseStat = document.createElement("li"); // Variable for the First List Item 
        let linkOne = document.createElement("a"); // Variable for the List Item
        let pokeColor = pokemon.color.name;
        /* Starting Pokemon */
        linkOne.innerHTML = evolution.chain.species.name;
        linkOne.setAttribute("href", "search.html?=" + evolution.chain.species.name);
        linkOne.style.color = pokeColor;
        baseStat.appendChild(linkOne);
        evoList.appendChild(baseStat); // Displaying the first List Item 
        /* Evolution One */
        let linkTwo = document.createElement("a");
        let evoOne = document.createElement("li");
        linkTwo.innerHTML = evolution.chain.evolves_to["0"].species.name; // Filling the Second List Item with the name of the First Evolution of Pokemon
        linkTwo.setAttribute("href", "search.html?=" + evolution.chain.evolves_to["0"].species.name);
        linkTwo.style.color = pokeColor;
        evoOne.appendChild(linkTwo);
        evoList.appendChild(evoOne); // Displaying the First Evolution
        /* Evolution Two */
        if (evolution.chain.evolves_to[0].evolves_to.length > 0) { // IF there is an Evolution after the first Evolution then do this stuff
            let linkThree = document.createElement("a");
            let evoTwo = document.createElement("li");
            linkThree.innerHTML = evolution.chain.evolves_to["0"].evolves_to["0"].species.name; // Filling the Third List Item with the Name of second Evolution
            linkThree.setAttribute("href", "search.html?=" + evolution.chain.evolves_to["0"].evolves_to["0"].species.name);
            linkThree.style.color = pokeColor;
            evoTwo.appendChild(linkThree);
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
        document.getElementById('versionsTitle').style.display = "none"; // Making the Title not display
    }
}
// Function for loading the Games the Pokemon is in
function initGame(pokemonID) {
    let xhr = new XMLHttpRequest(); // XML Request
    xhr.open("GET", pokemonID, true); // Requesting all the pokemon in the database
    xhr.send(); // sending the request
    xhr.onreadystatechange = function () { // when the ready state of the call changes do this
        if (this.readyState === this.DONE) { // If the ready state is done do stuff
            let pokeObject = JSON.parse(xhr.responseText); // Variable for the JSON
            loadingVersion(pokeObject); // Calling the Loading page function
        }
    }
}
// Function for loading the Evolution of the Pokemon
function initEvo(object, pokemonID) {
    let xhr = new XMLHttpRequest(); // XML Request
    xhr.open("GET", pokemonID, true); // Requesting all the pokemon in the database
    xhr.send(); // sending the request
    xhr.onreadystatechange = function () { // when the ready state of the call changes do this
        if (this.readyState === this.DONE) { // If the ready state is done do stuff
            let pokeObject = JSON.parse(xhr.responseText); // Variable for the JSON
            loadingEvolution(pokeObject, object); // Calling the Loading page function
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
