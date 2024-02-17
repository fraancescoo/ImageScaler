const input = require('./inputs');
const scaler = require('./scaler');
const saver = require('./saver');
const path = require('path');

async function sendTitle() {
    await console.clear();
    await console.log([
'',
'.___                                _________             .__                ',
'|   | _____ _____     ____   ____  /   _____/ ____ _____  |  |   ___________ ',
'|   |/     \\\\__  \\   / ___\\_/ __ \\ \\_____  \\_/ ___\\\\__  \\ |  | _/ __ \\_  __ \\',
'|   |  Y Y  \\/ __ \\_/ /_/  >  ___/ /        \\  \\___ / __ \\|  |_\\  ___/|  | \\/',
'|___|__|_|  (____  /\\___  / \\___  >_______  /\\___  >____  /____/\\___  >__|   ',
'          \\/     \\//_____/      \\/        \\/     \\/     \\/          \\/       ',
'',
    ].join('\n'));
}

(async () => {
    async function init() {
        await sendTitle();
        
        const image = await input('Insert image path here: ');
        if(!image) return await init();

        const scale = await parseInt(await input('Insert scale amount here: '));
        if(!scale) return await init();

        const canvas = await scaler(image, scale);
        let output = await path.join(__dirname.split('\\').splice(0, __dirname.split('\\').length-1).join('\\'), 'output');
        let filename = await image.split('\\').pop();
        console.log(filename)
        await saver(canvas, output, filename);
    }

    await init();
})();