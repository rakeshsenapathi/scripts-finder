import data from './data';

const TIME_OUT = 0;

export default {
    get_scripts: (cb) => setTimeout(() => cb(data.scripts), TIME_OUT)
}