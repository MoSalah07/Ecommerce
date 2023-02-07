import { connectToDataBase } from '../../../lib/auth/conectDB';
import { vefiyPassword } from '../../../lib/auth/handelPassword';
import { NextOptions } from '../auth/[...nextauth]';
import { unstable_getServerSession } from "next-auth/next"

export default async function handlerSetUSer (req, res) {
    if ( req.method !== 'POST' ) return;
    const { user: {email}} = await unstable_getServerSession( req, res, NextOptions );
    const data = { ...req.body };
    // const { email, password } = JSON.parse( req.headers.authorization );
    
    // if (!password || password.trim().length === 0) {
    //     res.status( 200 ).json( { message: 'password is failed' } );
    //     return;
    // }
    
    const client = await connectToDataBase();
    const db = client.db('ecommerce');


    const upDateUser = await db.collection( 'user' ).updateOne( { email }, { $set: { ...data } } );

    // const finalUpdate = await db.collection( 'E-Commerce' ).findOne( { email } );
    res.status( 200 ).json( { message: 'Update is Done' } );
    client.close();
    return;

    
}   