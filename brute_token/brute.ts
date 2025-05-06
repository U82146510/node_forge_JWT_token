import { readFileSync } from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { workerData,parentPort } from 'worker_threads';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const algorithms = ["HS256", "HS384", "HS512"] as const;
const token_path = path.join(__dirname,"token.txt");
const token = readFileSync(token_path,'utf-8');

const password_list:Array<string> = workerData

for(const pass of password_list){
    for(const alg of algorithms){
        try {
            const verify = jwt.verify(token,pass.trim(),{algorithms:[alg]});
            parentPort?.postMessage(pass);
        } catch (error) {
            
        }
    }
}

