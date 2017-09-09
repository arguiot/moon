var moonColor;
var moonNormal;

var cnvs = document.getElementById('moon')

// Create three renderer

var renderer = new THREE.WebGLRenderer({canvas: cnvs, alpha: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(cnvs.clientWidth, cnvs.clientHeight);

// Create camera and scene

var camera = new THREE.PerspectiveCamera(35, cnvs.clientWidth / cnvs.clientHeight, .1, 3000);
var scene = new THREE.Scene();

// Define some functions

function loadTextures() {
    var loader = new THREE.TextureLoader()
    
    moonColor   = loader.load('/moon/img/moon-color-patched-2048.jpg')
    moonNormal  = loader.load('/moon/img/moon-normal-1024.jpg')
    moonBlurMap = loader.load('/moon/img/moon-blur.png')
}

loadTextures()
var moonG = new THREE.IcosahedronGeometry(100, 4);
var moonM = new THREE.MeshStandardMaterial({
    map: moonColor,
    normalMap: moonNormal,
    normalScale: new THREE.Vector3( 0.05, 0.05 ),
    roughness: 1
});
var moon  = new THREE.Mesh(moonG, moonM);
moon.position.set(0, -80, -95)
scene.add(moon);

var moonBlurG = new THREE.PlaneGeometry(200, 80);
var moonBlurM = new THREE.MeshBasicMaterial({
    map: moonBlurMap,
    transparent: true
})
var moonBlur = new THREE.Mesh(moonBlurG, moonBlurM);
moonBlur.position.set(0, -10, -95)
scene.add(moonBlur)

var light = new THREE.PointLight(0xfff0e8, 2.8);
light.position.set(0, 1000, -1200)
scene.add(light)

function resize() {
    var w = window.innerWidth;
    var h = 600;
    cnvs.style.width = w + 'px';
    cnvs.style.height = h + 'px';
  
    // Update camera and renderer
  
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize)