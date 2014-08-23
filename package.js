Package.describe({
  summary: 'Render with THREE.js reactively',
  version: '0.0.1'
});

Package.on_use(function (api) {
  api.use('underscore', ['client', 'server']);
  api.use('ejson', ['client', 'server']);
  api.use('spacebars', 'client');
  api.use('templating', 'client');
  api.use('ui', 'client');

  api.add_files('assets/three.min.js', 'client', {isAsset: true});
  api.add_files('assets/head.html', 'client');
  api.add_files('lib/utils.js', 'client');
  api.add_files('lib/objects.js', 'client');
  api.add_files('tpl/three.html', 'client');
  api.add_files('tpl/three.js', 'client');
});
