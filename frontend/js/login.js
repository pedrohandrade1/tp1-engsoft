ENDPOINT = "http://localhost:5500/" // TEMPORARY


function redirect_to_page (type) {
    new_url = window.location.href.split('/')
    new_url = new_url.slice(0, new_url.length - 2).join('/')
    window.location = ENDPOINT + 'home/' + type + '/'
}

function req_student_info () {
    const xmlHttp = new XMLHttpRequest();
    let url = ENDPOINT + "students/personal/"
    console.log('tentando acessar ' + url)

    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp;
}

function authenticate (email, password, type) {
    const xmlHttp = new XMLHttpRequest();
    let url = ENDPOINT + type + "/auth/" + email + "/" + password + "/"

    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp;
}

function sign_in (type) {
    console.log("lets sign_in")
    let email = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (email == "") {
        console.log("username missing");
        document.getElementById('alert').innerHTML = '<div id="alert" class="alert alert-danger" role="alert">Preencha o Nome de Usuário!</div>';
    }

    else if (password == "") {
        console.log("password missing");
        document.getElementById('alert').innerHTML = '<div id="alert" class="alert alert-danger" role="alert">Preencha a senha!</div>';
    }

    else {
        ans = authenticate(email, password, type)
        if (ans.status == 200) {
            localStorage.setItem('token', JSON.stringify(ans.responseText))
            redirect_to_page(type)
        }
    }
}