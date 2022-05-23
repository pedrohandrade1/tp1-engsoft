function requestTestInfo (test_id) {
    const xmlHttp = new XMLHttpRequest();
    let url = ENDPOINT + "tests/" + test_id + "/"

    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp;
}

function getTestInfo (test_id) {
    const request = requestTestInfo(test_id);
    const response = request.response;
    return JSON.parse(response);
}

function convertObject (testArray) {
    const result = [];
    for (let i = 0; i < testArray.length; i++) {
        const { question, alternativeA, alternativeB, alternativeC, alternativeD, alternativeE, answerExpected } = testArray[i];
        result.push({
            header: question,
            options: [alternativeA, alternativeB, alternativeC, alternativeD, alternativeE],
            answer: answerExpected
        })
    }
    return result;
};

function getTestHTML (questionArray) {
    let html = '';
    for (let i = 0; i < questionArray.length; i++) {
        html += getQuestionHTML(i, questionArray[i]);
    }
    return html;
}

function getQuestionHTML (i, { header, options, answer }) {
    return `<div class="card mt-3 mx-auto" style="width: 400px;">
                <div class="card-header">
                    Questão ${i + 1}
                </div>
                <div class="card-body">
                    <p class="mb-3">${header}</p>
                    ${getOptionsHTML(options, answer)}
                </div>
            </div>`

}

function getOptionsHTML (options, answer) {
    const answerDic = { "a": 0, "b": 1, "c": 2, "d": 3, "e": 4 };
    const answerIndex = answerDic[answer];
    let result = `<ul class="list-group">`;
    for (let i = 0; i < options.length; i++) {
        result += `<li class="list-group-item ${i == answerIndex ? "active" : ''}">${options[i]}</li>`
    }
    result += `</ul>`
    return result;
}