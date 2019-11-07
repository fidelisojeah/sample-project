import { Router } from 'express';
import userRouter from './users';
import choreRouter from './chores';
import scheduleRouter from './schedules';

const router = Router();

/* GET home page. */
router.get('/', function (_req, response, _next) {
    response.send('Welcome to API')
});
router.get('/api/v1', function (_req, response, _next) {
    response.send('Welcome to API')
});

router.use('/api/v1/users', userRouter);
router.use('/api/v1/chores', choreRouter);
router.use('/api/v1/schedules', scheduleRouter);

export default router;
