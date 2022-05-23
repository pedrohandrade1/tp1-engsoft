ENDPOINT = 'http://localhost:5500/';

function getTestId () {
    return window.location.href.split('/').slice(-1);
}

function init () {
    const test_id = getTestId();
    const testInfo = getTestInfo(test_id);
    console.log(testInfo);
    const testObject = convertObject(testInfo);
    console.log(testObject);
    const el = document.getElementById("test-preview");
    const html = getTestHTML(testObject);
    el.innerHTML = html;
}