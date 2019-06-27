import { css, html, LitElement } from 'lit-element';
import {
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  MeshNormalMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from 'three';

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
    const scene = new Scene();
    scene.background = new Color(0xeeeeee);

    const { height } = this.shadowRoot!.host.getBoundingClientRect();
    const camera = new PerspectiveCamera(75, window.innerWidth / height, 0.1, 1000);
    const renderer = new WebGLRenderer();
    const { domElement } = renderer;

    domElement!.classList.add('scene');

    renderer.setSize(window.innerWidth, height);

    this.shadowRoot!.prepend(renderer.domElement);

    const boxGeo = new BoxGeometry(4, 4, 4);
    const sphereGeo = new SphereGeometry(4, 20, 20);

    const material1 = new MeshNormalMaterial({ transparent: true, opacity: 0.6 });
    const material2 = new MeshBasicMaterial({ color: '#d5d5d5', opacity: 0.5, transparent: true });
    const cube = new Mesh(boxGeo, material2);
    const sphere = new Mesh(sphereGeo, material1);
    const geometries = [sphere];

    scene.add(...geometries);

    camera.position.z = 5;
    // camera.position.x = 10;

    const animate = () => {
      renderer.render(scene, camera);
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;
      sphere.rotation.x += 0.008;
      sphere.rotation.y += 0.008;
      requestAnimationFrame(animate);
    };

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
