// store.js
const fs = require('fs');
const path = require('path');



const DATA_DIR = path.join(__dirname, 'data');

const filePath = (name) => path.join(DATA_DIR, `${name}.json`);

const read = (name) => {
  try {
    const raw = fs.readFileSync(filePath(name));
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
};

const write = (name, data) => {
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2));
};

module.exports = { read, write };

