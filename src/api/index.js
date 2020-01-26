import data from './data';

const TIME_OUT = 0;

// Mocking client-server 
export default {
    get_scripts: (cb) => setTimeout(() => cb(data.scripts), TIME_OUT),
    get_labels: (cb) => setTimeout(() => cb(data.labels), TIME_OUT)
}