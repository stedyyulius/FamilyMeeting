import { Router } from 'express';

import { getMeetings, createMeeting, editMeeting } from '../controllers/meetings';

const meetingRouter = Router();

meetingRouter.get('/:familyId', getMeetings);
meetingRouter.post('/', createMeeting);
meetingRouter.put('/', editMeeting);

export default meetingRouter;

