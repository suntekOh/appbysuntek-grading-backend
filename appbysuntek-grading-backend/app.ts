import "reflect-metadata";
import * as express from 'express';
import { AddressInfo } from "net";
import indexRouter from './routes/index';
import { container, Lifecycle } from "tsyringe";
import { UserRepository } from './dataAccessLayer/implementations/user-repository';
import { UserRouter } from './routes/user-router';
import { DbCommand } from "./dataAccessLayer/implementations/db-command";
import { Constants } from "./models/constants";
import { DbConnection } from "./dataAccessLayer/implementations/db-connection";
import { QueryHelper } from "./dataAccessLayer/implementations/query-helper";
import { Encrypter } from "./services/crypto/implementations/encrypter";
import { CryptoConfig } from "./services/crypto/implementations/crypto-config";
import { DbConfig } from "./dataAccessLayer/implementations/db-config";
import * as dotenv from 'dotenv'
import { verifyToken } from "./services/verify-token";
import { CryptoRouter } from "./routes/crypto-router";
import * as cors from 'cors'
import { AuthTokenCookieService } from "./services/jwt-token-cookie-service/auth-token-cookie-service";

const app = express();
// Set CORS options 
const cors = require(`cors`)

const whitelist = [
    'http://localhost:3000', // not https
]

const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        // `!origin` allows server-to-server requests (ie, localhost requests)
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS: " + origin))
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

dotenv.config();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

//app.use(express.static(path.join(__dirname, 'public')));


container.register(
    Constants.DI.IUserRepository,
    { useClass: UserRepository },
    { lifecycle: Lifecycle.Singleton }
);

container.register(
    Constants.DI.IDbCommand,
    { useClass: DbCommand },
    { lifecycle: Lifecycle.Singleton }
);

container.register(
    Constants.DI.IConnectionPool,
    { useClass: DbConnection },
    { lifecycle: Lifecycle.Singleton }
);

container.register(
    Constants.DI.IQueryHelper,
    { useClass: QueryHelper },
    { lifecycle: Lifecycle.Singleton }
);

container.register(
    Constants.DI.IEncrypter,
    { useClass: Encrypter },
    { lifecycle: Lifecycle.Singleton }
);

container.register(
    Constants.DI.ICryptoConfig,
    { useClass: CryptoConfig },
    { lifecycle: Lifecycle.Singleton }
);

container.register(
    Constants.DI.IDbConfig,
    { useClass: DbConfig },
    { lifecycle: Lifecycle.Singleton }
);

container.register(
    Constants.DI.IAuthTokenCookieService,
    { useClass: AuthTokenCookieService },
    { lifecycle: Lifecycle.Singleton }
);


container.registerSingleton(UserRouter);
container.registerSingleton(CryptoRouter);
const userRouter = container.resolve(UserRouter);
const cryptoRouter = container.resolve(CryptoRouter);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

const url_path = process.env.URL_PATH;
app.use(`/${url_path}/`, indexRouter);
app.use(`/${url_path}/users`, userRouter.router);
app.use(`/${url_path}/crypto`, cryptoRouter.router);

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

const server = app.listen('1337', function () {
    console.log(`Express server listening on port ${(server.address() as AddressInfo).port}`);
});


