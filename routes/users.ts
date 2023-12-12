import express from 'express';
import { getUser, logIn, logOut, signUp } from '../controllers/user';
import { isLoggedIn, isNotLoggedIn } from '../middlewares';

const router = express.Router();

/*============================
  Routes: /api/users
============================*/

router.get('/', getUser);

router.post('/', isNotLoggedIn, signUp);

router.post('/login', isNotLoggedIn, logIn);

router.post('/logout', isLoggedIn, logOut);

export default router;
