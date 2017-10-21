var SerialisedError = require('serialised-error');

module.exports = {
logRequest: function (req) {
  var trace = _.compact(_.get(req, 'headers.x-trace-id', '').split(',')),
    logOptions = {
      indexType: 'family-tree-ops',
      env: sails.config.environment,
      type: 'request',
      path: _.get(req, 'path', 'unknown'),
      controller: _.get(req, 'options.controller', 'unknown'),
      action: _.get(req, 'options.action', 'unknown'),
      method: req.method,
      user_ip: req.ip,
      user_agent: _.get(req, 'headers.user-agent')
    };

  logOptions.trace = trace;
  _.set(req, 'options.log.trace', trace);

  sails.log.info(logOptions);
},

logResponse: function (req, res) {
  var logOptions = _.defaults({
    indexType: 'family-tree-ops',
    env: sails.config.environment,
    type: 'response',
    responseTime: Date.now() - req._startTime,
    responseCode: res.statusCode,
    trace: _.get(req, 'options.log.trace', [])
  }, {
    path: _.get(req, 'path', 'unknown'),
    controller: _.get(req, 'options.controller', 'unknown'),
    action: _.get(req, 'options.action', 'unknown'),
    method: req.method,
    user_ip: req.ip,
    user_agent: _.get(req, 'headers.user-agent')
  });

  sails.log.info(logOptions);
},

logError: function (options) {
  var logOptions = _.defaults({
    indexType: 'family-tree-ops',
    env: sails.config.environment,
    type: 'error'
  }, options);

  if (_.isError(options.error)) {
    options.error = new SerialisedError(options.error);
  }

  else if (_.isString(options.error)) {
    options.error = { message: options.error };
  }

  sails.log.error(logOptions);
},

logAnalyticsEvent: function (options) {
  var logOptions = _.defaults({
    indexType: 'server-events',
    env: sails.config.environment,
    type: 'family-tree',
    property: 'family-tree'
  }, _.pick(options, ['category', 'action', 'meta', 'label', 'value', 'user']));

  sails.log.info(logOptions);
},

logOpsEvent: function (options, logLevel) {
  var logOptions = _.assign({
    indexType: 'family-tree-ops',
    env: sails.config.environment,
    type: 'event'
  }, options);

  !logOptions.meta && (logOptions.meta = {});

  !_.isString(logLevel) && (logLevel = 'info');
  sails.log[logLevel](logOptions);
}
};
