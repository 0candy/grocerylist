module.exports = function(app) {
  var postgres = app.dataSources.postgres;

  postgres.isActual('Shopper', function(err, actual) {
    if (!actual) {
      postgres.automigrate('Shopper', function() {
        var Shopper = app.models.Shopper;
        Shopper.attachTo(postgres);

        Shopper.create([
          {email: 'candy@ibm.com', password: 'candy'},
          {email: 'test@ibm.com', password: 'test'}],
          function(value, users) {
            createGrocery(users);        
          });
      });
    }
  });

  function createGrocery(users, cb) {
    postgres.isActual('grocerylist', function(err, actual) {
      if (!actual) {
        postgres.automigrate('grocerylist', function(err) {
          if (err) throw err;
          var Grocerylist = app.models.grocerylist;
          Grocerylist.attachTo(postgres);

          Grocerylist.create([
            {
              "name": "Milk",
              "purchased": true,
              "shopperId": users[0].id,
            },
            {
              "name": "Bread",
              "purchased": true,
              "shopperId": users[0].id,
            },
            {
              "name": "Tofu",
              "purchased": true,
              "shopperId": users[1].id
            },
          ], function(success) {
              console.log("Grocery created.");        
          });
        });
      };
    });
  };
};