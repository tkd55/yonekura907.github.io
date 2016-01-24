// 読み込むサウンド用配列
var sounds = [];

// 読み込むサウンド用データ
var soundData = [
  'audio/casio/sample.mp3',
	'audio/casio/Cs2.mp3',
	'audio/casio/E2.mp3',
	'audio/casio/Fs2.mp3'
]

// ループカウント
var loopCount = 0;

// シーケンサー配列の数
var sqCount = 16;


// UIボタン
var bpmSlider; // BPMスライダ
var bpmText // BPM用テキスト
var startBtn; // スタートボタン
var stopBtn; // ストップ


// シーケンサーインスタンス用の変数
var a, csharp, e, fsharp;


// 音データのプリロード
function preload() {
  for (var i = 0; i < soundData.length; i++) {
    sounds[i] = loadSound(soundData[i]);
  }
}


// 初期設定
function setup() {

  // 初期はループ停止
  // noLoop();

  // BPM 初期値120
  bpmSlider = createSlider(40, 200, 120); // スライダの作成
  bpmSlider.position(90, 18); // スライダの位置


  // スタートボタンの生成
  startBtn = createButton('start');
  startBtn.position(250, 20);
  startBtn.mousePressed(startLoop);

  // 停止ボタンの生成
  stopBtn = createButton('stop');
  stopBtn.position(300, 20);
  stopBtn.mousePressed(stopLoop);


  a = new Sequencer(50, 100, sounds[0]);
  csharp = new Sequencer(50, 250, sounds[1]);
  e = new Sequencer(50, 400, sounds[2]);
  fsharp = new Sequencer(50, 550, sounds[3]);

  createCanvas(900, 900); //Canvasの生成
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

  a.set();
  csharp.set();
  e.set();
  fsharp.set();


  // ループカンターをインクリメント
  loopCount++;

  // ループカウンターの数がシーケンス用配列の最大になったら
  if(loopCount >= sqCount){
    loopCount = 0; //ループカンターを0に戻す
  }

}

// シーケンサー・クラス
function Sequencer(aX,aY,aSound){
  // 初期設定
  this.init(aX,aY,aSound);
}

// 初期設定をするメソッド
Sequencer.prototype.init = function(aX,aY,aSound){
    this.x = aX;
    this.y = aY;
    this.sound = aSound;
  
    // シーケンス用配列
    this.sqArr = [];
    // 16個分、配列に0を並べる
    for (var i = 0; i < sqCount; i++) {
      this.sqArr[i] = 0;
    }
  
    // イベントの
    var thatSqArr = this.sqArr;
  
    this.btnArr = []; // 入力ボタン用配列
  
    // 入力ボタンの生成
    for (var i = 0; i < this.sqArr.length; i++) {
      this.btnArr[i] = createButton(i); //<button>の生成
      this.btnArr[i].value(i); //<button>のvalueにi番を設定
      this.btnArr[i].position(49 * i + this.x, this.y); //<button>の位置
      this.btnArr[i].mousePressed(function(e){
         //<button>を押した時のイベント
        console.log(this.elt.value);
        this.changeInput(this.elt.value);
      });
    }
}

// インプット入力の値をシーケンス用配列に設定する
Sequencer.prototype.changeInput = function(aValue) {
    console.log(aValue+'click');

    if( thatSqArr[aValue] == 0 ){
        // トグル　現状の値が0なら1を設定
        thatSqArr[aValue] = 1;
        console.log('111');
    } else {
        thatSqArr[aValue] = 0;
        // トグル　現状の値が1なら0を設定
        console.log('000');
    }
}


Sequencer.prototype.set = function(){

  // A1サウンドのボリューム
  this.sound.setVolume(0.8);

  // シーケンサー用の円の配置
  for (var i = 0; i < this.sqArr.length; i++) {
    noStroke(); //線なし

    // シーケンス用配列の値が0なら
    if(this.sqArr[i] == 0){
      fill(200); // 塗りはグレー
    } else {
      // シーケンス用配列の値が1なら
      fill(255, 150, 0); // 塗りはオレンジ
    }
    // 円の配置
    ellipse(50*i + this.x, this.y+70, 40, 40);
  }

  // ループ用の円の色
  fill(255, 0, 0);
  // ループ用の円の配置
  ellipse(50 * loopCount + this.x, this.y+70, 40, 40);

  // console.log(loopCount);
  // console.log(sqArr[loopCount]);

  // シーケンス用配列のループカンター番目の値が1なら
  if(this.sqArr[loopCount] !== 0){
    // console.log('play');
    this.sound.play();　// 再生
  }

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
