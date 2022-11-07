import { fabric } from 'fabric';

export default class CanvasAnimation {
  canvasHtmlElement;
  canvasObject: fabric.Canvas;
  calculatedBgWidth: number;
  canvasWrapper;
  moveToMainPage;

  constructor(
    canvasHtmlElement: HTMLCanvasElement,
    canvasWrapper: HTMLDivElement,
    moveToMainPage: () => void,
  ) {
    this.canvasHtmlElement = canvasHtmlElement;
    this.canvasWrapper = canvasWrapper;
    this.canvasObject = this.initCanvas(canvasHtmlElement, canvasWrapper);
    this.calculatedBgWidth = (this.canvasObject.getHeight() / 808) * 1438;
    this.drawBackgroundImage();
    this.moveToMainPage = moveToMainPage;
  }

  initCanvas(
    canvasHtmlElement: HTMLCanvasElement,
    canvasWrapper: HTMLDivElement,
  ) {
    const width = canvasWrapper.clientWidth;
    const height = canvasWrapper.clientHeight;

    const cvs = new fabric.Canvas(canvasHtmlElement, {
      width,
      height,
    });
    return cvs;
  }

  async drawBackgroundImage() {
    await this.canvasObject.setBackgroundImage(
      'https://i.ibb.co/1QVhBvk/landing.png',
      this.canvasObject.renderAll.bind(this.canvasObject),
      {
        scaleX: this.canvasObject.getHeight() / 808,
        scaleY: this.canvasObject.getHeight() / 808,
      },
    );
    this.moveToRightFromLeft();
  }

  moveToRightFromLeft() {
    const canvasObj = this.canvasObject;
    const startValue = this.calculatedBgWidth - this.canvasObject.getWidth();
    let currentMove = startValue;

    const onChangeHandler = (moveUnit: number) => {
      const tmp = currentMove - moveUnit;
      currentMove = moveUnit;

      const delta = new fabric.Point(-tmp, 0);
      canvasObj.relativePan(delta);
      canvasObj.renderAll();
    };

    const onCompleteHandler = () => {
      this.moveToCenterFromRight();
      canvasObj.renderAll();
    };

    fabric.util.animate({
      startValue,
      endValue: 0,
      duration: 2000,
      onChange: onChangeHandler,
      onComplete: onCompleteHandler,
    });
  }

  moveToCenterFromRight() {
    const canvasObj = this.canvasObject;
    const startValue =
      (this.calculatedBgWidth - this.canvasObject.getWidth()) / 2;
    let currentMove = startValue;

    const onChangeHandler = (moveUnit: number) => {
      const tmp = currentMove - moveUnit;
      currentMove = moveUnit;

      const delta = new fabric.Point(tmp, 0);
      canvasObj.relativePan(delta);
      this.canvasObject.renderAll();
    };

    const onCompleteHandler = () => {
      this.canvasObject.renderAll();
      setTimeout(() => {
        this.moveToMainPage();
      }, 500);
    };

    fabric.util.animate({
      startValue,
      endValue: 0,
      duration: 1500,
      onChange: onChangeHandler,
      onComplete: onCompleteHandler,
    });
  }
}
