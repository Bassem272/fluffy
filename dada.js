import fetch from 'node-fetch'


async function  fetchdata () {

    try{
       const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      if (!res.ok){
        throw new Error("error ")
      }else{
        
         const  jsona = await res.json();
        console.log(jsona)
      }
       


     

    }catch(err){
        console.log(err)
    }
}

fetchdata()
// .then(response => response.json())
//       .then(json => console.log(json))