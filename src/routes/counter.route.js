import { Router } from 'express';
import * as counterCtrl from '../controllers/public.controller';

const counter = Router();

counter.get('/', counterCtrl.countItemsDb);

export default counter;