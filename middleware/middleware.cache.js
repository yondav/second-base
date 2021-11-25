const NodeCache = require('node-cache');

// stdTTL: time to live in seconds for every generated cache element.
const cache = new NodeCache({ stdTTL: 5 * 60 });

const getUrlFromRequest = req =>
  req.protocol + '://' + req.headers.host + req.originalUrl;

const cacheMethods = {
  set: (req, res, next) => {
    const url = getUrlFromRequest(req);
    cache.set(url, res.locals.data);
    return next();
  },

  get: (req, res, next) => {
    const url = getUrlFromRequest(req);
    const content = cache.get(url);
    if (content) return res.status(200).send(content);

    return next();
  },

  clear: (req, res, next) => {
    cache.keys(function (err, keys) {
      if (!err) {
        let resourceUrl = req.baseUrl;
        const resourceKeys = keys.filter(k => k.includes(resourceUrl));
        cache.del(resourceKeys);
      }
    });
    return next();
  },
};

module.exports = cacheMethods;
