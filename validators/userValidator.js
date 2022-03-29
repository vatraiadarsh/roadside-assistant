const { body } = require('express-validator');


exports.userRegistrationValidator = [
    body('title', 'Title is required').notEmpty().isIn(['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Prof']),
    body('first_name', 'First name is required').notEmpty().isLength({ min: 3 }),
    body('last_name', 'Last name is required').notEmpty().isLength({ min: 3 }),
    body('gender').isIn(["Male", "Female", "Others"]),
    body('email').isEmail().normalizeEmail().withMessage('Email must be valid'),
    body('date_of_birth').isDate(),
    body('mobile_number').isLength({ min: 10 }).withMessage('Mobile number must be at least 10 characters long'),
    body('address').isLength({ min: 10 }).withMessage('Address must be at least 10 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

