let interpret : HTMLInputElement = document.getElementById("interpret") as HTMLInputElement;
let preis : HTMLInputElement = document.getElementById("preis") as HTMLInputElement;
let datumuhrzeit : HTMLInputElement = document.getElementById("datumuhrzeit") as HTMLInputElement;
let eventtabelleElement : HTMLElement = document.getElementById("eventTabelle") as HTMLElement;
let eventArray : any = [];

function getEventsFromServer() {
    fetch("http://localhost:3000/concertEvents")
    .then(response => response.json())
    .then(data => {
        eventArray = data;
        console.log(eventArray);
        renderList();
    })
}

class eventTable {
    private interpret : string;
    private price : number;
    private dateAndTime : String;

    constructor(interpret : string, price : number, dateAndTime : String) {
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

    editFromList(index : number, interpret : string, price : number, dateAndTime : String) {
        eventArray[index].interpret = interpret;
        eventArray[index].price = price;
        eventArray[index].dateAndTime = dateAndTime;
    }
}

function renderList() {
    eventtabelleElement.innerHTML = "";
    if(eventArray.length > 0) {
        for (let i : number = 0; i < eventArray.length; i++) {
            let row : HTMLElement = document.createElement("tr");
            let event : HTMLElement = document.createElement("td");
            let price : HTMLElement = document.createElement("td");
            let date : HTMLElement = document.createElement("td");

            event.textContent = eventArray[i].interpret;
            price.textContent = eventArray[i].price + ' €';
            date.textContent = formatDate(eventArray[i].dateAndTime);

            row.appendChild(event);
            row.appendChild(price);
            row.appendChild(date);
            eventtabelleElement.appendChild(row);
        }
    } else {
        eventtabelleElement.innerHTML = "Keine Events";
    }
}

function formatDate(d : Date) {
    let DatePickerString : Date = new Date(d);
    let DateString = DatePickerString.getDate() +
     "." + (DatePickerString.getMonth() + 1) + "."
      + DatePickerString.getFullYear() + " um "
       + DatePickerString.getHours() + ':'
        + DatePickerString.getMinutes();
    return DateString;
}

async function formularbestätiger(edit : boolean) {
    if(interpret.value == "") {
        interpret.style.borderColor = "red";
    } else if(preis.value == "" || isNaN(Number(preis.value))) {
        preis.style.borderColor = "red";
    } else if(datumuhrzeit.value == "" || datumuhrzeit.value == "YYYY-MM-DD hh:mm") {
        datumuhrzeit.style.borderColor = "red";
    } else {
        serverPoster();
        let newEvent : eventTable = new eventTable(interpret.value, Number(preis.value), datumuhrzeit.value);
        newEvent.addToList();
        renderList();
    }
}


function serverPoster() {
    try {
    fetch("http://127.0.0.1:3000/concertEvents", {
        method: "POST",
        headers: {
        },
        body: JSON.stringify({
            interpret: interpret.value,
            price: preis.value,
            dateAndTime: datumuhrzeit.value
        }),
        })
        .then(response => {
            if(response.status == 201) {
                return true;
            } else {
                return false;
            }
            response.json()
        })
    } catch(error) {
        console.log(error);
        return false;
    }
}