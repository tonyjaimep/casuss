const authenticated = (req, res, next) => {
  if (req.user)
    return next();

  res.status(401).end();
};

module.exports = authenticated;
