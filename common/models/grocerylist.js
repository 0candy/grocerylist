module.exports = function(Grocerylist) {
  Grocerylist.beforeRemote('create', function(context, user, next) {
    var req = context.req;
    req.body.date = Date.now();
    req.body.shopperId = req.accessToken.userId;
    next();
  });

  Grocerylist.complete = function(shopperId, cb) {
    Grocerylist.find({
      where: {
        purchased:false,
        shopperId: shopperId,
      }
    }, function(err, list) {
        var response;
        if (typeof list === 'undefined' || list.length === 0) {
          response = "All done shopping!"
        }
        else {
          response = "Shopping is not done.";
        }
        cb(null, response);
    });
  };
  Grocerylist.remoteMethod(
    'complete',
    {
      accepts: {
        arg: 'shopperId', type: 'string'
      },
      http: {
        path: '/complete',
        verb: 'get'
      },
      returns: {
        arg: 'complete',
        type: 'string'
      }
    }
  );
};
