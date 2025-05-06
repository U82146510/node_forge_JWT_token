import { get_token } from './forge_token/forge_token.ts';
import readline from "readline";
import {start_brute} from './brute_token/brute_main.ts';

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
        start_brute()
    }
    rl.close();
});