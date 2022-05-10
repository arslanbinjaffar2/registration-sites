export function header(method = 'POST', id) {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem(`event${id}User`));
    if (user && user.access_token) {
        if (method === 'PUT' || method === 'DELETE')
            return { 'Authorization': 'Bearer ' + user.access_token, 'Accept': 'application/json', 'Content-Type': 'application/json' };
        else
            return { 'Authorization': 'Bearer ' + user.access_token, 'Accept': 'application/json' };

    } else {
        return {};
    }
}