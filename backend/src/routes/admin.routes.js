import { Router } from "express"
import { blockUsers, getCompanies, loginUser, logoutAdmin, markActive, markPlaced, uploadOpportunity } from "../controllers/admin.controller.js";
import { authenticateToken, authorizeRole } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();


router.route('/login').post(loginUser)
router.route('/upload-opportunity').post(authenticateToken , authorizeRole("CAMPUS_TPO") ,
upload.fields([
    {
        name : "company_pdf" ,
        maxCount:1
    },
    {
        name : "job_pdf",
        maxCount:1
    }
]) 
,uploadOpportunity)

router.route('/logout').post(logoutAdmin)
router.route('/company-names').get(getCompanies)
router.route('/discipline/block').post(blockUsers);
router.route('/discipline/mark-placed').post(markPlaced);
router.route('/discipline/mark-active').post(markActive);

export default router ; 