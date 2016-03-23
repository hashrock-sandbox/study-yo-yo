# yo-yo使ってみた

substackがmaxogden/yo-yo使ってて面白そうなので使ってみた

https://github.com/maxogden/yo-yo

# 学んだこと

 * ヨーヨーみたいに、dataを投げて、Actionが投げ返される方針だぜってことらしい（Data Down, Actions Up）
 * ES6 Template stringsは、Chrome, Firefoxですでにnative
 * リアルドム
 * やろうと思えば[minidux](https://github.com/freeman-lab/minidux)みたいなのも使えるらしい

```
//コンポーネント定義は、Dataとイベントハンドラを受け取る
function component(items, onselected) {
    return DOM; //onselectedを発火させる
}

//データ本体
var items = [];

function onselected(){
    update();
}

var el = component(items, onselected);
function update(){
    var newComponent = component(items, onselected);
    //Diffパッチ
    yo.update(el, newComponent);
}
```

# 思ったこと

 * なんかめっちゃいいかもしれない。
 * 全然babelとか通さなくても戦えるのよい
 * 独自構文とか一切ないのが気に入った。ES6対応しているエディタ（vscodeなど）ならそのまま対応している
 * あまりサンプルがなく、上級者向きっぽい。
 * 小さい。npmで配布するようなUIコンポーネントにそのままincludeする使い方がおすすめらしい。
 * コンポーネント定義、やりはじめると結局Reactっぽくなってくるのかなぁ。
 * ハンドラバケツリレーになるのが嫌な人も多い気もする。個人的にはfluxとかで頑張るより、こういう感じの方がJavaでのSwingで頑張ってた頃を思い出していいけど

# 試したいこと

 * 独自部分がないので、TypeScriptとかとも相性いいんじゃないかな？
 * ハンドラベースなので大丈夫だとは思うけど、複雑なアプリも作れるか気になる
