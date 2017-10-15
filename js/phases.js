var phases = document.getElementById('phases')

// Create three renderer

var phaseRenderer = new THREE.WebGLRenderer({
  canvas: phases,
  alpha: true
});
phaseRenderer.setPixelRatio(window.devicePixelRatio);
phaseRenderer.setSize(phases.clientWidth, phases.clientHeight);

// Create camera and scene

var phaseCamera = new THREE.PerspectiveCamera(35, phases.clientWidth / phases.clientHeight, .1, 3000);
var phaseScene = new THREE.Scene();

var phaseMoonG = new THREE.IcosahedronGeometry(100, 3)
var phaseMoonM = new THREE.MeshStandardMaterial({
  map: moonColor,
  normalMap: moonNormal,
  normalScale: new THREE.Vector3(0.2, 0.2),
  roughness: 1
});
var phaseMoon = new THREE.Mesh(phaseMoonG, phaseMoonM);
phaseMoon.position.set(0, 0, -400)
phaseScene.add(phaseMoon)

var phaseLight = new THREE.PointLight(0xfff0e8, 3);
phaseScene.add(phaseLight)

function goToAngle(theta) {
  var x = Math.sin(theta) * 1000
  var z = Math.cos(theta) * 1000
  phaseLight.position.set(x, 0, z)
}

requestAnimationFrame(render)

var lightAngle = -1.75

function render() {
  goToAngle(lightAngle)
  animateToPhase(curPhase)
  phaseMoon.rotation.y = 1.8
  phaseRenderer.render(phaseScene, phaseCamera)

  moon.rotation.x -= .00005
  renderer.render(scene, camera);

  requestAnimationFrame(render)
}

function animateToPhase(n) {
  var phasesLightAngle = {
    southern: [-3.14, -2.3, -1.75, -.94, 0, .94, 1.75, 2.3, 3.14,
    ],
    northern: [
      3.14,
      2.3,
      1.75,
      .94,
      0, -.94, -1.75, -2.3, -3.14,
    ]
  };
  var round = function(x) {
    p = 1000
    return Math.round(x * p) / p
  }
  var angle = phasesLightAngle[hemisphere][n]
  var rate = round((Math.abs(angle - lightAngle)) / 25.13)

  if (lightAngle > angle) {
    lightAngle -= rate
    lightAngle = round(lightAngle)
  }
  if (lightAngle < angle) {
    lightAngle += rate
    lightAngle = round(lightAngle)
  }
}

function resizePhase() {
  // Update canvas size

  var w = window.innerWidth > 1200 ? 960 : window.innerWidth * 8 / 10;
  var h;
  if (window.innerWidth < 575) {
    if (window.innerWidth < 480) {
      h = 300
    } else {
      h = 400
    }
  } else {
    h = 500
  }
  phases.style.width = w + 'px';
  phases.style.height = h + 'px';

  // Update camera and renderer

  phaseRenderer.setSize(w, h);
  phaseCamera.aspect = w / h;
  phaseCamera.updateProjectionMatrix();

  render()
}

window.addEventListener('resize', resizePhase);
