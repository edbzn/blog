import { css, html, LitElement } from 'lit-element';
import * as THREE from 'three';

import { translate } from '../../core/directives/translate.directive';

export default class ProfileComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
      }

      section {
        padding: 5rem 0;
        margin-bottom: 42px;
        z-index: 1;
        font-family: 'IBM Plex Sans', sans-serif;
      }

      .page-wrapper {
        max-width: 780px;
        margin: 0px auto;
      }

      .follow-me {
        max-height: 36px;
      }

      .title {
        margin: 0;
        font-size: 2.6rem;
      }

      .subtitle {
        width: 90%;
        margin-top: 0px;
        font-size: 2rem;
        font-weight: 100;
      }

      .scene {
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
        background: #;
      }

      @media screen and (max-width: 800px) {
        .page-wrapper {
          padding: 1rem 0.8rem;
        }
      }
    `;
  }

  firstUpdated() {
    let camera: THREE.PerspectiveCamera,
      scene: THREE.Scene,
      renderer: THREE.WebGLRenderer,
      group: THREE.Object3D | THREE.Group;
    const { height } = this.shadowRoot!.host.getBoundingClientRect();
    let mouseX = 0,
      mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = 0;

    const init = () => {
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / height, 1, 10000);
      camera.position.z = 500;
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xeeeeee);
      scene.fog = new THREE.Fog(0xeeeeee, 1, 10000);
      const geometry = new THREE.BoxBufferGeometry(100, 100, 100);
      const material = new THREE.MeshBasicMaterial({ wireframe: true });
      group = new THREE.Group();
      for (let i = 0; i < 25; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 2500 - 1000;
        mesh.position.y = Math.random() * 2500 - 1000;
        mesh.position.z = Math.random() * 2500 - 1000;
        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        group.add(mesh);
      }
      scene.add(group);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, height);
      windowHalfY = height / 2;
      renderer.setPixelRatio(window.devicePixelRatio);

      const { domElement } = renderer;
      domElement!.classList.add('scene');
      this.shadowRoot!.prepend(renderer.domElement);

      document.addEventListener('mousemove', onDocumentMouseMove, false);

      window.addEventListener('resize', onWindowResize, false);
    };

    function onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, height);
    }

    function onDocumentMouseMove(event: { clientX: number; clientY: number }) {
      mouseX = (event.clientX - windowHalfX) * 2;
      mouseY = (event.clientY - windowHalfY) * 2;
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    function render() {
      const time = Date.now() * 0.001;
      const rx = Math.sin(time * 0.7) * 0.5,
        ry = Math.sin(time * 0.3) * 0.5,
        rz = Math.sin(time * 0.2) * 0.5;
      camera.position.x += (mouseX - camera.position.x) * 0.0025;
      camera.position.y += (-mouseY - camera.position.y) * 0.0025;
      camera.lookAt(scene.position);
      group.rotation.x = rx;
      group.rotation.y = ry;
      group.rotation.z = rz;
      renderer.render(scene, camera);
    }

    init();
    animate();
  }

  render() {
    return html`
      <section>
        <div class="page-wrapper">
          <h1 class="title">Edouard Bozon</h1>
          <h2 class="subtitle">
            ${translate('profile.description')}
          </h2>
          <div class="follow-me">
            <iframe
              src="https://platform.twitter.com/widgets/follow_button.html?screen_name=edouardbozon&show_screen_name=true&show_count=true"
              title="Follow me"
              width="245"
              height="26"
              style="border: 0; overflow: hidden;"
            ></iframe>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('ez-profile', ProfileComponent);
