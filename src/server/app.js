import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { config } from 'dotenv';

import indexRouter from '@routes/index';
import { RouteNotFoundException } from '@helpers/exceptions';
import errorhandler from '@middlewares/errorhandler';

config();
const app = express();


app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(errorhandler)

// catch 404 and forward to error handler
app.use((request, response, next) => {
    next(new RouteNotFoundException(request));
});

// error handler qouls fix this
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err, 'ERROR')
    // render the error page
    res.status(err.status || 500);
    res.send({
        ...res.locals.error,
        message: err.message
    });
});

export default app;
