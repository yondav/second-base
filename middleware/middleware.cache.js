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
  clear: () => (req, res, next) => {
    let collection = () => {
      if (url.includes('user')) {
        return 'users';
      } else if (url.includes('secondBase') || url.includes('services')) {
        return 'secondBase';
      } else if (url.includes('gear')) {
        return 'studio_gear';
      } else if (url.includes('artists')) {
        return 'artists';
      } else {
        return next();
      }
    };
    let url = req.url;

    console.log('COLLECTION***\n', collection());

    let key = '__express__' + '/api/v1/' + collection();
    let cacheContent = memCache.clear(key);

    next();
  },
};

module.exports = cacheMethods;
