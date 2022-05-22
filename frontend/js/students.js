ENDPOINT = 'http://localhost:5500/'

function init(){
    const done_tests = req_done_tests()
    const to_do_tests = req_to_do_tests()
    add_done_test_cards(done_tests)
    add_to_do_test_cards(to_do_tests)
}

function req_done_tests(){
    const xmlHttp = new XMLHttpRequest();
    let url = ENDPOINT + "students/tests/done/"
    
    xmlHttp.open( "GET", url, false); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp;
}

function req_to_do_tests(){
    const xmlHttp = new XMLHttpRequest();
    let url = ENDPOINT + "students/tests/done/"
    
    xmlHttp.open( "GET", url, false); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp;
}

function go_to_test(test_id){
    new_url = window.location.href.split('/')
    new_url = new_url.slice(0, new_url.length - 2).join('/')
    console.log(new_url + '/solve_test.html/' + test_id)
    window.location = new_url + '/solve_test.html?test_id=' + test_id 
}

function get_html_done_test_cards(test_id){
    const html = `<div class="col-sm-5">
                    <div class="card bg-light mb-3">
                        <h5 class="card-header">Prova ${test_id}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Professor:</li>
                            <li class="list-group-item">Número de Acertos:</li>
                        </ul>
                        <div class="card-footer">
                            <div class="col-md-12 text-center">
                                <button class="btn btn-outline-secondary mt-0">Visualizar Prova</button>
                            </div>
                        </div>
                    </div>
                </div>`
    return html;
  }

function get_html_to_do_test_cards(test_id){
    const html = `<div class="col-sm-5">
                    <div class="card bg-light mb-3">
                        <h5 class="card-header">Prova ${test_id}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Professor:</li>
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

function add_done_test_cards(test_id_array){
    let html = "";
    for(let i = 0; i < test_id_array.lenght; i++){
        const testId = test_id_array[i].id;
        html+= get_html_done_test_cards(test_id);
    }
    const node = document.getElementById("tests-done");
    node.innerHTML = html;
    } 

function add_to_do_test_cards(test_id_array){
    let html = "";
    for(let i = 0; i < test_id_array.lenght; i++){
        const testId = test_id_array[i].id;
        html+= get_html_to_do_test_cards(test_id);
    }
    const node = document.getElementById("tests-to-do");
    node.innerHTML = html;
    } 