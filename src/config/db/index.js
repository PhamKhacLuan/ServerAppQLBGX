const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function connect() {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.urlConnectDB), {
            useNewUrlParser: true,
            useUnifielTopology: true,
            useCreateIndex: true,
        }
        console.log("Connect successed");
    } catch (error) {
        console.log("Connect failure");
    }
}
module.exports = { connect };