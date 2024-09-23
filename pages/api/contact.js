import { MongoClient } from "mongodb";

async function handler(req, res) {
    if(req.method === 'POST'){
        const {email, name, message} = req.body;

        if( 
            !email || 
            !email.includes('@') || 
            !name || 
            name.trim() === '' || 
            !message || 
            message.trim() === ''
        ){
            res.status(422).json( {message:'invalid input'} );
            return;
        }
        const newMesssage = {
            email,
            name,
            message
        };
        
        let client;

        const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.2tpx4.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

        try{
            client = await MongoClient.connect(connectionString );
        } catch (error) {
            res.status(500).json({message: 'Could not connect to database.'});
            return;
        }
        

        const db = client.db();

        try{
            const result = await db.collection('messages').insertOne(newMesssage);
            newMesssage.id = result.insertedId;
         }catch(error) {
            client.close();
            res.status(500).json({message: 'storing message failled'});
            return;
         }

         client.close();

        res
            .status(201)
            .json({message: 'successfully stored message', message: newMesssage});
    }
}

export default handler;