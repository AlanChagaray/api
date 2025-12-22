export const handleRol = (...rolesAllowed) => {
  return (req, res, next) => {
    if (!req.user || !rolesAllowed.includes(req.user.rol)) {
      return res.status(403).json({ message: "Usuario no autorizado." });
    }
    next();
  };
};
