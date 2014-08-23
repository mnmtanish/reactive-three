
CreateObject = function (item) {
  return CreateObject[item.type](item);
}

CreateObject.BoxGeometry = function (item) {
  var material = new THREE.MeshNormalMaterial();
  var geometry = new THREE.BoxGeometry(item.width, item.height, item.depth);
  return new THREE.Mesh(geometry, material);
}

CreateObject.AmbientLight = function (item) {
  return new THREE.AmbientLight(item.color);
}

CreateObject.DirectionalLight = function (item) {
  return new THREE.DirectionalLight(item.color);
}
