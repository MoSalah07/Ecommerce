export default function getUniqeArray(data, type = "") {
    const arr = [...new Set( data.map( ( el ) => el[type] ) )];
    return arr;
}
