// import { Rect } from "fabric/fabric-impl";
import { fabric } from 'fabric';

export default class Canvas {
  canvasHtmlElement; // canvas origin element
  canvasObject: fabric.Canvas; // canvas object
  calculatedBgWidth: number;
  timerIdForPanning: NodeJS.Timer | undefined;
  zoomScale = 1.4;

  constructor(canvas: HTMLCanvasElement) {
    this.canvasHtmlElement = canvas;
    this.canvasObject = this.initCanvas(canvas);
    this.calculatedBgWidth = (this.canvasObject.getHeight() / 2278) * 4081;
    // this.drawMainBackground(true);
    // this.drawBox();
  }

  initCanvas(canvas: HTMLCanvasElement) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const cvs = new fabric.Canvas(canvas, {
      width,
      height,
    });
    return cvs;
  }

  async drawLoginBackground() {
    await this.canvasObject.setBackgroundImage(
      'https://i.ibb.co/bW2LLKb/Login.png',
      this.canvasObject.renderAll.bind(this.canvasObject),
      {
        scaleX: this.canvasObject.getHeight() / 780,
        scaleY: this.canvasObject.getHeight() / 780,
      },
    );
  }

  async drawMainBackground(init: boolean) {
    const width = this.canvasObject.getWidth();
    console.log(width);
    await this.canvasObject.setBackgroundImage(
      'https://i.ibb.co/grW30L5/back.png',
      this.canvasObject.renderAll.bind(this.canvasObject),
      {
        scaleX: this.canvasObject.getHeight() / 2278,
        scaleY: this.canvasObject.getHeight() / 2278,
      },
    );
    if (init) this.backgroundPanning();
    else this.backgroundAlignCenter();
  }

  async drawCropedMainBackground() {
    const viewport = this.canvasObject.viewportTransform as number[];
    const delta = new fabric.Point(-viewport[4], 0);
    this.canvasObject.relativePan(delta);
    await this.canvasObject.setBackgroundImage(
      'https://i.ibb.co/4V6QnL4/Splash-Center-Crop.png',
      this.canvasObject.renderAll.bind(this.canvasObject),
      {
        scaleX: this.canvasObject.getHeight() / 800,
        scaleY: this.canvasObject.getHeight() / 800,
      },
    );
    this.drawItems();
  }

  backgroundAlignCenter() {
    console.log('반갑스빈다. ');
  }

  backgroundPanning() {
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
      // this.canvasZoomIn();
      setTimeout(() => {
        this.drawCropedMainBackground();
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

  canvasZoomOut() {
    const canvasObj = this.canvasObject;

    fabric.util.animate({
      startValue: canvasObj.getZoom(),
      endValue: 1,
      duration: 500,
      onChange: function (zoomvalue) {
        canvasObj.zoomToPoint({ x: 0, y: 0 }, zoomvalue);
        canvasObj.renderAll();
      },
      onComplete: function () {
        canvasObj.renderAll();
      },
    });
  }

  canvasZoomIn() {
    const canvasObj = this.canvasObject;
    console.log(canvasObj.getCenter());

    // fabric.util.animate({
    //   startValue: canvasObj.getZoom(),
    //   endValue: 2,
    //   duration: 500,
    //   onChange: function (zoomvalue) {
    //     canvasObj.zoomToPoint({ x: 0, y: 0 }, zoomvalue);
    //     canvasObj.renderAll();
    //   },
    //   onComplete: function () {
    //     canvasObj.renderAll();
    //   },
    // });
  }

  drawBox() {
    const centerPointX = this.calculatedBgWidth / 2 - 100;
    const centerPointY = window.innerHeight / 2 + 100;
    // const rect1 = new fabric.Rect({
    //   left: centerPointX,
    //   top: centerPointY,
    //   fill: "red",
    //   width: 200,
    //   height: 200,
    // });

    // const addImage = (img) => {
    //   this.canvasObject.add(img)
    // }
    const cvs = this.canvasObject;

    fabric.Image.fromURL('https://i.ibb.co/7njJ4j9/1.png', function (img) {
      const oImg = img
        .set({ left: centerPointX - 40, top: centerPointY - 60 })
        .scale(0.8);
      cvs.add(oImg);
      oImg.on('selected', (opt) => {
        fabric.util.animate({
          startValue: cvs.getZoom(),
          endValue: 1.4,
          duration: 500,
          onChange: function (zoomvalue) {
            const targetX = opt.target?.oCoords?.mtr.x as number;
            const targetY = opt.target?.oCoords?.mtr.y as number;

            cvs.zoomToPoint(
              {
                x: targetX,
                y: targetY,
              },
              zoomvalue,
            );
            cvs.renderAll();
          },
          onComplete: function () {
            opt.e.preventDefault();
            opt.e.stopPropagation();
            cvs.renderAll();
          },
        });
      });
    });

    // this.canvasObject.add(box);

    // this.canvasObject.add(rect1);

    // box.on("selected", (opt) => {
    //   const canvasObj = this.canvasObject;

    //   fabric.util.animate({
    //     startValue: canvasObj.getZoom(),
    //     endValue: 1.4,
    //     duration: 500,
    //     onChange: function (zoomvalue) {
    //       const targetX = opt.target?.oCoords?.mtr.x as number;
    //       const targetY = opt.target?.oCoords?.mtr.y as number;

    //       canvasObj.zoomToPoint(
    //         {
    //           x: targetX,
    //           y: targetY,
    //         },
    //         zoomvalue
    //       );
    //       canvasObj.renderAll();
    //     },
    //     onComplete: function () {
    //       opt.e.preventDefault();
    //       opt.e.stopPropagation();
    //       canvasObj.renderAll();
    //     },
    //   });
    // });
  }

  async drawItems() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    fabric.Image.fromURL('https://i.ibb.co/z8FJry8/Polaroid.png', (img) => {
      const oImg = img
        .scale(0.8)
        .set({ left: width / 2 - 110, top: height / 2 - 100 });
      this.canvasObject.add(oImg);
    });
    fabric.Image.fromURL(
      'https://i.ibb.co/xhSVSMp/Planar-Figure.png',
      (img) => {
        const oImg = img
          .scale(0.8)
          .set({ left: width / 2 - 100, top: height / 2 + 200 });
        this.canvasObject.add(oImg);
      },
    );
    fabric.Image.fromURL('https://i.ibb.co/9tz74m1/Color-Paper.png', (img) => {
      const oImg = img
        .scale(0.8)
        .set({ left: width / 3, top: height / 2 + 50 });
      this.canvasObject.add(oImg);
    });
    fabric.Image.fromURL('https://i.ibb.co/crPkCV9/Note.png', (img) => {
      const oImg = img
        .scale(0.8)
        .set({ left: width / 2 + 100, top: height / 2 + 20 });
      this.canvasObject.add(oImg);
    });
  }
}
