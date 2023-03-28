const adminRouter = require('./admin');
const sharedRouter = require('./shared');

function route(app) {
    app.use('/admin', adminRouter);
    app.use('/shared', sharedRouter);
}

module.exports = route;
