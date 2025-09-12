const notFoundHandler = (req, res, next) => {
  res.status(404).json({ errorMessage: "This route does not exist" });
};

const errorHandler = (err, req, res, next) => {
  console.error("ERROR", req.method, req.path, err);

  if (!res.headersSent) {
    res.status(500).json({
      errorMessage: "Internal server error. Check the server console",
    });
  }
};

export default (app) => {
  app.use(notFoundHandler);
  app.use(errorHandler);
};
