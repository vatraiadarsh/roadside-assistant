const stripe = require("stripe")('sk_test_51Ko29zJRs3JxT9wsThV502e8WCkzYb4FYuaxw1WVRWKOo7pMsRChcAlXrRQF0ypLAFcK4p0hStldGrYQw3JqNdig00obutY7qF');
const ServiceRequest = require('../models/serviceRequestModel');

module.exports = (app) => {
    const clientDomain = process.env.APPLICATION_CLIENT_DOMAIN;
    app.post('/create-checkout-session/:id', async (req, res) => {
        const serviceRequest = await ServiceRequest.findById(req.params.id);
        if (serviceRequest) {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    name: serviceRequest.service_type,
                    description: serviceRequest.service_description,
                    images: [
                        'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                    ],
                    amount: serviceRequest.price * 100,
                    currency: 'aud',
                    quantity: 1,
                },
                ],

                mode: 'payment',
                success_url: `${clientDomain}/profile?success=true`,
                cancel_url: `${clientDomain}/profile?canceled=true`,
            });
            res.redirect(303, session.url);

            if (session) {
                //  update the service request status to 'paid'
                await ServiceRequest.findByIdAndUpdate(req.params.id, {
                    status: 'Paid'
                });

            }
        } else {
            res.redirect(303, `${clientDomain}/profile?canceled=true`);
        }

    });
}