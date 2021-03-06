import { Router } from 'express';
import UserController from "@controllers/users";


const router = Router();
const userController = new UserController();

router.post('/', userController.create);
router.get('/', userController.getAll);

export default router;
