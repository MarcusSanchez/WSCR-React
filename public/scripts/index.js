let conn;
let msg = document.getElementById("msg");
let log = document.getElementById("log");

function appendLog(item) {
    let doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
    log.appendChild(item);
    if (doScroll) {
        log.scrollTop = log.scrollHeight - log.clientHeight;
    }
}

document.getElementById("generateRoom").onclick = function () {
    fetch("http://10.0.0.94:3000/generateRoom")
        .then((response) => response.text())
        .then((text) => {
            document.getElementById("room").value = text;
        })
        .catch((error) => {
            // Handle any errors that occur during the fetch request
            console.error('Error:', error);
        });
};

document.getElementById("message").onsubmit = function () {
    if (!conn) {
        return false;
    }
    if (!msg.value) {
        return false;
    }
    conn.send(msg.value);
    msg.value = "";
    return false;
};

function validateName(str) {
    // Check if the string matches the pattern of 3-16 characters
    return /^[a-zA-Z0-9]{3,16}$/.test(str);
}

function validateRoom(str) {
    // Check if the string matches the pattern of four digits
    if (/^\d{4}$/.test(str)) {
        // Convert the string to a number
        let num = parseInt(str, 10);

        // Check if the number is within the desired range
        if (num >= 0 && num <= 9999) {
            return true;
        }
    }

    return false;
}

document.getElementById("roomForm").onsubmit = function () {
    let name = document.getElementById("name").value;
    let room = document.getElementById("room").value;
    if (!name || !room) {
        return false;
    }

    if (!validateName(name)) {
        alert("Name must be 3-16 characters long and may only consist of letters and numbers.");
        return false;
    }

    if (!validateRoom(room)) {
        alert("Room must be a 4 digit number 0000-9999");
        return false;
    }
    document.getElementById("joiner").innerHTML = "";
    document.getElementById("header").textContent = "Room " + room + " as " + name;
    document.getElementById("header-wrapper").classList.add("top-right-Nav");
    start(name, room);
    return false;
};

function start(name, room) {
    if (window["WebSocket"]) {
        conn = new WebSocket("ws://" + document.location.host + `/ws/${name}/${room}`);
        conn.onclose = function () {
            let item = document.createElement("div");
            item.innerHTML = "<b>Connection closed.</b>";
            appendLog(item);
        };
        conn.onmessage = function (e) {
            let message = e.data;
            let item = document.createElement("div");
            item.innerText = message;
            appendLog(item);
        };
    } else {
        let item = document.createElement("div");
        item.innerHTML = "<b>Your browser does not support WebSockets.</b>";
        appendLog(item);
    }
}
