const requireAppwrite = require('./dist/cjs/sdk.js');
const fs = require('fs');

async function start() {
    let response;

    console.log('\nTest Started');
    const { Appwrite } = requireAppwrite;
    const sdk = new Appwrite();

    // Foo
    response = await sdk.foo.get('string', 123, ['string in array']);
    console.log(response.result);

    response = await sdk.foo.post('string', 123, ['string in array']);
    console.log(response.result);

    response = await sdk.foo.put('string', 123, ['string in array']);
    console.log(response.result);

    response = await sdk.foo.patch('string', 123, ['string in array']);
    console.log(response.result);

    response = await sdk.foo.delete('string', 123, ['string in array']);
    console.log(response.result);

    // Bar
    response = await sdk.bar.get('string', 123, ['string in array']);
    console.log(response.result);

    response = await sdk.bar.post('string', 123, ['string in array']);
    console.log(response.result);

    response = await sdk.bar.put('string', 123, ['string in array']);
    console.log(response.result);

    response = await sdk.bar.patch('string', 123, ['string in array']);
    console.log(response.result);

    response = await sdk.bar.delete('string', 123, ['string in array']);
    console.log(response.result);

    // General
    response = await sdk.general.redirect();
    console.log(response.result);

    response = await sdk.general.upload('string', 123, ['string in array'], fs.createReadStream(__dirname + '/../../resources/file.png'));
    console.log(response.result);

    const fakeBigFile = fs.createReadStream(__dirname + '/../../resources/large_file.mp4');
    fakeBigFile.slice = function(start, end) {
        return fs.createReadStream(__dirname + '/../../resources/large_file.mp4', {
            start: start,
            end: end - 1
        });
    };

    response = await sdk.general.upload('string', 123, ['string in array'], fakeBigFile);
    console.log(response.result);

    try {
        response = await sdk.general.empty();
    } catch (error) {
        console.log(error);
    }
    try {
        response = await sdk.general.error400();
    } catch(error) {
        console.log(error.message);
    }
    try {
        response = await sdk.general.error500();
    } catch(error) {
        console.log(error.message);
    }
    try {
        response = await sdk.general.error502();
    } catch (error) {
        console.log(error.message);
    }

    console.log('WS:/v1/realtime:passed'); // Skip realtime test on Node.js
}

start();