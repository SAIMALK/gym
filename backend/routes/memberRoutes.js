import express from 'express';
const router = express.Router();
import {
    getMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
  } from '../controllers/memberController.js';


  router.route('/').get(getMembers).post( createMember);
  router
  .route('/:id')
  .get(getMemberById)
  .put( updateMember)
  .delete(deleteMember);

export default router;