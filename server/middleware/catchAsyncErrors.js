const CatchAsyncErros = (theFunc) => (req, resp, next) => {
  Promise.resolve(theFunc(req, resp, next)).catch(next);
};

export default CatchAsyncErros;
