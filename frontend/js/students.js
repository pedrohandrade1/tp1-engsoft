ENDPOINT = 'http://localhost:5500/';

function getTestsIdArray (xmlHttp) {
    const response = xmlHttp.response;
    return JSON.parse(response);
}

function req_done_tests () {
    const xmlHttp = new XMLHttpRequest();
    let url = ENDPOINT + "students/tests/done/";

    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp;
}

function req_to_do_tests () {
    const xmlHttp = new XMLHttpRequest();
    let url = ENDPOINT + "students/tests/todo/";

    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp;
}

function get_tests_id_array (xmlHttp) {
    const response = xmlHttp.response;
    return JSON.parse(response);
}

function init () {
    const done_tests = req_done_tests();
    const test_done_id_array = getTestsIdArray(done_tests);
    const to_do_tests = req_to_do_tests();
    const test_to_do_id_array = getTestsIdArray(to_do_tests);
    add_done_test_cards(test_done_id_array);
    add_to_do_test_cards(test_to_do_id_array);
}

function showTest(test_id){
    window.location = ENDPOINT + 'show/' + test_id
}

function go_to_test (test_id) {
    window.location = ENDPOINT + 'test/' + test_id
}

function get_html_done_test_cards (test_id, prof_name) {
    const html = `<div class="col-sm-5">
                    <div class="card bg-light mb-3">
                        <h5 class="card-header">Prova ${test_id}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Professor: ${prof_name}</li>
                        </ul>
                        <div class="card-footer">
                            <div class="col-md-12 text-center">
                                <button onclick="showTest(${test_id})" class="btn btn-outline-secondary mt-0">Visualizar Prova</button>
                            </div>
                        </div>
                    </div>
                </div>`
    return html;
}

function get_html_to_do_test_cards (test_id, prof_name) {
    const html = `<div class="col-sm-5">
                    <div class="card bg-light mb-3">
                        <h5 class="card-header">Prova ${test_id}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Professor: ${prof_name}</li>
                        </ul>
                        <div class="card-footer">
                            <div class="col-md-12 text-center">
                                <button onclick="go_to_test(${test_id})" class="btn btn-outline-secondary mt-0">Realizar Prova</button>
                            </div>
                        </div>
                    </div>
                </div>`
    return html;
}

function add_done_test_cards (test_id_array) {
    let html = "";
    for (let i = 0; i < test_id_array.length; i++) {
        const row = test_id_array[i];
        const test_id = row.id;
        const prof_name = row.firstName + " " + row.lastName
        html += get_html_done_test_cards(test_id, prof_name);
    }
    console.log(html)
    const node = document.getElementById("tests-done");
    node.innerHTML = html;
}

function add_to_do_test_cards (test_id_array) {
    let html = "";
    for (let i = 0; i < test_id_array.length; i++) {
        const row = test_id_array[i];
        const test_id = row.id;
        const prof_name = row.firstName + " " + row.lastName
        html += get_html_to_do_test_cards(test_id, prof_name);
    }
    console.log(html)
    const node = document.getElementById("tests-to-do");
    node.innerHTML = html;
} 