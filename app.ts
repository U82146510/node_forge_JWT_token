import { get_token } from "./forge_token/forge_token.ts";
import {brute} from './brute_token/brute.ts';
import readline from "readline";

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

rl.question('Your input:',(input:string)=>{
    if(input==='forge'){
        get_token();
        console.log('done');
    };
    if(input==='brute'){
        const rs = brute();
        if(!rs){
            console.log('done, nothing found!');
        }
        console.log('Result:',rs);
    }
});