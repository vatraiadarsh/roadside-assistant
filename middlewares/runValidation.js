const { validationResult } = require('express-validator');

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array().map(error => error.msg)[0];
        return res.status(400).json({ error });
    };
    next();
};
