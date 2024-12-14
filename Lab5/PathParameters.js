export default function PathParameters(app) {
  app.get("/api/lab5/add/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
  });

  app.get("/api/lab5/subtract/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const difference = parseInt(a) - parseInt(b);
    res.send(difference.toString());
  });

  app.get("/api/lab5/multiply", (req, res) => {
    const { a, b } = req.query;
    const product = parseInt(a) * parseInt(b);
    res.send(product.toString());
  });

  app.get("/api/lab5/divide", (req, res) => {
    const { a, b } = req.query;
    if (parseInt(b) === 0) {
      res.send("Cannot divide by zero");
    } else {
      const quotient = parseInt(a) / parseInt(b);
      res.send(quotient.toString());
    }
  });
}
