ENDPOINT = 'http://localhost:5500/'

function req_student_info(){
    const xmlHttp = new XMLHttpRequest();
    let url = ENDPOINT + "students/personal/"
    
    xmlHttp.open( "GET", url, false); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp;
}

function render_user_info(){
    ans = req_student_info()
    print(ans)
    
}
