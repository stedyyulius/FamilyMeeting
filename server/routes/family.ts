import { Router } from 'express';

import { getFamily, createFamily, editFamily } from '../controllers/family';

const familyRouter = Router();

familyRouter.get('/:familyId', getFamily);
familyRouter.post('/', createFamily);
familyRouter.put('/', editFamily);

export default familyRouter;

