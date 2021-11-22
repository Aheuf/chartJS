import axios from "axios";

const baseURL = "http://localhost:3001";
const fileReader = new FileReader();

export default function InputHandler(event){
    let file = event.target.files[0];

    fileReader.onload = function (file){
        let lines = file.target.result.split("\n");
        lines.pop();

        //nettoyage des lignes
        for (let i=0; i < lines.length; i++){
            lines[i] = lines[i].split("\r")[0]
        };

        let result = [];
        let headers = lines[0].split(";");

        // nettoyage des headers
        for (let i =0; i < headers.length; i++){
            headers[i] = headers[i].split("{")[1];
            headers[i] = headers[i].split("}")[0];
        }
        // transformation du csv en tableau d'objets
        for (let i=1; i<lines.length; i++){
            let obj = {};
            let currentLine = lines[i].split(";");

            for(let j=0 ; j < headers.length; j++){
                obj[headers[j]] = currentLine[j];
            }
            result.push(obj);
        }
        //comptage des impressions
        let countIdfa = 0;
        let countAdid = 0;
        let totalImp = result.length;

        for (let index in result){
            if(result[index].idfa !== ""){
                countIdfa++;
            } else {
                countAdid++;
            }
        }
        let nbImpression = {idfa:countIdfa, gps_adid:countAdid, total:totalImp}
    
        axios
        .post(baseURL, nbImpression)
        .then(res => {
            console.log(res.data);
            console.log("je passe dans le then");
        })
    }
    fileReader.readAsText(file);
}