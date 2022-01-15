function toggleDisabledClass(id) {
    for (let i = 0; i < arguments.length; i++) {
        const node = document.getElementById(arguments[i])

        if (node) {
            node.classList.toggle('disabled')
        } else {
            return false
        }
    }
    return true
}

function setInputValue(id, value = '') {
    const node = document.getElementById(id);

    if (node) {
        node.value = value;
        return true;
    }
    return false;
}

function getInputValue(id) {
    const node = document.getElementById(id);

    if (node) {
        return node.value;
    }
    return false;
}

function getFileFromInput(id) {
    const node = document.getElementById(id);

    if (node && node.type === 'file') {
        if (node.value === '') {
            return '';
        }
        return node.files[0];
    }
    return false;
}

function setBackgroundImage(id, value) {
    const node = document.getElementById(id)

    if (node) {
        node.style.backgroundImage = value;
        return true;
    }
    return false;
}


function addListener(id, eventType, cb) {
    const node = document.getElementById(id)

    if (node) {
        node.addEventListener(eventType, cb)
    }
}

function removeListener(id, eventType, callback) {
    const node = document.getElementById(id);
    if (node) {
        node.removeEventListener(eventType, callback);
    }
}

function setValueLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getValueLocalStorage(key) {
    if (localStorage.hasOwnProperty(key)) {
        return localStorage[key]
    }
    return false;
}


function createElement(tagName, className, text) {
    let newNode = document.createElement(tagName);
    if (newNode) {
        newNode.innerText = text;
        newNode.className += className;
        return newNode;
    }
    return null;
}


function getNodeChecked(id) {
    const node = document.getElementById(id);
    if (node) {
        return node.checked;
    }
    return false;
}

function setNodeDisable(id,disable=false) {
    const node = document.getElementById(id);
    if (node) {
        node.disabled=disable;
        return true;
    }
    return false;
}

function setNodeChecked(id, checked = false) {
    const node = document.getElementById(id);
    if (node) {
        node.checked = checked;
        return true;
    }
    return false;
}

function getNodeSelectedText(id) {
    const node = document.getElementById(id);
    if (node) {
        return node.options[node.selectedIndex].text;
    }
    return '';
}

function setNodeSelectedText(id, selectIndex) {
    const node = document.getElementById(id);
    if (node) {
        return node.selectedIndex = selectIndex;
    }
    return '';
}

function addNodeClass(id, className) {
    const node = document.getElementById(id);
    if (node) {
        node.classList.add(className);
        return true;
    }
    return false;
}

function removeNodeClass(id, className) {
    const node = document.getElementById(id);
    if (node) {
        node.classList.remove(className);
        return true;
    }
    return false;
}

function clearTempFiles() {
    fetch('http://localhost:3050/deleteTemp').then()
}

//removeIf(production)
module.exports = {
    setBackgroundImage,
    getInputValue,
    setInputValue,
    getFileFromInput,
    clearTempFiles,
    toggleDisabledClass,
    addListener,
    removeListener,
    createElement,
    getNodeChecked,
    getNodeSelectedText,
    setNodeChecked,
    setNodeSelectedText,
    setValueLocalStorage,
    getValueLocalStorage
}
//endRemoveIf(production)