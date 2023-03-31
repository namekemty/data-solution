import { gsap } from "gsap";
let SCENE;
let CAMERA;
let RENDERER;
let CONTROLS;
let COMPOSER;

let TIME = 10;


main();


function main() {
    init();
    animate();
}


function init() {
    initScene();
    initCamera();
    initRenderer();
    initComposer();
    initControls();
    initEventListeners();

    createObjects();

    document.querySelector('.canvas-container').appendChild(RENDERER.domElement);
}


function initScene() {
    SCENE = new THREE.Scene();

    initLights();
}


function initLights() {
    const point = new THREE.PointLight(0xffffff, 1, 0);
    point.position.set(0, 100, 50);
    SCENE.add(point);
}

const hero_text3 = document.getElementById('hero-text3');
const hero_button = document.getElementById('hero-button');

function initCamera() {
    CAMERA = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    CAMERA.position.z = 2100;

    gsap.to(CAMERA.position, {
      z: 2090,
      duration: 1,
      ease: "back.in",
      onComplete: 

        function () {
          gsap.to(CAMERA.position, {
            z: 85,
            duration: 2,
            ease: "power2.out",
            onComplete: function () {
                
                hero_text3.style.opacity = "1";
                
                gsap.from(hero_text3, {
                    duration: 1.5,
                    y: 20,
                    ease: 'power2.out',
                    opacity: 0,    
                });

                hero_button.style.opacity = "1";

                gsap.from(hero_button, {
                    duration: 1.5,
                    y: 20,
                    ease: 'power2.out',
                    delay: 0.5,
                    opacity: 0,    
                });
            },  

          });
        },

        function () {

          const hero1 = document.querySelector(`#hero-text1`);
          hero1.style.animation = `fill 0.6s ease forwards 3s`

          const hero2 = document.querySelector(`#hero-text2`);
          hero2.style.animation = `fill 0.6s ease forwards 3s`

          for (let i = 1; i <= 15; i++) {
            let txt = document.querySelector(`#hero-text1 path:nth-child(${i})`);
            txt.style.animation = `line-anim 3s ease forwards 2s`;
          }

          for (let i = 1; i <= 20; i++) {
            let txt2 = document.querySelector(`#hero-text2 path:nth-child(${i})`);
            txt2.style.animation = `line-anim 3s ease forwards 2s`;
          }
        }

    }); 
}
       

function initRenderer() {
    RENDERER = new THREE.WebGLRenderer({ alpha: true });
    RENDERER.setPixelRatio(window.devicePixelRatio);
    RENDERER.setSize(window.innerWidth, window.innerHeight);
    RENDERER.shadowMap.enabled = true;
    RENDERER.shadowMapSort = true;
    RENDERER.setClearColor(0x111, 0.3);
}
    
    


function initComposer() {
    COMPOSER = new THREE.EffectComposer(RENDERER);
    COMPOSER.setSize(window.innerWidth, window.innerHeight);

    const renderPass = new THREE.RenderPass(SCENE, CAMERA);
    COMPOSER.addPass(renderPass);

    const bloomPass = new THREE.UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight), 1.4, 1, 0);
    bloomPass.renderToScreen = true;
    COMPOSER.addPass(bloomPass);
}


function initControls() {
    CONTROLS = new THREE.OrbitControls(CAMERA);
    CONTROLS.enabled = false;
    CONTROLS.update();
}


function initEventListeners() {
    window.addEventListener('resize', onWindowResize);

    onWindowResize();
}



function onWindowResize() {
    if (window.innerWidth < 1024) {
        return;
    }

    CAMERA.aspect = window.innerWidth / window.innerHeight;
    CAMERA.updateProjectionMatrix();
    RENDERER.setSize(window.innerWidth, window.innerHeight);
    COMPOSER.setSize(window.innerWidth, window.innerHeight);

}


function animate() {
    requestAnimationFrame(animate);
    CONTROLS.update();
    TIME += 0.001;
    updateUniforms();
    render();
}


function updateUniforms() {
    SCENE.traverse(function(child) {
        if (child instanceof THREE.Points
            && child.material.type === 'ShaderMaterial') {
            child.material.uniforms.uTime.value = TIME;
            child.material.needsUpdate = true;
        }
    });
}


function render() {
    CAMERA.lookAt(SCENE.position);
    COMPOSER.render(SCENE, CAMERA);
}


function createObjects() {
    const geometry = new THREE.TorusBufferGeometry(100, 1, 1000, 200);

    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: TIME }
        },
        transparent: true,
        side: THREE.DoubleSide,
        vertexShader:   document.getElementById('sphere-vertex-shader').textContent,
        fragmentShader: document.getElementById('sphere-fragment-shader').textContent
    });

    const torus = new THREE.Points(geometry, shaderMaterial);

    SCENE.add(torus);
}