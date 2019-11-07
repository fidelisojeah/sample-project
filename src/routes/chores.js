import { Router } from 'express';

import ScheduleController from '@controllers/schedules';
import ChoreController from '@controllers/chores';


const router = Router();
const choreController = new ChoreController();
const scheduleController = new ScheduleController();

router.post('/:id/schedule', scheduleController.createFromChore.bind(scheduleController));

router.get('/', choreController.getAll.bind(choreController));
router.post('/', choreController.create.bind(choreController));

router.get('/:id', choreController.getOne.bind(choreController));
router.put('/:id', choreController.update.bind(choreController));
router.delete('/:id', choreController.delete.bind(choreController));

export default router;
