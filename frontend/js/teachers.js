ENDPOINT = "http://localhost:5500/"
let testObject

function getTestsCreatedList () {
  const xmlHttp = new XMLHttpRequest();
  let url = ENDPOINT + "teachers/tests/created/"

  xmlHttp.open("GET", url, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp;
}

function postCreatedTest (createdTest) {
  const xmlHttp = new XMLHttpRequest();
  let url = ENDPOINT + "teachers/tests/new/"

  xmlHttp.open("POST", url, false); // false for synchronous request
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var data = JSON.stringify(createdTest);
  xmlHttp.send(data);
}

function getTestsIdArray (xmlHttp) {
  const response = xmlHttp.response;
  return JSON.parse(response);
}

function init () {
  const xmlHttp = getTestsCreatedList();
  const testIdArray = getTestsIdArray(xmlHttp);
  console.log(testIdArray);
  addTestCards(testIdArray)

  document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
}

function handleFileSelect (event) {
  const reader = new FileReader()
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0])
}

function handleFileLoad (event) {
  console.log(event);
  testObject = getTestObject(event.target.result);
  const testHTML = getTestHTML(testObject);
  console.log(testObject);
  document.getElementById('fileContent').innerHTML = testHTML;
}

function getTestObject (string) {
  const result = [];
  const stringFormated = string.replaceAll("\r", "");
  const lines = stringFormated.split("\n");

  let counter = 0;
  const questions = parseInt(lines[counter]);
  for (let i = 0; i < questions; i++) {
    const header = lines[++counter];
    const optionsCount = parseInt(lines[++counter]);
    const options = [];
    for (let j = 0; j < optionsCount; j++) {
      options.push(lines[++counter])
    }
    const answer = lines[++counter];
    result.push({ header, options, answer });
  }

  return result;
}

function showTest () {

}

function getHtmlTestCard (testId) {
  const html = `<div class="col-sm-3">
                    <div class="card bg-light mb-3">
                        <h5 class="card-header">Prova ${testId}</h5>
                        <div class="card-body">
                            <div class="col-md-12 text-center">
                                <button class="btn btn-outline-secondary mt-2" onclick="showTest(${testId})">Visualizar Prova</button>
                            </div>
                        </div>
                    </div>
                  </div>`;
  return html;
}

function addTestCards (testIdArray) {
  let html = "";
  for (let i = 0; i < testIdArray.length; i++) {
    const row = testIdArray[i];
    const testId = row.id;
    html += getHtmlTestCard(testId);
  }
  console.log(html)
  const node = document.getElementById("tests-created");
  node.innerHTML = html;
}

function uploadCreatedTest(){
  postCreatedTest(testObject)
}