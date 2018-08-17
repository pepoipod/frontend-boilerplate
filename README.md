# frontend-boilerplate

Webサイト開発用のboilerplateです。   
ReactやVueなどを使ったSPA制作には対応していません。   
    
deploy時は、webの`src/`を除いた状態でdeployして下さい.


## USAGE

### セットアップ
```bash
$yarn install
```

or

```bash
$make setup
```

### Webサーバーの立ち上げ.
以下のコマンドを実行すると、 `localhost:8080` でWebサーバーが立ち上がります。   
※ ファイルの変更が動的に適用されますが実ファイルは更新されていません。ので、サーバーにデプロイする前はビルドの項を参考にして、ビルドするようにうしてください

```bash
$yarn start
```

or

```bash
$make run
```

終了したい際は `Ctrl + C` と入力してください。

### ビルド

```bash
$yarn start
```

or

```bash
$make run
```

稀に自動で終了しない時があるので、その際はビルドの完了を確認した後に `Ctrl + C` と入力してください。

## CSS
作業ディレクトリ: `web/src/styles`   
   
エントリーポイントを `index.scss` とし、そこに様々なscssファイルがインポートされることを想定しています。   
デフォルトで、 [sanitize.css](http://jonathantneal.github.io/sanitize.css/) がimportされていますが、用途に合わせてreset.cssに変えるなりしても良いと思います。（どのreset.cssを使うかというルール決めをするのも良いかもしれません）
CSSライブラリですが、 `yarn` で追加したものをimportするのがcleanで良いかと思われます.


### ディレクトリ構成
基本的な構成は以下のようになります。   
以下のディレクトリで十分まかなえるはずなので、不用意にディレクトリを新しく切ることはあまりおすすめしません。

#### base
プロジェクトのベースとなるscssをここに配置します。

* `_variable.scss` : 変数の宣言を行うファイルです。
* `_font.scss` : フォントファミリーの定義を行うファイルです。加えて、フォントファミリー関係の変数はここにまとめておくと、わかり良いかも知れません。
* `_mixin.scss` : mixinの定義を行うファイルです。
* `_function.scss` : functionの定義を行うファイルです。
* `_base.scss` : html, body, aなどプリミティブなタグにおいての基本的なstyle定義を行うファイルです。

#### components
component単位に分割されたscssファイルを配置する.

#### pages
page固有のstyleが定義されたscssファイルを配置する.

#### vendor
npmにないようなライブラリ、パッケージはここに入れて下さい。そして、index.scssでここからrequireして下さい。


### Prettier
整形ツールとして [CSScomb](http://csscomb.com) を採用しています。基本的なruleのみ記述しています。  
sort-orderは社内ルールが決まり次第書いていきましょう.

#### 参考記事
[【Grunt】csscombでソートだけでなくインデントなどのフォーマットも整形する \| バシャログ。](http://bashalog.c-brains.jp/14/12/01-202258.php)
[CSSCombのAtomプラグイン \- EagleLand](https://1000ch.net/posts/2015/atom-csscomb.html)


## JavaScript
作業ディレクトリ: `web/src/scripts`   
    
`index.js` をエントリーポイントとします。
パッケージは基本的に `yarn` で入れられるパッケージはyarnでaddした上で、require or importすることを推奨します。   
このboilerplateでは実際に、 `jQuery` をその方法でrequireしていますので、`index.js` を参考にしてみて下さい.   

また、webpackのbuild軽量化のために、外部ライブラリはdllとしてコンパイルされるようになっています。
ライブラリの追加時は、 `webpack.dll.config` の `vendor` にpluginを追加した上で、 `make rebuild-scripts-dll` を実行してください.

### ディレクトリ構成

#### components
機能毎のパーツをclassで切り出して作成し、ここに配置します.

#### helpers
各ページにまたがって使うようなhelperクラス、関数をここに配置します.

#### vendor
npmにないようなライブラリ、パッケージはここに入れて下さい。そして、必要なページでここからrequireして下さい。


## ドキュメント情報
作成者: 岩本 大樹 <iwamoto@cshool.jp>  
更新日: 2018/08/17
