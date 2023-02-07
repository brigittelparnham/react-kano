const express = require('express');

const app = express();
const port = process.env.API_PORT || 3000;
const cors = require('cors');
const services = require('./services');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Kano Api');
})

app.post('/login', async (req, res, next) => {
  try{
    console.log(req.body);
    const jwt = await services.loginUser(req.body.username, req.body.password);
    res.send(jwt);
    next();
  }catch(e){
    next(e);
  }

})


/**
 * reject any requests with an invalid JWT
 * 
 */
app.use((res,req,next)=>{
  //TODO

  next();
})

/**
 * 
 * get a personalised feed for the user
 * 
 */
app.get('/feed',(res,req,next)=>{
  //TODO


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})