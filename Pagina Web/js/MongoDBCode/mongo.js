import {getConnection} from "../connectionMongo/connectionMongoDB.js"; 


export const createConversation = async (conversationRoom, initialMessage = null) => {
    try {
        
        const db = await getConnection(); 
        const conversation = db.collection("conversations"); 

        const newConversation = {
            _id: conversationRoom, 
            createAt: new Date(), 
            messages: initialMessage
        }

        const result = await conversation.insertOne(newConversation); 
        return result; 

    } catch (error) {
        
    }
}