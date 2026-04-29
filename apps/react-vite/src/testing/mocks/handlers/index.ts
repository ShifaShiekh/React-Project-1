import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import { networkDelay } from '../utils';

import { authHandlers } from './auth';
import { commentsHandlers } from './comments';
import { discussionsHandlers } from './discussions';
import { teamsHandlers } from './teams';
import { usersHandlers } from './users';

export const handlers = [
  ...authHandlers,
  ...commentsHandlers,
  ...discussionsHandlers,
  ...teamsHandlers,
  ...usersHandlers,
  
  // Healthcheck handler
  http.get(`${env.API_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),

  // Account Deletion handler
  http.delete(`${env.API_URL}/users/me`, async () => {
    await networkDelay(); // Keeps it feeling realistic
    console.log('Mock Server: User deleted from temporary memory');
    return new HttpResponse(null, { status: 204 });
  }),
];