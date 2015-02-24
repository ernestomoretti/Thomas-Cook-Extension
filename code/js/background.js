//
// background page for extension
// this page is invisible, so no any angular here
//
requirejs.config(requireConfig);

requirejs([ 'jquery',
            'underscore',
            'util/messaging',
            'logging',
            'configSerializer',
            'staticConfig'],
function(   $,
            _,
            messaging,
            logging,
            configSerializer,
            sc) {

  var log = new logging(true,  'background');
  configSerializer.Get()
  .then(function(config) {
    log.info('Configuration: ' + JSON.stringify(config, null, '\t'));
  });
  messaging.backgroundInitialize();
});