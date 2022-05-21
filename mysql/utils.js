function getResponse (response) {
    return response[0];
}

function getUniqueResponse (response) {
    return response[0][0];
}

function getUniqueResponseAttribute (response, attribute) {
    return getUniqueResponse(response)[attribute];
}

module.exports = {getResponse, getUniqueResponse, getUniqueResponseAttribute}