/*
File Name: script.js
Programmer: Jared Martinez
Project: Pokemon API Vue JS
Date: 9/1/2018
*/

// Event listener for Content loaded
$(() => {
    /* Vue App */

    /* Variables */

    // Object for variables
    const data = {}
    data.currentYear = new Date().getFullYear();
    data.search = ''; 
    data.pokemon = '';
    data.callType = '';

    /* Functions */

    // Object for functions
    const methods = {}

    // Function for checking user search

    // Function for gathering all of the pokemon
    methods.getPokemon = () => {
        $.getJSON('https://pokeapi.co/api/v2/pokemon/', (response) => {
                data.pokemon = response; 
        });
    }

    // Function for when a user searches
    methods.userSearch = () => {
        (data.search.length != 0)? methods.findSearch(): methods.badSearch();
    }

    // Functions for validating a user search
    methods.findSearch = () => {
        for(let i = 0; i < data.pokemon.results.length; i++){
            if(data.search == data.pokemon.results[i].name){
                data.callType = 'pokemon';
                methods.apiCall(data.pokemon.results[i].url);
                break;
            } 
        }
    }

    // Function for making an async API call
    methods.apiCall = (url) => {
        $.getJSON(url, (res)  => {
            methods.populatePage(res);
        });
    }

    // Function for assigning the Object to the proper functions D:
    methods.populatePage = (stuff) => {
        switch(data.callType){
            case 'pokemon':
                methods.firstCallInfo(stuff);
                break;
            case 'species':
                methods.secondCallInfo(stuff);
                break;
            case 'evo':
                methods.evolution(stuff);
                break;
            case 'moves':
                console.log(stuff);
        }
    }

    // Function for showing the data of the first API call of a search
    methods.firstCallInfo = (stuff) => {
        console.log(stuff);
        data.callType = 'species';
        methods.apiCall(stuff.species.url);
    }

    // Function for showing the data of the second API call of a search
    methods.secondCallInfo = (stuff) => {
        console.log(stuff);
        data.callType = 'evo';
        methods.apiCall(stuff.evolution_chain.url);
    }

    methods.evolution = (stuff) => {
        console.log(stuff);
    }
    /* Components */

    // Object for components
    const components = {}

    components.search = {
        data: () => {
            return data;
        },
        methods: methods,
        template: `
        <div>
            <input type="text" placeholder="Search here.." v-model="search">
            <button v-on:click="userSearch()">Search</button>
        </div>
        `
    }

    // Vue Instance for main app
    const pokeApp = new Vue({
        el: '#pokeApp',
        data: data,
        methods: methods,
        components: {
            'search-area': components.search
        },
        mounted: methods.getPokemon()
    });
});