const express = require('express')
const {Sequelize, DataTypes, Model, and} = require('sequelize');
const app = express()
const validator = require('validator').default;
const cors = require('cors')
const {createToken, verifyToken, createPasswordHashSync, comparePassword } = require('./auth-serv')

const sequelize = new Sequelize('fashion c.p.', 'FashionCP_user', '12345', {
    host: 'localhost',
    dialect: 'mysql'
  });

  class Fashion extends Model {}
  class Admin extends Model {}
  class User extends Model {}


  function stringType() {
    return{
        type: DataTypes.STRING,
        allowNULL: false
    }
  }



  Fashion.init({
    eMail: stringType(),
    password: stringType()
  }, {
    modelName: 'fashioncp',
    sequelize
  })


  Admin.init({
      name: stringType(),
      password: stringType()
  }, {
    modelName: 'Admin',
    sequelize
  })

  User.init({
    name: stringType(),
    password: stringType()
}, {
  modelName: 'User',
  sequelize
  })


  start() 

  async function start() {
        try {
            await sequelize.authenticate()
            await sequelize.sync()
            console.log('Successful db connection');
            startApp()
        } catch (error) {
            console.error(error)
        }
  } 


  function startApp(){

      app.use(cors())
      app.use(express.json())

      app.get('/', function(req, res){
          res.send('Успешно выполнен(а) регистрация/вход!!!')
      })

      app.post('/api/Admin', async function(req, res){
        const passwordAdmHash = createPasswordHashSync(req.body.password)
        const newAdm = await Admin.create({
          name: req.body.name,
          password: passwordAdmHash
        })
        res.send(newAdm)
      })

      
      app.post('/api/LogIn', async function(req, res){
        const userFromDB = await Admin.findOne({where: {name: req.body.name}})
        if (comparePassword(req.body.password, userFromDB.password)){
          const token = createToken(userFromDB)
          res.send({
            token
          })
        } else {
          res.status(403).send({
            message: "Неправильный пароль"
          })
        }
      })
      
      app.get('/api/fashionCP', verifyToken, async function(req, res){
        const fashion = await Fashion.findAll()
        res.send(fashion)
      })
      
      app.post('/api/User', async function(req, res){
        const passwordAdmHash = createPasswordHashSync(req.body.password)
        const newAdm = await User.create({
          name: req.body.name,
          password: passwordAdmHash
        })
        res.send(newAdm)
      })

      app.post('/api/fashion', async function (req, res){
        const logInJSON = req.body
        let valiadtionError = []
        if (!(validator.isEmail(logInJSON.eMail)))
        valiadtionError.push('Неверный адрес электронной почты')
        if (!(validator.isStrongPassword(logInJSON.password, {minLength: 7, minNumbers: 1})))
          valiadtionError.push("Неверный пароль. Минимальная длина пароля - 8 символов, минимальное количество цифр: 1, минимальное количество пробелов: 1")
        
        if (valiadtionError.length){
          res.status(400).send({message: valiadtionError})
        } else {
          const logInFromDB = await Fashion.create(logInJSON)
          res.send(logInFromDB) 
      }
    }

  )}
      
      app.listen(3000, function(){    
          console.log("Server has been started at http://localhost:3000");
        })
    
      


  
