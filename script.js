var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var heartShape = new THREE.Shape();
var x = 0, y = 0;
heartShape.moveTo(x, y);
heartShape.bezierCurveTo(x + 2.5, y + 2.5, x + 5, y, x, y - 5);
heartShape.bezierCurveTo(x - 5, y, x - 2.5, y + 2.5, x, y);

var extrudeSettings = {
    depth: 0.7,
    bevelEnabled: true,
    bevelThickness: 0.4,
    bevelSize: 0.6,
    bevelOffset: 0,
    bevelSegments: 1
};

var geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
var edges = new THREE.EdgesGeometry(geometry);
var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
scene.add(line);

function createTextTexture(text) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 256;
    ctx.fillStyle = 'white';
    ctx.font = 'Bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    var texture = new THREE.CanvasTexture(canvas);
    return texture;
}

var textMaterial = new THREE.MeshBasicMaterial({ map: createTextTexture("Ilona Je T'aime🤍"), transparent: true });
var textPlane = new THREE.PlaneGeometry(6, 3);
var textMesh = new THREE.Mesh(textPlane, textMaterial);
textMesh.position.set(0, -1, 0);
scene.add(textMesh);

camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);
    line.rotation.y += 0.02;
    textMesh.rotation.y += 0.02;
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// calcul de temps

// Date de référence (19 février 2025)
const startDate = new Date('2025-02-19');
const now = new Date();
const diffMs = now - startDate;

const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
const years = Math.floor(diffDays / 365.25);
const months = Math.floor((diffDays % 365.25) / 30.44);
const days = Math.floor((diffDays % 365.25) % 30.44);

document.getElementById('difference-date').textContent =
    `${years} an${years > 1 ? 's' : ''}, ${months} mois et ${days} jour${days > 1 ? 's' : ''}`;

