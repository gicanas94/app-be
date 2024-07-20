const setHeaders = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
}

export default setHeaders;