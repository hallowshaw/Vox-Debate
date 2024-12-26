import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { debateService } from "../controllers/services.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

//secured routes
router.route("/debate").post(verifyJWT, upload.single("audio"), debateService);

export default router;
