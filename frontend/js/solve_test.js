ENDPOINT = 'http://localhost:5500/'

function get_test_id(){
    return window.location.href.split('/').slice(-1)
}

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

function send_question(question_id, ans){
    const xmlHttp = new XMLHttpRequest();
    
    url = ENDPOINT + 'students/answer/'  + get_test_id() + '/' + question_id + '/' + ans + "/"
    xmlHttp.open( "POST", url, false); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.response;
}

function redirect_to_page (type) {
    window.location = ENDPOINT + 'home/' + type + '/'
}

function openAlert(){
    console.log("opa")
    document.getElementById('myalert').innerHTML = '<div class="col-lg-6 alert alert-success" ><strong>Successo!</strong> Respostas enviadas</div>'
 }

function send_test(){
    el = document.getElementById('question0')
    alternatives = ['A', 'B', 'C', 'D', 'E']

    object = JSON.parse(localStorage.getItem('quiz'))

    for (let i = 0; i < 5; i++) {
        alternatives.forEach(element => {
            alternative = document.getElementById(i + "/" + element)
            if(alternative.checked){
                setTimeout(() => { 
                    ans = send_question(object[i].id, element)
                    console.log(ans)
                }, 1000);
            }
        });
    }

    setTimeout(() => { 
        openAlert()
    }, 1000);
    
}   

function get_html_questions_cards (question, id) {
    const html = `<div class="card" style="width: 40rem;">
                    <form id=${'question'+id}><div class="card-body">
                        <h5 id="question" class="card-title">${question.question}</h5>
                        <ul class="list-group list-group-flush">
                            <div class="form-check">
                                <input id="${id+ '/A'}" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1"> ${question.alternativeA}</label>
                            </div>
                            <div class="form-check">
                                <input id="${id+ '/B'}"class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1"> ${question.alternativeB} </label>
                            </div>
                            <div class="form-check">
                                <input id="${id+ '/C'}"class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1"> ${question.alternativeC} </label>
                            </div>
                            <div class="form-check">
                                <input id="${id+ '/D'}"class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1"> ${question.alternativeD} </label>
                            </div>
                            <div class="form-check">
                                <input id="${id+ '/E'}" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
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
        html += get_html_questions_cards(questions[i], i);
    }
    const node = document.getElementById("questions");
    node.innerHTML = html;
} 


function render_user_info(){
    ans = JSON.parse(req_student_info())
    document.getElementById('student_name').innerHTML = ans.firstName + " " + ans.lastName
    
    test_id = get_test_id()
    questions = JSON.parse(req_test_info(test_id)) 

    localStorage.setItem('quiz', JSON.stringify(questions));
    add_question_card(questions)
}
