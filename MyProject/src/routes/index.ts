import * as express from 'express'
import AktifitasController from '../controller/AktifitasController'
import UserController from '../controller/UserController'
import ListController from '../controller/ListController'
import authenticate from '../middleware/UserLogin'


const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hello World!")
})

router.post("/user", UserController.create )
router.post("/login", UserController.login )

router.get("/user",authenticate,UserController.find )
router.get("/user/:id",authenticate, UserController.findOne )
router.patch("/user/:id",authenticate,UserController.patch )
router.delete("/user/:id",authenticate,UserController.delete )

router.get("/aktifitas",authenticate,AktifitasController.find )
router.get("/aktifitas/:id",authenticate,AktifitasController.findOne )
router.get("/aktifitases",authenticate,AktifitasController.findUser )
router.post("/aktifitas",authenticate,AktifitasController.create )
router.patch("/aktifitas/:id",authenticate,AktifitasController.patch )
router.delete("/aktifitas/:id",authenticate,AktifitasController.delete )

router.get("/list",authenticate, ListController.find )
router.get("/list/:id",authenticate, ListController.findOne )
router.post("/list",authenticate, ListController.create )
router.patch("/list/:id",authenticate, ListController.patch )
router.delete("/list/:id",authenticate, ListController.delete )





















export default router