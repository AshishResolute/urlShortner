import { app } from "../routes/app.js";
import request from 'supertest'
import {describe,it} from '@jest/globals'
describe('AUTH routes',()=>{

    describe('POST /auth/signup',()=>{

        it(`should return 400 status for Invalid Input`,async()=>{
           const res = await request(app)
           .post('/auth/signUp')
           .send({email:'testuser.com',password:`Test@user`,confirmPassword:`Test@user`,user_name:`Test User`})

           expect(res.statusCode).toBe(400);
           expect(res.body).toHaveProperty(`message`)
        })
    })
})