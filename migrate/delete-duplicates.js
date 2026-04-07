const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const deleteAll = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const result = await mongoose.connection.db.collection('beginnersguides').deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} documents`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

deleteAll();