import { css, html, LitElement } from 'lit-element';
import {
  BoxBufferGeometry,
  Color,
  Fog,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { translate } from '../../core/directives/translate.directive';

export default class ProfileComponent extends LitElement {
  animationFrameRef: number;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  mouseX: number;
  windowHalfX: number;
  windowHalfY: number;
  mouseY: number;
  scene: Scene;
  group: Group;
  height: number;

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
    const width = window.innerWidth;

    if (width <= 600) {
      return;
    }

    this.initScene(width);
    this.animateScene();
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.animationFrameRef);
    document.removeEventListener('mousemove', this.onDocumentMouseMove);
    window.removeEventListener('resize', this.onWindowResize);
  }

  initScene(width: number) {
    this.height = this.shadowRoot!.host.getBoundingClientRect().height;
    (this.mouseX = 0), (this.mouseY = 0);
    this.windowHalfX = width / 2;
    this.windowHalfY = 0;

    this.camera = new PerspectiveCamera(60, width / this.height, 1, 10000);
    this.camera.position.z = 500;
    this.scene = new Scene();
    this.scene.background = new Color(0xeeeeee);
    this.scene.fog = new Fog(0xeeeeee, 1, 10000);
    this.group = new Group();

    const geometry = new BoxBufferGeometry(200, 200, 200);
    const material = new MeshBasicMaterial({ wireframe: true });

    for (let i = 0; i < 10; i++) {
      const mesh = new Mesh(geometry, material);
      mesh.position.x = Math.random() * 2500 - 1000;
      mesh.position.y = Math.random() * 2500 - 1000;
      mesh.position.z = Math.random() * 2500 - 1000;
      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
      this.group.add(mesh);
    }

    this.scene.add(this.group);
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, this.height);
    this.windowHalfY = this.height / 2;
    this.renderer.setPixelRatio(window.devicePixelRatio);

    const { domElement } = this.renderer;
    domElement!.classList.add('scene');
    this.shadowRoot!.prepend(this.renderer.domElement);

    document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    window.addEventListener('resize', this.onWindowResize, false);
  }

  private renderScene() {
    const time = Date.now() * 0.001;
    const rx = Math.sin(time * 0.7) * 0.5,
      ry = Math.sin(time * 0.3) * 0.5,
      rz = Math.sin(time * 0.2) * 0.5;

    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.0025;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.0025;
    this.camera.lookAt(this.scene.position);

    this.group.rotation.x = rx;
    this.group.rotation.y = ry;
    this.group.rotation.z = rz;
    this.renderer.render(this.scene, this.camera);
  }

  private animateScene = () => {
    this.animationFrameRef = requestAnimationFrame(this.animateScene);
    this.renderScene();
  };

  private onWindowResize = () => {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.camera.aspect = window.innerWidth / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, this.height);
  };

  private onDocumentMouseMove = (event: { clientX: number; clientY: number }) => {
    this.mouseX = (event.clientX - this.windowHalfX) * 2;
    this.mouseY = (event.clientY - this.windowHalfY) * 2;
  };

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
