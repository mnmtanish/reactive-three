
Template.three.rendered = function () {
  var self = this;

  // find and prepare the container
  var container = $(this.firstNode);
  var containerWidth = container.parent().width();
  var containerHeight = container.parent().height();
  var containerRatio = containerWidth / containerHeight;
  container.width(containerWidth);
  container.height(containerHeight);

  // create the renderer
  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setClearColor(0x222222);
  renderer.setSize(containerWidth, containerHeight);
  container.append(renderer.domElement);

  // create the scene
  var scene = new THREE.Scene();

  // create and add the default camera
  var camera = new THREE.PerspectiveCamera(35, containerRatio, 1, 10000);
  scene.add(camera);

  // fetch and set camera position and direction
  Deps.autorun(function () {
    var cameraInfo = self.data.cameras.find().fetch()[0];
    if(cameraInfo) {
      camera.position.set.apply(camera.position, cameraInfo.position);
      camera.lookAt(makeVector3(cameraInfo.lookAt));
    }
  });

  // observe objects info and update the scene
  var objects = {}
  this.data.objects.find().observe({
    added: function (item) {
      var object = CreateObject(item);
      if(item.position) {
        object.position.set.apply(object.position, item.position);
      }
      object._item = item;
      objects[item._id] = object;
      scene.add(object);
    },

    changed: function (item) {
      var object = objects[item._id];
      if(item.position) {
        object.position.set.apply(object.position, item.position);
      }
    },

    removed: function (item) {
      var object = objects[item._id];
      delete objects[item._id];
      scene.remove(object);
    }
  });

  // start animating the scene
  animate();
  function animate () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  // DEBUG
  window.scene = scene;
}
