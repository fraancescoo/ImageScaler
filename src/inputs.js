/**
 * @param {String} question 
 * @returns {Promise<String>}
 */
module.exports = async (question) => {
    return new Promise(async resolve => {
        const readline = await require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        await readline.question(question, async res => {
            await readline.close();
            await resolve(res);
        });
    });
}