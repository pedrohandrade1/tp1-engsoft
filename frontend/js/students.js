ENDPOINT = 'http://localhost:5500/'


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

function init(){
    done_tests = req_done_tests()
    console.log(ans)
    // if(ans.response == 200){
    //     ans.responseText.forEach(element => {
            
    //     });
    // }

    to_do_tests = req_to_do_tests()
    console.log(ans)
    // if(ans.response == 200){

    // }

}


function go_to_test(test_id){
    new_url = window.location.href.split('/')
    new_url = new_url.slice(0, new_url.length - 2).join('/')
    console.log(new_url + '/solve_test.html/' + test_id)
    window.location = new_url + '/solve_test.html?test_id=' + test_id 
}