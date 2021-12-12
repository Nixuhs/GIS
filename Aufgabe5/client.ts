namespace Client {
    console.log("Client läuft");

    const url: string = "http://127.0.0.1:3000"; 
    const path: string = "/convertDate"; 

    const datumForm: HTMLFormElement = <HTMLFormElement>document.getElementById("datum-display"); 
    const addButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("add-button"); 
    const tasks: HTMLElement = <HTMLElement>document.querySelector("#tasks"); 

    addButton.addEventListener("click", function (evt: Event) {
        evt.preventDefault(); 
        sendForm(); 
        });
    
    console.log(datumForm, addButton); 

  
    async function sendForm(): Promise<void> {

        let formData: FormData = new FormData(datumForm);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let urlWithQuery: string = url + path + "?" + query.toString(); 
       
        let response: Response = await fetch(urlWithQuery); 
        let responseText: string = await response.text();
        console.log(responseText); 


        const task = document.createElement("div");
        task.className = "task";
        tasks.appendChild(task);

        const datum = document.createElement("div");
        datum.className = "Tabelle";
        datum.innerText = responseText;
        
        task.appendChild(datum);
    }
}