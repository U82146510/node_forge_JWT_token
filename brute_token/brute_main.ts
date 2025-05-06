import { Worker } from "worker_threads";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import os from 'os';

const cpu:number = os.cpus().length;



const __filename:string = fileURLToPath(import.meta.url);
const __dirname:string = path.dirname(__filename);
const password_path:string = path.join(__dirname,"passwords.txt");
const brute_app:string = path.resolve(__dirname,'brute.ts'); 

const password_list:Array<string> = readFileSync(password_path,"utf-8").split(/\r?\n/);

const base_size:number = Math.floor(password_list.length/cpu);
const remainder = password_list.length % cpu;

export function start_brute(){

    const words:string[][] = [];

    let start:number = 0;

    for(let i = 0;i<cpu;i++){
      const extra = i<remainder ? 1 : 0;
      const end = start + base_size + extra;
      words.push(password_list.slice(start,end))
      start = end;
    };

    if (remainder > cpu) {
      let remainingItems = password_list.slice(start);
      let i = 0;
      while (remainingItems.length > 0) {
        words[i % cpu].push(remainingItems.shift()!);
        i++;
      }
    };

    words.forEach((data:Array<string>)=>{
      const worker = new Worker(brute_app,{workerData:data});
      worker.on('message',(msg)=>{
        console.log('[FOUND]',msg);
        process.exit(1);
      });
      worker.on('error',()=>{
        console.error('error during paralel spreading of work')
      })
    })
}
