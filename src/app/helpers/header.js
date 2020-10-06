export function header(method = 'POST') {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('eventBuizz'));
    if (user && user.data.access_token) {
        let event_id = JSON.parse(localStorage.getItem('event_id'));
        let language_id = JSON.parse(localStorage.getItem('language_id'));
        if (method === 'PUT' || method === 'DELETE')
            return { 'Authorization': 'Bearer ' + user.data.access_token, 'Accept': 'application/json', 'Content-Type': 'application/json', 'event_id': event_id, 'language_id': (language_id ? language_id : 1) };
        else
            return { 'Authorization': 'Bearer ' + user.data.access_token, 'Accept': 'application/json', 'event_id': event_id, 'language_id': (language_id ? language_id : 1) };

    } else {
        return {};
    }
}