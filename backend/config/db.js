const mongoose = require('mongoose');


(async function () {
  try {
      await mongoose.connect(process.env.MONGODB_URI, {});
      console.log('Connected to MongoDB');

  } catch (err) {
    console.error('err\n',err.message);
    process.exit(1);
  }
})()
