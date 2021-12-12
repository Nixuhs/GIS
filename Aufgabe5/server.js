"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const http = require("http");

var Server;
(function (Server) {
    
    const hostname = "127.0.0.1"; 
    const port = 3000; 
    const server = http.createServer((request, response) => {
        
        response.statusCode = 200; 
        response.setHeader("Content-Type", "text/plain");
        response.setHeader("Access-Control-Allow-Origin", "*"); 

        let url = new URL(request.url || "", `http://${request.headers.host}`); 

        switch (url.pathname) {
            case "/": 
                response.write("Server erreichbar");
                break;
            case "/convertDate": 

                let date = new Date(url.searchParams.get("Datum"));
                const monthNames = ["January", "February", "March", "April", "May", "June",
                                    "July", "August", "September", "October", "November", "December"
                                    ];
                console.log(date);
                console.log(date.getDay(), date.getMonth(), date.getFullYear());
                response.write("Day: "  + date.getDate() + " Month: " + monthNames[date.getMonth()] + " Year: " + date.getFullYear()); //Definieren der Rückgabe mit der name-Variable
                break;
            default:
                response.statusCode = 404; 
        }
        response.end();
    });

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`);
    });
})(Server || (Server = {}));
