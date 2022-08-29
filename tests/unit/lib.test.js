
const { default: mongoose } = require('mongoose');
const {User} = require('../../models/user')
const jwt = require('jsonwebtoken')
const config = require('config')
describe('jwtToken',()=>{
    it('s',()=>{
        const payload = {_id:new mongoose.Types.ObjectId(),admin:true}
        const user = new User(payload);
        const token = user.generateAuthenToken();
        const decodded = jwt.verify(token, config.get("jwt-webtoken"));
        expect(decodded).toMatchObject(payload);
    })
    
})