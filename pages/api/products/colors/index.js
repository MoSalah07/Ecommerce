import data  from '../../../../data/Dummy_Data';
import getUniqeArray from '../../../../lib/getUniqeArray';

export default function handler (req, res) {
    
    if (req.method === 'GET') {
        const filterColor = getUniqeArray(data, 'color')
        res.status( 200 ).json( filterColor );
    }
}