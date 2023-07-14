const Joi = require('joi');

// Define middleware for validation
const validateQueryParameters = (req, res, next) => {

    const schema = Joi.object({
        
        from: Joi.date().min("2000-01-01").required(),
        to: Joi.date().min("2000-01-01").required(),
    });
    
    const { error } = schema.validate(req.query); // Validate request data


    if (error) {
        // If validation fails, send an error response
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    const { from, to } = req.query
    const _from = new Date(from)
    const _to = new Date(to)

    //console.log(_from, _to);
    if (_to < _from) {
        return res.status(400).json({
            message: "incorrect date range"
        });
    }

    // If validation succeeds, move to the next middleware or route handler
    next();
};

module.exports = validateQueryParameters