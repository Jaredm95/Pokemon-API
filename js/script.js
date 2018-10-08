/*
File Name: script.js
Programmer: Jared Martinez
Project: Pokemon API Vue JS
Date: 9/1/2018
*/

// Event listener
$(() => {
    /* Variables */

    // Object for variables
    const data = {}
    data.currentYear = new Date().getFullYear();
    data.search = ''; 
    data.results = '';
    data.callType = '';
    data.searchType = '';

    /* Functions */

    // Object for functions
    const methods = {}

    // Function for gathering all of the pokemon
    methods.getPokemon = () => {
        $.getJSON('https://pokeapi.co/api/v2/pokemon/', (response) => {
                data.results = response; 
        });
    }

    // Function for when a user searches
    methods.userSearch = () => {
        (data.search.length != 0)? methods.findSearch(): methods.badSearch();
    }

    // Functions for validating a user search
    methods.findSearch = () => {
        for(let i = 0; i < data.results.results.length; i++){
            if(data.search == data.results.results[i].name){
                data.callType = 'pokemon';
                methods.apiCall(data.results.results[i].url);
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
        data.results = stuff;
        data.callType = 'species';
        methods.apiCall(stuff.species.url);
    }

    // Function for showing the data of the second API call of a search
    methods.secondCallInfo = (stuff) => {
        console.log(stuff);
        data.searchType = 'pokemon';    
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

    components.resultsPokemon = {
        data: () =>{
            return data;
        },
        methods: methods,
        template: `
        <section id="results" v-if="searchType == 'pokemon'">
            <h2>{{results.name}}</h2>
            <div>
            </div>
        </section> 
        `
    }

    /* Vue App */

    // Vue Instance for main app
    const pokeApp = new Vue({
        el: '#pokeApp',
        data: data,
        methods: methods,
        components: {
            'search-area': components.search,
            'results-pokemon': components.resultsPokemon,
        },
        mounted: methods.getPokemon()
    });
});