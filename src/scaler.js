const { createCanvas, loadImage, Image, Canvas } = require('canvas');

/**
 * @param {String} path 
 * @param {number} scale 
 * @returns {Canvas} 
 */
module.exports = async (path, scale) => {
    const image = await loadImage(path);

    const canvas = await createCanvas(image.width, image.height);
    const ctx = await canvas.getContext('2d');

    await ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const img = await new Image();
    img.src = await canvas.toDataURL();

    const scaledCanvas = await createCanvas(img.width * scale, img.height * scale);
    const scaledCtx = await scaledCanvas.getContext('2d');

    await scaledCtx.drawImage(img, 0, 0);

    const originalImageData = await scaledCtx.getImageData(0, 0, img.width, img.height);

    const scaledImageData = await scaledCtx.createImageData(scaledCanvas.width, scaledCanvas.height);

    for (let y = 0; y < scaledCanvas.height; y++) {
        for (let x = 0; x < scaledCanvas.width; x++) {
            const originalX = Math.floor(x / scale);
            const originalY = Math.floor(y / scale);

            const originalIndex = (originalY * img.width + originalX) * 4;
            const scaledIndex = (y * scaledCanvas.width + x) * 4;

            for (let i = 0; i < 4; i++) {
                scaledImageData.data[scaledIndex + i] = originalImageData.data[originalIndex + i];
            }
        }
    }

    await scaledCtx.putImageData(scaledImageData, 0, 0);
    return scaledCanvas;
}