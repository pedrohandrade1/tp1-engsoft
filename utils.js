function emptyResponse (response) {
    return response[0].length == 0;
}

function getResponse (response) {
    return response[0];
}

function getUniqueResponse (response) {
    return response[0][0];
}

function getUniqueResponseAttribute (response, attribute) {
    return getUniqueResponse(response)[attribute];
}

function checkAuth (req) {
    if (req.session.user == undefined) {
        console.warn("Necessario autentificar usuario antes!");
        return false;
    } else {
        console.log(`Requisição feito para usuario de id = ${req.session.user.id}`);
        return true;
    }
}

module.exports = { emptyResponse, getResponse, getUniqueResponse, getUniqueResponseAttribute, checkAuth }