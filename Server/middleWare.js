const middleware = (req, res, next) => {
    const body = req.body;
    if(!body || Object.keys(body).length === 0){
      res.send('Request Body is Empty')
    }else{
      next()
    }
  };

module.exports = middleware