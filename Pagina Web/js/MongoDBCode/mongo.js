import {getConnection} from "../connectionMongo/connectionMongoDB.js"; 

const getId = async () => {
    try{

        const db = await getConnection(); 
        

    }catch(error){
        console.error(error); 
    }
}

const getConvData = async () => { // It should return the id of the conversation 
    try{

        /*
        const database = await getConnection(); 
        const languages = await database.collection("languages").find().toArray(); 

        console.table(languages); 
        console.log("Languages listed!"); 
        */

        const db = await getConnection(); 
        const id = null; 
        //const id = await db.collection("[El nombre de la colección es el id de la conversación]").find().toArray(); 
        return id; 

    }catch(error){
        console.error(error); 
    }
}

// Function to add one more message to the count list 
const addingNumMessage = async () => {
    try{



    }catch(error){
        console.error(error); 
    }
}

getLanguage();