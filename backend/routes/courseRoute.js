import express from 'express';
import { createCourse, getPublishedCourses, getCreaterCourses, updateCourse, getCourses, getCourseById, deleteCourse, createLecture, getAllLectures, updateLecture, removeLecture, getLectureById, getCourseByCreatorId } from '../controllers/courceController.js';
import { isAuth } from '../middlewares/isAuth.js';
import { upload } from '../middlewares/multer.js';
import { createReview } from '../controllers/rewiewController.js';
import { searchWithAI } from '../controllers/searchController.js';

const courseRouter = express.Router();

courseRouter.post('/create', isAuth, createCourse);
courseRouter.get('/published', getPublishedCourses);
courseRouter.get('/getcreatorcourses', isAuth, getCreaterCourses);
courseRouter.post('/update/:courseId', isAuth, upload.single('thumbnail'), updateCourse);
courseRouter.get('/getcourses', getCourses);
courseRouter.get('/getcoursesbycreator/:creatorId', getCourseByCreatorId);
courseRouter.get('/getcoursebyid/:courseId', getCourseById);
courseRouter.delete('/deletecourse/:courseId', isAuth, deleteCourse);

//lecture routes
courseRouter.post('/createlecture/:courseId', isAuth, createLecture);
courseRouter.get('/getalllectures/:courseId', isAuth, getAllLectures);
courseRouter.get('/getlecturebyid/:lectureId', isAuth, getLectureById);
courseRouter.post('/updatelecture/:lectureId', isAuth, upload.single('videoUrl'), updateLecture);
courseRouter.delete('/deletelecture/:lectureId', isAuth, removeLecture);

// review routes
courseRouter.post('/createreview', isAuth, createReview);

//for search
courseRouter.post('/search', searchWithAI);

export default courseRouter;