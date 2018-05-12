// Requiring our Products model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the products
  //this works
  app.get("/api/products/", function (req, res) {
    db.Products.findAll({})
      .then(function (allProds) {
        res.json(allProds);
      }).catch(function (err) {
        res.json(err);
      });
  });

  // Get route for returning products of a specific category
  //this works
  app.get("/api/products/category/:category", function (req, res) {
    db.Products.findAll({
        where: {
          category: req.params.category
        }
      })
      .then(function (categProd) {
        res.json(categProd);
      }).catch(function (err) {
        res.json(err);
      });
  });

  // Get route for retrieving a single product
  // app.get("/api/products/:id", function (req, res) {
  //   db.Products.findOne({
  //       where: {
  //         id: req.params.id
  //       }
  //     })
  //     .then(function (oneProd) {
  //       res.json(oneProd);
  //     }).catch(function (err) {
  //       res.json(err);
  //     });
  // });

  // POST route for saving a new product
  //this works
  app.post("/api/products", function (req, res) {
    console.log(req.body);
    db.Products.create({
        brand: req.body.brand,
        product_name: req.body.product_name,
        color: req.body.color,
        photo: req.body.photo,
        category: req.body.category
      })
      .then(function (newProd) {
        res.json(newProd);
      }).catch(function (err) {
        res.json(err);
      });
  });

  // DELETE route for deleting products
  app.delete("/api/products/:id", function (req, res) {
    db.Products.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function (deleteProd) {
        res.json(deleteProd);
      }).catch(function (err) {
        res.json(err);
      });
  });

  // PUT route for updating products
  // app.put("/api/products", function (req, res) {
  //   db.Products.update(req.body, {
  //       where: {
  //         id: req.body.id
  //       }
  //     })
  //     .then(function (updateProd) {
  //       res.json(updateProd);
  //     }).catch(function (err) {
  //       res.json(err);
  //     });
  // });
};