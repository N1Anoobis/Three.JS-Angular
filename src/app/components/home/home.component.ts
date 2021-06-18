import { Component, OnInit } from "@angular/core";
import { Game } from "src/app/models";
import * as THREE from "three";
import gsap from "gsap";
import { Float32BufferAttribute } from "three";

interface Mouse {
  x: number;
  y: number;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public sort!: string;
  public games!: Array<Game>;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  sphere!: THREE.Mesh<THREE.SphereGeometry, THREE.Material | THREE.Material[]>;
  mouse: Mouse = {
    x: 1,
    y: 1,
  };
  group!: THREE.Group;
  constructor() {}

  ngOnInit(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);

    //create sphere
    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(5, 50, 50),
      new THREE.MeshBasicMaterial({
        // color: 0xff0fff,
        map: new THREE.TextureLoader().load("../../assets/globe.jpg"),
      })
    );
    this.scene.add(this.sphere);

    this.group = new THREE.Group();
    this.group.add(this.sphere);
    this.scene.add(this.group);

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
    });
    const starVertices = [];
    for (let index = 0; index < 10000; index++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -Math.random() * 2000;
      starVertices.push(x, y, z);
    }

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices,3))

    const stars = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(stars);
    this.camera.position.z = 15;
    this.animate();
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = (e.clientX / innerWidth + 1) * 2 - 1;
      this.mouse.y = (e.clientY / innerWidth - 1) * 2 + 1;
    });
  }
  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.sphere.rotation.y += 0.004;

    gsap.to(this.group.rotation, {
      x: this.mouse.y * 0.5,
      y: this.mouse.x * 0.5,
      duration: 2,
    });
    this.group.rotation.x = this.mouse.y * 0.01;
    this.group.rotation.y = this.mouse.x * 0.01;
  }
}
