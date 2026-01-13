import {getConnection} from "../connectionMongo/connectionMongoDB.js"; 

const getLanguage = async () => {
    try{

        const database = await getConnection(); 
        const languages = await database.collection("languages").find().toArray(); 

        console.table(languages); 
        console.log("Languages listed!"); 

    }catch(error){
        console.error(error); 
    }
}

getLanguage();