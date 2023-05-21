import { Router } from 'express';
import * as publicCtrl from '../controllers/public.controller';

const router = Router();

router.post('/', publicCtrl.createItem);
router.get('/:itemId', publicCtrl.readItemById);
router.get('/', publicCtrl.countItemsDb);

export default router;