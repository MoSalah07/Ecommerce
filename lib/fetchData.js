import axios from "axios";


export default async function fetchData(type) {
    const URL = `${ process.env.VERCEL_URL }/${ type }`;
    const { data } = await axios.get( URL );
    return data;
}