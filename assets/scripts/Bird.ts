import {
  _decorator,
  CCFloat,
  Component,
  Vec3,
  Animation,
  tween,
  easing,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Bird")
export class Bird extends Component {
  @property({
    type: CCFloat,
    tooltip: "How high can it fly",
  })
  jumpHeight: number;

  @property({
    type: CCFloat,
    tooltip: "How long can it fly",
  })
  jumpDuration: number;

  public birdAnimation: Animation;
  public birdLocation: Vec3;

  protected onLoad(): void {
    this.resetBird();
    this.birdAnimation = this.getComponent(Animation);
  }

  resetBird() {
    this.birdLocation = new Vec3(0, 0, 0);
    this.node.setPosition(this.birdLocation);
  }

  public fly() {
    this.birdAnimation.stop();
    tween(this.node.position)
      .to(
        this.jumpDuration,
        new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight),
        {
          easing: "smooth",
          onUpdate: (target: Vec3, ratio: number) => {
            this.node.position = target;
          },
        }
      )
      .start();
    this.birdAnimation.play();
  }
}
