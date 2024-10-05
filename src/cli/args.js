const PREFIX = '--';

const parseArgs = () => {
    const args = process.argv;
    let argsValues = [];
    
    args.forEach((item, index) => {
        if(item.startsWith(PREFIX)) {
            argsValues.push(`${item} is ${args[index + 1]}`);
        }
        return;
    });

    const result = argsValues.join(', ');

    console.log(result);
};

parseArgs();