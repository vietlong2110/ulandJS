const INDEX = 'uland';
const HOUSINGS = 'housings';

let hostname = process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'development'
    ? 'elasticsearch:9200'
    : 'localhost:9200';

module.exports = {
    housings: {
        hosts: [hostname],
        index: INDEX,
        type: HOUSINGS
    }
};
