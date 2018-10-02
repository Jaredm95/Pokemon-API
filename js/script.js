/*
File Name: script.js
Programmer: Jared Martinez
Project: Pokemon API Vue JS
Date: 9/1/2018
*/
document.addEventListener("DOMContentLoaded", () => {
    /* Vue App */

    /* Variables */

    // Object for storing variables
    const data = {}
    data.currentYear = new Date().getFullYear();
    data.search = '';

    /* Functions */

    // Object for storing functions
    const methods = {}

    /* Components */

    // Object fot storing components
    const components = {}

    components.search = {
        data: () => {
            return data;
        },
        template: `<input type='text' placeholder='Search here..'>`
    }
    // Vue Instance for main app
    const pokeApp = new Vue({
        el: '#pokeApp',
        data: data,
        methods: methods,
        components: {
            'search-area': components.search
        }
    });
});