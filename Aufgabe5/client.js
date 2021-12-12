"use strict";
var Client;
(function (Client) {
    console.log("Client läuft"); 
    const url = "http://127.0.0.1:3000"; 
    const path = "/convertDate"; 
    const datumForm = document.getElementById("datum-display"); 
    const addButton = document.getElementById("add-button"); 
    const tasks = document.querySelector("#tasks");
    
    addButton.addEventListener("click", function (evt) {
        evt.preventDefault(); 
        sendForm(); 
    });
    console.log(datumForm, addButton); 

    async function sendForm() {
        
        let formData = new FormData(datumForm); 
        let query = new URLSearchParams(formData);
        let urlWithQuery = url + path + "?" + query.toString(); 
       
        let response = await fetch(urlWithQuery); 
        let responseText = await response.text(); 
        console.log(responseText);

        const task = document.createElement("div");
        task.className = "task";
        tasks.appendChild(task);

        const datum = document.createElement("div");
        datum.className = "Tabelle";
        datum.innerText = responseText;
        task.appendChild(datum);
    }
})(Client || (Client = {}));
//# sourceMappingURL=client.js.map