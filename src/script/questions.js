const urlJSON = 'http://localhost:3000/questions.json';

let objJSON = null;

getDataJSON();

function getDataJSON() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", urlJSON, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            objJSON = JSON.parse(xmlhttp.responseText);
            addElement(objJSON['01']);
            return objJSON['01'];
        }
    };
    return null;
}

function postDataJSON(objJSON) {
    fetch(urlJSON+'-add', {
        method: 'POST',
        body: JSON.stringify(objJSON)
    }).then()
}

function addToJSON(question,theme,answer) {
    objJSON['01'].push({'id':objJSON['01'].length,'question':question, 'theme': theme, 'answer':answer});
    postDataJSON(objJSON);
}


function addElement(objJSON) {
    let my_div = document.getElementById("list-questions-add");
    let documentFragment = document.createDocumentFragment();
    while (my_div.firstChild) {
        my_div.removeChild(my_div.firstChild);
    }
    if (objJSON != null) {
        for (let i = 0; i < objJSON.length; i++) {
            let newDiv = document.createElement("section");
            let newTheme=document.createElement("h3");
            newTheme.innerText=`${objJSON[i]["theme"]}`;
            newDiv.appendChild(newTheme);
            let newQuestion=document.createElement("p");
            newQuestion.innerText=`${objJSON[i]["question"]}`;
            let newAnswer=document.createElement("p");
            newAnswer.innerText=`${objJSON[i]["answer"]}`;
            newDiv.appendChild(newQuestion);
            newDiv.appendChild(newAnswer);

            newDiv.className += 'wrapper__text-block--item';
            documentFragment.appendChild(newDiv);
        }
        my_div.appendChild(documentFragment);
    }
}