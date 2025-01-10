import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  debateService,
  emotionDetectionService,
} from "../controllers/services.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

//secured routes
router.route("/debate").post(verifyJWT, upload.single("audio"), debateService);
router
  .route("/emotion-detection")
  .post(verifyJWT, upload.single("file"), emotionDetectionService);

export default router;
