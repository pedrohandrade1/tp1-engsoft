ENDPOINT = "http://localhost:5500" // TEMPORARY

function authenticate(email, password){
    const xmlHttp = new XMLHttpRequest();
    let url = ENDPOINT + "/:" + email + "/:" + password
    
    xmlHttp.open( "GET", url, false); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function sign_in(){
    console.log("lets sign_in")
    let email = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    if(email == ""){
        console.log("username missing");
        document.getElementById('alert').innerHTML = '<div id="alert" class="alert alert-danger" role="alert">Preencha o Nome de Usuário!</div>';
    }

    else if(password == ""){
        console.log("password missing");
        document.getElementById('alert').innerHTML = '<div id="alert" class="alert alert-danger" role="alert">Preencha a senha!</div>';
    }

    else {
        authenticate(email, password)
    }


}