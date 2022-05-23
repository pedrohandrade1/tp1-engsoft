ENDPOINT = 'http://localhost:5500/'

function req_student_info(){
    const xmlHttp = new XMLHttpRequest();
    let url = ENDPOINT + "students/personal/"
    
    xmlHttp.open( "GET", url, false); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.response;
}

function req_test_info(test_id){
    const xmlHttp = new XMLHttpRequest();
    let url = ENDPOINT + "tests/" + test_id + "/"
    
    xmlHttp.open( "GET", url, false); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.response;
}

function get_html_questions_cards (question) {
    const html = `<div class="card" style="width: 40rem;">
                    <form><div class="card-body">
                        <h5 id="question" class="card-title">${question.question}</h5>
                        <ul class="list-group list-group-flush">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1"> ${question.alternativeA}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1"> ${question.alternativeB} </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1"> ${question.alternativeC} </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1"> ${question.alternativeD} </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1"> ${question.alternativeE} </label>
                            </div>
                        </ul>
                    </div></form>
                </div>`
    return html;
}

function add_question_card(questions) {
    let html = "";
    for (let i = 0; i < 5; i++) {
        html += get_html_questions_cards(questions[i]);
    }
    const node = document.getElementById("questions");
    node.innerHTML = html;
} 

function render_user_info(){
    ans = JSON.parse(req_student_info())
    console.log(ans)
    document.getElementById('student_name').innerHTML = ans.firstName + " " + ans.lastName
    
    test_id = window.location.href.split('/').slice(-1)
    questions = JSON.parse(req_test_info(test_id)) 
    console.log(questions)
    add_question_card(questions)
}
