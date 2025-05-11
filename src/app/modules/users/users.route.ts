// users.route.ts
import express from 'express';
import { UserControllers } from './users.controller';
import auth from '../../middlewares/auth';
// import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.get('/', UserControllers.getAllUser);
router.get('/me', auth('user', 'admin', 'vendor', 'seller'), UserControllers.getMe);
router.get('/:userId', UserControllers.getSingleUserById);
router.get('/my-orders/:userId',auth('user', 'admin', 'vendor', 'seller'), UserControllers.getMyOrders);
// router.get('/my-posts/:authorId', auth('user', 'admin'), UserControllers.getMyPosts);

// router.put('/me', auth('user', 'admin'),
//   multerUpload.single("file"),
//   (req: Request, res: Response, next: NextFunction) => {
//     if(req?.body?.data){
//       req.body = JSON.parse(req?.body?.data);
//     }
//     next();
//   },
// UserControllers.updateProfile);


router.delete('/remove-user/:userId', auth('admin'), UserControllers.deleteUser);
router.put('/make-admin/:userId', auth('admin'),  UserControllers.changeUserRoleToAdmin);
router.put('/make-user/:userId', auth('admin'),  UserControllers.changeUserRoleToUser);
router.put('/suspend-user/:userId', auth('admin'),  UserControllers.suspendUser);

router.put('/follow/:userId', auth('user', 'admin'), UserControllers.followUser);
router.put('/unfollow/:userId', auth('user', 'admin'), UserControllers.unfollowUser);


export const userRoutes = router;
