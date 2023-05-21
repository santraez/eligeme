import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGOUSER, MONGOPASSWORD, MONGOHOST, MONGOPORT, MONGODATABASE } = process.env;
const MONGO_URL = `mongodb://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}:${MONGOPORT}/${MONGODATABASE}?authSource=admin`;

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    return console.log('DATABASE IS CONNECTED');
  } catch (err) {
    return console.log('DATABASE IS NOT CONNECTED ' + err);
  };
};

export default connect;