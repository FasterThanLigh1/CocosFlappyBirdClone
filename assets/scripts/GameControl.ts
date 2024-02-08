import {
  _decorator,
  CCInteger,
  Component,
  director,
  EventKeyboard,
  Input,
  input,
  KeyCode,
  Node,
} from "cc";
import { Ground } from "./Ground";
import { Results } from "./Results";
import { Bird } from "./Bird";
const { ccclass, property } = _decorator;

@ccclass("GameControl")
export class GameControl extends Component {
  @property({
    type: GameControl,
    tooltip: "This is ground",
  })
  public ground: Ground;

  @property({
    type: Results,
    tooltip: "This is ground",
  })
  public results: Results;

  @property({
    type: Bird,
    tooltip: "This is bird",
  })
  public bird: Bird;

  @property({
    type: CCInteger,
  })
  public speed: number = 300;

  @property({
    type: CCInteger,
  })
  public pipeSpeed: number = 300;

  protected onLoad(): void {
    this.initListener();
    this.results.resetScore();
    director.pause();
  }

  initListener() {
    console.log("Init listner");
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    this.node.on(Node.EventType.TOUCH_START, () => {
      console.log("TOUCH START");
      this.bird.fly();
    });
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.startGame();
        break;
      case KeyCode.KEY_S:
        this.results.addScore();
        break;
      case KeyCode.KEY_D:
        this.results.resetScore();
        break;
      case KeyCode.KEY_F:
        this.resetGame();
        break;
      case KeyCode.KEY_G:
        this.gameOver();
        break;
    }
  }

  startGame() {
    this.results.hideResults();
    director.resume();
    this.bird.resetBird();
  }

  gameOver() {
    this.results.showResults();
    director.pause();
  }

  resetGame() {
    this.results.resetScore();
    this.results.hideResults();
    director.resume();
  }
}
