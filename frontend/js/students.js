ENDPOINT = 'http://localhost:5500/'


function go_to_test(test_id){
    new_url = window.location.href.split('/')
    new_url = new_url.slice(0, new_url.length - 2).join('/')
    console.log(new_url + '/solve_test.html/' + test_id)
    window.location = new_url + '/solve_test.html?test_id=' + test_id 
}