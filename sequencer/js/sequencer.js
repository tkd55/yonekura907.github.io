var A1;

var sqArr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var loopCount = 0;


// Slider
var bpm_slider; // スライダ
var startBtn;
var stopBtn;
var btnArr = [];




// プリロード
function preload() {
  A1 = loadSound('audio/casio/A1.mp3');
}

function setup() {

  // 初期はループ停止
  // noLoop();

  // BPM 初期値120
  bpm_slider = createSlider(40, 180, 120); // スライダの作成
  bpm_slider.position(10, 20); // 位置の指定
  // ボリューム
  A1.setVolume(0.8);

  // スタートボタン
  startBtn = createButton('start');
  startBtn.position(180, 19);
  startBtn.mousePressed(startLoop);


  // 停止ボタン
  stopBtn = createButton('stop');
  stopBtn.position(230, 19);
  stopBtn.mousePressed(stopLoop);



  // 入力　input
  for (var i = 0; i < sqArr.length; i++) {
    btnArr[i] = createButton(i);
    btnArr[i].value(i);
    btnArr[i].position(30 * i + 20, 70);
    btnArr[i].mousePressed(function(e){
      // console.log(this.elt.value);
      changeInput(this.elt.value);
    });
  }

  createCanvas(900, 600);
  background(255);

}



function draw(){

  // スライダー値の取り出し
  var bpmValue = bpm_slider.value();
  console.log(bpmValue);
  frameRate( (bpmValue * 4) / 60);　// BMPをフレームレートに変換

  // console.log(sqArr);
  background(255);



  for (var i = 0; i < sqArr.length; i++) {
    noStroke();

    if(sqArr[i] == 1){
      fill(255, 150,0);
    } else {
      fill(200);
    }
    ellipse(50*i + 50, 150, 40, 40);
  }


  if(loopCount >= sqArr.length){
    loopCount = 0;
  }

  fill(255, 0, 0);
  ellipse(50 * loopCount + 50, 150, 40, 40);

  // console.log(loopCount);
  // console.log(sqArr[loopCount]);

  if(sqArr[loopCount] !== 0){
    console.log('play');
     A1.play();
  }

  loopCount++;

}



function stopLoop() {
  noLoop();
}

function startLoop(){
  loop();
}

function changeInput(value) {
  console.log(value+'click');

  if( sqArr[value] == 0 ){
    sqArr[value] = 1;
  } else {
    sqArr[value] = 0;
  }
}



$(function(){


  // $('#circle li').on('click',function(){
  //   var indexNum = $('#circle li').index(this);
  //   console.log(indexNum);
  //
  //   if( sqArr[indexNum] == 0 ){
  //     sqArr[indexNum] = 1;
  //   } else {
  //     sqArr[indexNum] = 0;
  //   }
  //
  // });


});
