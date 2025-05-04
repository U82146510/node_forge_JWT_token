import fs from 'fs';

function base64(input:unknown):string|undefined{
    try {
        const buffer = Buffer.from(JSON.stringify(input))
        .toString("base64")
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
        return buffer;
    } catch (error) {
        console.error(error);
    }
};



const head:{alg:'none',typ:'JWT'}={
    alg:'none',
    typ:'JWT',
};

const payload={
    isAdmin:true,
};


const get_token = ():string|undefined=>{
    try {
        const encode_head = base64(head);
        const encode_payload = base64(payload);
        const token = `${encode_head}.${encode_payload}.`;
        return token;
    } catch (error) {
        console.error(error);
    }
};

console.log(get_token())