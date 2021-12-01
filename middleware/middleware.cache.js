const cache = require('memory-cache');

let memCache = new cache.Cache();
let cacheMethods = {
  get: (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url;
    let cacheContent = memCache.get(key);

    if (cacheContent) {
      res.send(cacheContent);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = body => {
        memCache.put(key, body, 3000 * 1000);
        res.sendResponse(body);
      };
      next();
    }
  },
  clear: param => (req, res, next) => {
    let key = '__express__' + '/api/v1/' + param;
    let cacheContent = memCache.clear(key);

    next();
  },
};

module.exports = cacheMethods;
