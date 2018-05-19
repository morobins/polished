// Requiring our Products model
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

// import formidable
var formidable = require('formidable');
var cloudinary = require('cloudinary');
require('dotenv').config();

// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting a specific product or all of the products
  //this works
  app.get("/api/products", function (req, res) {
    console.log(req.query);
    // "/api/products?category=face&brand=smashbox&color=red&product_name=cccream"
    if (Object.keys(req.query).length !== 0) {
      db.Products.findAll({
        where: {
          [Op.or]: [
            {brand: req.query.brand}, 
            {product_name: req.query.product_name}, 
            {color: req.query.color}, 
            {category: req.query.category}
          ] 
        }
      })
      .then(function (allProds) {
        res.json(allProds);
      }).catch(function (err) {
        res.json(err);
      });
    } else {
      db.Products.findAll({})
      .then(function (allProds) {
        res.json(allProds);
      }).catch(function (err) {
        res.json(err);
      });
    }
    
  });

  app.get("/api/add", function(req,res) {
    
    if (!req.query) {
     return res.json(false);
    }

    var productId = req.query.product_id;

    db.Products.findOne({
      where: {
        id: productId
      }
    }).then(function(productData) {
      res.json(productData);
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    })

  })

  // POST route for saving a new product
  //this works
  app.post("/api/add", function (req, res) {

    // Create a new instance of formidable to handle the request info
    var form = new formidable.IncomingForm();

    // parse information for form fields and incoming files
    form.parse(req, function (err, fields, files) {
      console.log(fields);
      console.log(files.photo);

      if (files.photo) {
        // upload file to cloudinary, which'll return an object for the new image
        cloudinary.uploader.upload(files.photo.path, function (result) {
          console.log(result);
          // create new user
          db.Products.create({
            category: fields.category,
            brand: fields.brand,
            product_name: fields.product_name,
            color: fields.color,
            notes: fields.notes,
            photo: result.secure_url
          }).then(function () {
            res.json("/add");
          }).catch(function (err) {
            console.log(err);
            res.json(err);
          });
        });
      } else {
        db.Products.create({
            category: fields.category,
            brand: fields.brand,
            product_name: fields.product_name,
            color: fields.color,
            notes: fields.notes,
        }).then(function (newProduct) {
          res.json(newProduct);
        }).catch(function (err) {
          console.log(err);
          res.json(err);
        });
      }
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
  app.put("/api/add/:id", function (req, res) {

    var form = new formidable.IncomingForm();

    // parse information for form fields and incoming files
    form.parse(req, function (err, fields, files) {
      console.log(fields);
      console.log(files.photo);

      if (files.photo) {
        // upload file to cloudinary, which'll return an object for the new image
        cloudinary.uploader.upload(files.photo.path, function (result) {
          console.log(result);
          // create new user
          db.Products.update({
            category: fields.category,
            brand: fields.brand,
            product_name: fields.product_name,
            color: fields.color,
            notes: fields.notes,
            photo: result.secure_url
          }, {
            where: {
              id: req.params.id
            }
          }).then(function (updatedProductInfo) {
            res.json(updatedProductInfo);
          }).catch(function (err) {
            console.log(err);
            res.json(err);
          });
        });
      } else {
        db.Products.update({
          category: fields.category,
          brand: fields.brand,
          product_name: fields.product_name,
          color: fields.color,
          notes: fields.notes,
        }, {
          where: {
            id: req.params.id
          }
        }).then(function (updatedProductInfo) {
          res.json(updatedProductInfo);
        }).catch(function (err) {
          console.log(err);
          res.json(err);
        });
      }
    });

  });

//======================================================//

    // Using the passport.authenticate middleware with our local strategy.
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    console.log(req.user);
    res.json("/home");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {

    // Create a new instance of formidable to handle the request info
    var form = new formidable.IncomingForm();

    // // parse information for form fields and incoming files
    form.parse(req, function (err, fields) {
      console.log(fields);
        db.User.create({
          email: fields.email,
          password: fields.password,

        }).then(function (userInfo) {
          req.login(userInfo, function (err) {
            if (err) {
              console.log(err)
              return res.status(422).json(err);
            }
            console.log(req.user);
            res.json("/home");

          });
          
          // res.redirect(307, "/api/login");
        }).catch(function (err) {
          console.log(err);
          res.json(err);
          // res.status(422).json(err.errors[0].message);
        });
      });
    });
    


  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    console.log(req.user);
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      console.log(req.user);
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};