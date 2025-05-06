import { get_token } from "./forge_token/forge_token.ts";
import {brute} from './brute_token/brute.ts';
import readline from "readline";

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

console.log('\nChoose an option:');
console.log('[1] Forge JWT');
console.log('[2] Brute-force JWT');

rl.question('Your choice: ', (input: string) => {
    if (input === '1' || input.toLowerCase() === 'forge') {
        get_token();
        console.log('done');
    }

    if (input === '2' || input.toLowerCase() === 'brute') {
        const rs = brute();
        if (!rs) {
            console.log('done, nothing found!');
        } else {
            console.log('Result:', rs);
        }
    }

    rl.close();
});