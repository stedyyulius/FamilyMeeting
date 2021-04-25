import { Router } from 'express';

import { getFamilies, getFamily, createFamily, editFamily } from '../controllers/family';

const familyRouter = Router();

familyRouter.get('/all', getFamilies);
familyRouter.get('/', getFamily);
familyRouter.post('/', createFamily);
familyRouter.put('/:familyId', editFamily);

export default familyRouter;

