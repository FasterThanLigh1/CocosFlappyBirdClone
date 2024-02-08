import {
  _decorator,
  Component,
  Node,
  Vec3,
  screen,
  find,
  UITransform,
} from "cc";
import { GameControl } from "./GameControl";
const { ccclass, property } = _decorator;

const random = (min, max) => {
  return Math.random() * (max - min) + min;
};

@ccclass("Pipes")
export class Pipes extends Component {
  @property({
    type: Node,
    tooltip: "Top Pipe",
  })
  public topPipe: Node;

  @property({
    type: Node,
    tooltip: "Bottom Pipe",
  })
  public bottomPipe: Node;

  public tempStartLocationUp: Vec3 = new Vec3(0, 0, 0);
  public tempStartLocationDown: Vec3 = new Vec3(0, 0, 0);
  public scene = screen.windowSize;

  public game: GameControl; // Speed of the pipes from game control
  public pipeSpeed: number; // final speed of the pipes
  public tempSpeed: number; // temporary speed of the pipes

  private isPass: boolean = false;

  protected onLoad(): void {
    this.game = find("GameControl").getComponent(GameControl);
    this.pipeSpeed = this.game.pipeSpeed;
    this.isPass = false;
    this.initPos();
  }

  initPos() {
    this.tempStartLocationUp.x =
      this.topPipe.getComponent(UITransform).width + this.scene.width;
    this.tempStartLocationDown.x =
      this.topPipe.getComponent(UITransform).width + this.scene.width;

    let gap = random(90, 100);
    let topHeight = random(0, 450);

    this.tempStartLocationUp.y = topHeight;
    this.tempStartLocationDown.y = topHeight - gap * 10;

    this.bottomPipe.setPosition(this.tempStartLocationDown);
    this.topPipe.setPosition(this.tempStartLocationUp);
  }

  protected update(dt: number): void {}
}
