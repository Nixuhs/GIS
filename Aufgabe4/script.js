"use strict";
var namespace1;
(function (namespace1) {
    const interpret_display = document.getElementById("interpret");
    const preis_display = document.getElementById("preis");
    const datum_display = document.getElementById("datum");
    const tasks = document.querySelector("#tasks");
    const add_button = document.querySelector("#add-button");
    add_button.addEventListener("click", createTask);
    function createTask() {
        let interpretValue = interpret_display.value;
        let priceValue = Number(preis_display.value);
        let datumvalue = datum_display.value;
        const task = document.createElement("div");
        task.className = "task";
        tasks.appendChild(task);
        const interpret = document.createElement("div");
        interpret.className = "Tabelle";
        interpret.innerText = interpretValue;
        task.appendChild(interpret);
        const preis = document.createElement("div");
        preis.className = "Tabelle";
        preis.innerText = String(priceValue);
        task.appendChild(preis);
        const datum = document.createElement("div");
        datum.className = "Tabelle";
        datum.innerText = datumvalue;
        task.appendChild(datum);
        const button = document.createElement("button");
        button.className = "Tabelle";
        button.innerText = "Delete Task";
        button.addEventListener("click", function () {
            this.parentElement.remove();
            localStorage.setItem("Folder1", tasks.innerHTML);
        });
        task.appendChild(button);
        localStorage.setItem("Folder1", tasks.innerHTML);
    }
    function retrieve() {
        if (localStorage.getItem("Folder1") === null)
            alert("Nothing in Folder1");
        else {
            document.getElementById("tasks").innerHTML = localStorage.getItem("Folder1");
            let buttons = document.getElementsByTagName("button");
            for (var z = 0; z < buttons.length; z++) {
                if (buttons[z].innerText == "Delete Task") {
                    buttons[z].addEventListener("click", function () {
                        this.parentElement.remove();
                        localStorage.setItem("Folder1", tasks.innerHTML);
                    });
                }
            }
        }
    }
    window.onload = retrieve;
})(namespace1 || (namespace1 = {}));
//# sourceMappingURL=script.js.map