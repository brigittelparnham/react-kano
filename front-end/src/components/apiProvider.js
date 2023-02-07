import React from 'react';

export class ApiClient{

    url;
    token;

    constructor(_url){
        this.url = _url;
        this.token = localStorage.getItem(`kano-test-app-token`);
    }

    async loginUser(username,password){

        const headers = {
            'Content-Type': 'application/json'
        };

        const resp = await fetch(
        `${this.url}/login`, {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers
        });
        this.token = await resp.text();
        localStorage.setItem(`kano-test-app-token`, this.token);
        return this.token;
    }

    /**
     * 
     * Gets an array of feed items with reactions
     * This will be a secure route so jwt needs to be provided in the header
     * 
     */
    async getFeed(){

    }
}

const ApiContext =  React.createContext({});

export const ApiProvider = ApiContext.Provider;
export default ApiContext;