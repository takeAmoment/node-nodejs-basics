import { pipeline, Transform } from 'stream'
import { stdout, stdin } from 'process';

import { COMMON_ERROR_MESSAGE } from '../variables/common.js';

class ReverseDataTransform extends Transform {
    _transform(data, encoding, callback) {
        const reversedData = data.toString().split('').reverse().join('');
        this.push(reversedData);
        callback();
    }
}

const transform = async () => {
    const transformedData = new ReverseDataTransform();

    pipeline(stdin, transformedData, stdout, (error) => {
        if(error) {
            throw new Error(COMMON_ERROR_MESSAGE)
        }
    })
};

await transform();