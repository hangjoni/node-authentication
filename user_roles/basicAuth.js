const { ROLE } = require("./data");

function authUser(req, res, next) {
  if (req.user == null) {
    res.status(403);
    return res.send("You need to sign in");
  }
  next();
}

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401);
      return res.send("Not allowed");
    }
    next();
  };
}

function authProject(req, res, next) {
  if (req.user.role !== ROLE.ADMIN && req.project.userId !== req.user.id) {
    res.status(401);
    return res.send("Not allowed to view this project");
  }
  next();
}

module.exports = {
  authUser,
  authRole,
  authProject,
};
