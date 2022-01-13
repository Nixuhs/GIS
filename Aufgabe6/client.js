"use strict";
let interpret = document.getElementById("interpret");
let preis = document.getElementById("preis");
let datumuhrzeit = document.getElementById("datumuhrzeit");
let eventtabelleElement = document.getElementById("eventTabelle");
let eventArray = [];
function getEventsFromServer() {
    fetch("http://localhost:3000/concertEvents")
        .then(response => response.json())
        .then(data => {
        eventArray = data;
        console.log(eventArray);
        renderList();
    });
}
class eventTable {
    interpret;
    price;
    dateAndTime;
    constructor(interpret, price, dateAndTime) {
        this.interpret = interpret;
        this.price = price;
        this.dateAndTime = dateAndTime;
    }
    addToList() {
        eventArray.push({
            interpret: this.interpret,
            price: this.price,
            dateAndTime: this.dateAndTime
        });
    }
    editFromList(index, interpret, price, dateAndTime) {
        eventArray[index].interpret = interpret;
        eventArray[index].price = price;
        eventArray[index].dateAndTime = dateAndTime;
    }
}
function renderList() {
    eventtabelleElement.innerHTML = "";
    if (eventArray.length > 0) {
        for (let i = 0; i < eventArray.length; i++) {
            let row = document.createElement("tr");
            let event = document.createElement("td");
            let price = document.createElement("td");
            let date = document.createElement("td");
            event.textContent = eventArray[i].interpret;
            price.textContent = eventArray[i].price + ' €';
            date.textContent = formatDate(eventArray[i].dateAndTime);
            row.appendChild(event);
            row.appendChild(price);
            row.appendChild(date);
            eventtabelleElement.appendChild(row);
        }
    }
    else {
        eventtabelleElement.innerHTML = "Keine Events";
    }
}
function formatDate(d) {
    let DatePickerString = new Date(d);
    let DateString = DatePickerString.getDate() +
        "." + (DatePickerString.getMonth() + 1) + "."
        + DatePickerString.getFullYear() + " um "
        + DatePickerString.getHours() + ':'
        + DatePickerString.getMinutes();
    return DateString;
}
async function formularbestätiger(edit) {
    if (interpret.value == "") {
        interpret.style.borderColor = "red";
    }
    else if (preis.value == "" || isNaN(Number(preis.value))) {
        preis.style.borderColor = "red";
    }
    else if (datumuhrzeit.value == "" || datumuhrzeit.value == "YYYY-MM-DD hh:mm") {
        datumuhrzeit.style.borderColor = "red";
    }
    else {
        serverPoster();
        let newEvent = new eventTable(interpret.value, Number(preis.value), datumuhrzeit.value);
        newEvent.addToList();
        renderList();
    }
}
function serverPoster() {
    try {
        fetch("http://127.0.0.1:3000/concertEvents", {
            method: "POST",
            headers: {},
            body: JSON.stringify({
                interpret: interpret.value,
                price: preis.value,
                dateAndTime: datumuhrzeit.value
            }),
        })
            .then(response => {
            if (response.status == 201) {
                return true;
            }
            else {
                return false;
            }
            response.json();
        });
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
//# sourceMappingURL=client.js.map