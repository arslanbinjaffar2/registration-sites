import React from "react";
import ReactDOM from "react-dom";
import App from "app/App";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./i18n";
import { Provider } from "react-redux";
import { ltrim, store } from 'helpers';

let path = ltrim(window.location.pathname, "/");

let params = path.split("/");

async function loadEvent(url) {
    const response = await fetch(`${process.env.REACT_APP_URL}/event/${url}`);
    const json = await response.json();
    if (json.data !== undefined) {
        store.dispatch({ type: "event-info", event: json.data });
        document.title = json.data.name;
    }
    return json;
}

loadEvent(params.length >= 1 ? params[0] : '').then(response => {
    if (response.data && response.data !== undefined) {
        ReactDOM.render(<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>, document.getElementById('root'));
    } else {
        ReactDOM.render("", document.getElementById('root'));
    }
    registerServiceWorker();
    return response;
});

