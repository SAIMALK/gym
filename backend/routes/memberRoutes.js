import express from 'express';
const router = express.Router();
import {
    getMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
  } from '../controllers/memberController.js';
  import { protect } from '../middleware/authMiddleware.js';
  import checkObjectId from '../middleware/checkObjectId.js';


  router.route('/').get(getMembers).post(protect, createMember);
  router
  .route('/:id')
  .get(checkObjectId, getMemberById)
  .put(protect, checkObjectId, updateMember)
  .delete(protect, checkObjectId, deleteMember);

export default router;