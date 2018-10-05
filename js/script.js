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
    data.placeHolder = '';

    /* Functions */

    // Object for functions
    const methods = {}

    // Function for checking user search
    methods.userSearch = () => {
        (data.search.length != 0)? methods.findSearch(): methods.badSearch();
    }

    methods.findSearch = () => {
        for(let i = 0; i < data.pokemon.results.length; i++){
            if(data.search == data.pokemon.results[i].name){
                methods.foundPokemon(data.pokemon.results[i].url);
                break;
            } 
        }
    }

    methods.getPokemon = () => {
        $.getJSON('https://pokeapi.co/api/v2/pokemon/', (response) => {
            data.pokemon = response; 
        });
    }

    methods.apiCall = (url) => {
        console.log(url);
        $.getJSON(url, (res)  => {
            console.log(res);
            data.placeHolder = res;
        });
    }

    methods.foundPokemon = (url) => {
        console.log(url);
        methods.apiCall(url);
        while(data.placeHolder == ''){
            console.log('hello');
        }
        methods.populatePage();
    }

    methods.populatePage = () => {
        console.log(data.pokemon);
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