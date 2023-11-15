const setCurrentArea = (area) => (req, res, next) => {
  if (!res.locals) {
    res.locals = {};
  }
  res.locals.area = area;
  next();
};

module.exports = setCurrentArea;
