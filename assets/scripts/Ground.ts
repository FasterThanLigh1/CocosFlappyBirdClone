import {
  _decorator,
  Canvas,
  Component,
  director,
  Node,
  UITransform,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

import { GameControl } from "./GameControl";

@ccclass("Ground")
export class Ground extends Component {
  @property({
    type: Node,
    tooltip: "Ground 1 is here",
  })
  public ground1: Node;

  @property({
    type: Node,
    tooltip: "Ground 2 is here",
  })
  public ground2: Node;

  @property({
    type: Node,
    tooltip: "Ground 3 is here",
  })
  public ground3: Node;

  public groundWidth1: number;
  public groundWidth2: number;
  public groundWidth3: number;

  public tempStartLoc1: Vec3 = new Vec3(0, 0, 0);
  public tempStartLoc2: Vec3 = new Vec3(0, 0, 0);
  public tempStartLoc3: Vec3 = new Vec3(0, 0, 0);

  public gameSpeed: number = 50;

  private canvas: Canvas;
  private rightMostX: number;

  private gameControl: GameControl = new GameControl();

  protected onLoad(): void {
    this.startUp();
  }

  startUp() {
    this.groundWidth1 = this.ground1.getComponent(UITransform).width;
    this.groundWidth2 = this.ground2.getComponent(UITransform).width;
    this.groundWidth3 = this.ground3.getComponent(UITransform).width;

    this.tempStartLoc1.x = 0;
    this.tempStartLoc2.x = this.groundWidth1;
    this.tempStartLoc3.x = this.groundWidth1 + this.groundWidth2;

    this.ground1.setPosition(this.tempStartLoc1);
    this.ground2.setPosition(this.tempStartLoc2);
    this.ground3.setPosition(this.tempStartLoc3);

    const scene = director.getScene();
    this.canvas = scene.getComponentInChildren(Canvas);
    this.rightMostX = this.canvas.getComponent(UITransform).width;
  }

  update(deltaTime: number) {
    this.gameSpeed = this.gameControl.speed;

    this.tempStartLoc1 = this.ground1.position;
    this.tempStartLoc2 = this.ground2.position;
    this.tempStartLoc3 = this.ground3.position;

    this.tempStartLoc1.x -= this.gameSpeed * deltaTime;
    this.tempStartLoc2.x -= this.gameSpeed * deltaTime;
    this.tempStartLoc3.x -= this.gameSpeed * deltaTime;

    //Check if x < limit left, if so make it the right most position
    if (this.tempStartLoc1.x <= 0 - this.groundWidth1) {
      this.tempStartLoc1.x = this.rightMostX;
    }
    if (this.tempStartLoc2.x <= 0 - this.groundWidth2) {
      this.tempStartLoc2.x = this.rightMostX;
    }
    if (this.tempStartLoc3.x <= 0 - this.groundWidth3) {
      this.tempStartLoc3.x = this.rightMostX;
    }

    this.ground1.setPosition(this.tempStartLoc1);
    this.ground2.setPosition(this.tempStartLoc2);
    this.ground3.setPosition(this.tempStartLoc3);
  }
}
