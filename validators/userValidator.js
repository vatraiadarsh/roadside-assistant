const { body } = require('express-validator');


exports.userRegistrationValidator = [
    body('title', 'Title is required').notEmpty().isIn(['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Prof']),
    body('first_name', 'First name is required and should be more than 3 chars').notEmpty().isLength({ min: 3 }).isAlpha().withMessage('First name must be alphabet letters.'),
    body('last_name', 'Last name is required and should be more than 3 chars').notEmpty().isLength({ min: 3 }).isAlpha().withMessage('Last name must be alphabet letters.'),
    body('gender').isIn(["Male", "Female", "Other"]),
    body('email').isEmail().normalizeEmail().withMessage('Email must be valid'),
    body('date_of_birth').isDate(),
    body('mobile_number').isLength({ min: 10 }).withMessage('Mobile number must be at least 10 characters long'),
    body('address').isLength({ min: 10 }).withMessage('Address must be at least 10 characters long! please enter complete address including city, state, country, street, zip code'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

exports.userLoginValidator = [
    body('email').isEmail().normalizeEmail().withMessage('Email must be valid'),
    body('password').notEmpty().withMessage('Password is required'),
];

