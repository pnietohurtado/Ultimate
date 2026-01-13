import {MongoClient} from "mongodb"; 

const getConnection = async () => {

    try{

        const mongoURL = "mongodb://localhost:27017/MongoDB_test"; 
        const client = await MongoClient.connect(mongoURL); 
        return client.db(); 

    }catch(error){
        console.error(error); 
    }
}


export {getConnection}; 