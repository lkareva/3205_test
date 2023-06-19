import express, {Request, Response} from "express"
import {User, UserQuery} from '../models/user'
import {Error, RequestBody} from '../models/types'
import {check, validationResult} from 'express-validator'
import {users} from "../repo/users"

const router = express.Router()

router.post(
    '/',
    [
        check('email', 'Некорректный email').isEmail(),
        check('number', 'Должен быть номером').isNumeric().optional()
    ],
    (req: RequestBody<UserQuery>, res: Response<Array<User> | Error>) => {
        try {
            setTimeout(() => {
                const errors = validationResult(req)
                if(!errors.isEmpty()){
                    return res.status(400).json({
                        errors: errors.array(),
                        message: 'Некорректные данные'
                    })
                }
                const query = req.body
                let result: Array<User> = []
                if (query.email) {
                    result = [...users].filter(user => user.email.toLowerCase() === query.email.toLowerCase())
                }
                if(query.number) {
                    result = result.filter(user => user.number.toLowerCase() === query.number!.toLowerCase())
                }
                return res.json(result)
            },5000)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    }
)
export default router