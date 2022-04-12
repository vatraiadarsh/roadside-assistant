const colors = require("colors");
const users = require('./data/users.js');
const services = require('./data/serviceRequest.js');
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
connectDB();

const User = require('./models/userModel');
const ServiceRequest = require('./models/serviceRequestModel');

const seeder = async () => {
  try {
    await User.deleteMany();
    await ServiceRequest.deleteMany();

    const usrs = await User.insertMany(users);
    console.log('User seeded successfully ✔'.green.bold);

    const srvs = services.map(srv => {
      return { user: usrs[2], ...srv }
      // using the normal user to seed the service request i.e user[2] which has the role of user

    });


    await ServiceRequest.insertMany(srvs);
    console.log('Service Requests seeded successfully ✔'.green.bold);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
seeder();





