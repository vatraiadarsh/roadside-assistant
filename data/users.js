const bcrypt = require('bcryptjs');

const users = [
    {
        title: "Mr",
        first_name: "Adarsh",
        last_name: "Bhattarai",
        gender: "Male",
        email: "admin@example.com",
        date_of_birth: 2011-03-09,
        mobile_number: 9876433234,
        address: "5 falcon street",
        password: bcrypt.hashSync("admin"),
        avatar: "",
        role: "admin"
    },
    {
        title: "Mr",
        first_name: "John",
        last_name: "Doe",
        gender: "Male",
        email: "professional@example.com",
        date_of_birth: 2011-03-09,
        mobile_number: 9876433234,
        address: "5 xyz street",
        password: bcrypt.hashSync("professional"),
        avatar: "",
        role: "professional"
    },
    {
        title: "Mr",
        first_name: "Jonny",
        last_name: "Doe",
        gender: "Male",
        email: "user@example.com",
        date_of_birth: 2011-03-09,
        mobile_number: 9876433234,
        address: "5 abc street",
        password: bcrypt.hashSync("user"),
        avatar: "",
        role: "user"
    }
];

module.exports = users;