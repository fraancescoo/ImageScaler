const { Canvas } = require('canvas');
const fs = require('fs');
const path = require('path');

/**
 * @param {Canvas} canvas 
 * @param {String} output 
 * @param {String} filename 
 */
module.exports = async (canvas, output, filename) => {
    try {
        let outputFolder = await fs.lstatSync(output);
        if(!outputFolder.isDirectory()) throw new Error();
    }catch(e) {
        await fs.mkdirSync(output);
    }
    return await fs.writeFileSync(await path.join(output, filename), await canvas.toBuffer('image/png'));
}