import React from 'react';

export class ApiClient{

    url;
    token;
    feed;

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
    async getFeed() {
        const headers = {
            "Authorization": "JWT" + this.token
        }

        const response = await fetch(`${this.url}/feed`, {
            method: "GET",
            headers
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
       
        }).catch(function (error) {
            console.log("request failed", error);
        });


        this.feed = await response;

        return this.feed;

    }
}

const ApiContext =  React.createContext({});

export const ApiProvider = ApiContext.Provider;
export default ApiContext;