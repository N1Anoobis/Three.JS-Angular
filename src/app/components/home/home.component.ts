import { Component, OnInit } from "@angular/core";
import { Game } from "src/app/models";
import * as THREE from "three";

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
      antialias: true
    });
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio)
    document.body.appendChild(this.renderer.domElement);

    //create sphere
    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(5, 50, 50),
      new THREE.MeshBasicMaterial({
        // color: 0xff0000,
        map:new THREE.TextureLoader().load('../../assets/globe.jpg')
      })
    );
    this.scene.add(this.sphere)
    this.camera.position.z = 15
    this.animate();
  }
  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera)
  }
}
