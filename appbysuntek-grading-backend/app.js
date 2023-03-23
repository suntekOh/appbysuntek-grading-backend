"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("./routes/index");
const customerRouter_1 = require("./routes/customerRouter");
const cryptoRouter_1 = require("./routes/cryptoRouter");
const debug = require('debug')('my express app');
const app = express();
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use('/', index_1.default);
app.use("/customers", customerRouter_1.default);
app.use("/crypto", cryptoRouter_1.default);
// catch 404 and forward to error handler
//app.use((req, res, next) => {
//    const err = new Error('Not Found');
//    err[ 'status' ] = 404;
//    next(err);
//});
// error handlers
//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
//        res.status(err[ 'status' ] || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}
//// production error handler
//// no stacktraces leaked to user
//app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});
/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), function () {
    debug(`Express server listening on port ${server.address().port}`);
});
//# sourceMappingURL=app.js.map