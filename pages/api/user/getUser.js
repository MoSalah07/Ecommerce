import { connectToDataBase } from "../../../lib/auth/conectDB";
import { unstable_getServerSession } from "next-auth/next"
import {NextOptions} from '../auth/[...nextauth]';

export default async function handlerGetUser( req, res ) {

    if (req.method === 'GET') {
        const { user: {email}} = await unstable_getServerSession( req, res, NextOptions );
        // console.log(email)
        const client = await connectToDataBase();
        const userCollection = await client.db('ecommerce').collection( "user" ).findOne({email});
        
        res.status( 200 ).json( { message: 'good', userCollection: userCollection } );
        client.close();
        return;
    }


}
