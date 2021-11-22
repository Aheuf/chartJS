import { useEffect, useState } from "react"
import axios from "axios";
import { Bar } from "react-chartjs-2";

const ShowData = () => {
  const[dataGraph, setDataGraph] = useState();
    
  useEffect( () =>{
    axios.get("http://localhost:3001")
            .then(res => setDataGraph(res.data[0]));
  }, []);

  if(dataGraph){
    const data = {
      labels: ['idfa','gps_adid'],
      datasets: [{
        label:"Impressions",
        data: [dataGraph.idfa, dataGraph.gps_adid],
        backgroundColor:["#00d6d6", "#d39e41"],
      }]
    }
    return (    
      <div>
        <Bar data={data}/>
      </div>
    )
  }

  return  (null)
}
export default ShowData