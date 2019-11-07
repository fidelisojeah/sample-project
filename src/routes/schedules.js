import { Router } from 'express';

import ScheduleController from '@controllers/schedules';


const router = Router();
const scheduleController = new ScheduleController();

router.post('/', scheduleController.newSchedule.bind(scheduleController));
router.get('/:userId/', scheduleController.listUpcoming.bind(scheduleController));

export default router;
