var A1; // 読み込むサウンド用変数

// シーケンス用配列
var sqArr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

// ループカウント
var loopCount = 0;


// UIボタン
var bpmSlider; // BPMスライダ
var bpmText // BPM用テキスト
var startBtn; // スタートボタン
var stopBtn; // ストップ
var btnArr = []; // 入力ボタン用配列


// 音データのプリロード
function preload() {
  A1 = loadSound('audio/casio/A1.mp3');
}


// 初期設定
function setup() {

  // 初期はループ停止
  // noLoop();

  // BPM 初期値120
  bpmSlider = createSlider(40, 200, 120); // スライダの作成
  bpmSlider.position(90, 18); // スライダの位置


  // A1サウンドのボリューム
  A1.setVolume(0.8);

  // スタートボタンの生成
  startBtn = createButton('start');
  startBtn.position(250, 20);
  startBtn.mousePressed(startLoop);

  // 停止ボタンの生成
  stopBtn = createButton('stop');
  stopBtn.position(300, 20);
  stopBtn.mousePressed(stopLoop);


  // 入力ボタンの生成
  for (var i = 0; i < sqArr.length; i++) {
    btnArr[i] = createButton(i); //<button>の生成
    btnArr[i].value(i); //<button>のvalueにi番を設定
    btnArr[i].position(30 * i + 20, 70); //<button>の位置
    btnArr[i].mousePressed(function(e){
       //<button>を押した時のイベント
      // console.log(this.elt.value);
      changeInput(this.elt.value);
    });
  }

  createCanvas(900, 600); //Canvasの生成
  background(255); //初期の背景色

}


// ループ関数
function draw(){

  // console.log(sqArr);
  background(255);

  // BPMスライダー値の取り出し
  bpmValue = bpmSlider.value();
  // console.log(bpmValue);
  frameRate( (bpmValue * 4) / 60);　// BMPをフレームレートに変換

  // シーケンサー用の円の配置
  for (var i = 0; i < sqArr.length; i++) {
    noStroke(); //線なし

    // シーケンス用配列の値が0なら
    if(sqArr[i] == 0){
      fill(200); // 塗りはグレー
    } else {
      // シーケンス用配列の値が1なら
      fill(255, 150, 0); // 塗りはオレンジ
    }
    // 円の配置
    ellipse(50*i + 50, 150, 40, 40);
  }

  // ループカウンターの数がシーケンス用配列の最大になったら
  if(loopCount >= sqArr.length){
    loopCount = 0; //ループカンターを0に戻す
  }

  // ループ用の円の色
  fill(255, 0, 0);
  // ループ用の円の配置
  ellipse(50 * loopCount + 50, 150, 40, 40);

  // console.log(loopCount);
  // console.log(sqArr[loopCount]);

  // シーケンス用配列のループカンター番目の値が1なら
  if(sqArr[loopCount] !== 0){
    // console.log('play');
     A1.play();　// 再生
  }

  // ループカンターをインクリメント
  loopCount++;

}


// ストップボタンを押した時の停止
function stopLoop() {
  console.log('停止');
  noLoop(); // drawループ停止
}

// スタートボタンを押した時の再生
function startLoop(){
  console.log('再生');
  loop(); // drawループ開始
}


// インプット入力の値をシーケンス用配列に設定する
function changeInput(value) {
  console.log(value+'click');

  if( sqArr[value] == 0 ){
    // トグル　現状の値が0なら1を設定
    sqArr[value] = 1;
  } else {
    sqArr[value] = 0;
    // トグル　現状の値が1なら0を設定
  }
}
