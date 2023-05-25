var mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://ashtu:ashtu@cluster0.8jwtvnx.mongodb.net/',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
