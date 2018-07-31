# frontend-boilerplate

Webサイト開発用のboilerplateです。   
ReactやVueなどを使ったSPA制作には対応していません。   
    
deploy時は、webの`src/`を除いた状態でdeployして下さい.


## USAGE
まずパッケージをインストールして下さい。

```bash
$yarn install
```

or

```bash
$make setup
```

その後、以下のコマンドを実行すると、 `localhost:3000` でWebサーバーが立ち上がります。

```bash
$gulp
```

or

```bash
$yarn start
```

or

```bash
$make run
```

## CSS
作業ディレクトリ: `web/src/styles`   
   
ルールが定まっていないので、特にディレクトリ構成なども作成していません。   
エントリーポイントを `index.scss` とし、そこに様々なscssファイルがインポートされることを想定しています。   
デフォルトで、 [sanitize.css](http://jonathantneal.github.io/sanitize.css/) がimportされていますが、用途に合わせてreset.cssに変えるなりしても良いと思います。（どのreset.cssを使うかというルール決めをするのも良いかもしれません）
CSSライブラリですが、 `yarn` で追加したものをimportするのがcleanで良いかと思われます.

### コンパイル方法

```bash
$gulp styles
```

or

```bash
$make styles
```
 


### Prettier
整形ツールとして [CSScomb](http://csscomb.com) を採用しています。基本的なruleのみ記述しています。  
sort-orderは社内ルールが決まり次第書いていきましょう.

#### 参考記事
[【Grunt】csscombでソートだけでなくインデントなどのフォーマットも整形する \| バシャログ。](http://bashalog.c-brains.jp/14/12/01-202258.php)
[CSSCombのAtomプラグイン \- EagleLand](https://1000ch.net/posts/2015/atom-csscomb.html)


## JavaScript
作業ディレクトリ: `web/src/scripts`   
    
`common.js` をエントリーポイントとします。
パッケージは基本的に `yarn` で入れられるパッケージはyarnでaddした上で、require or importすることを推奨します。   
このboilerplateでは実際に、 `jQuery` をその方法でrequireしていますので、`common.js` を参考にしてみて下さい.   

また、webpackのbuild軽量化のために、外部ライブラリはdllとしてコンパイルされるようになっています。
ライブラリの追加時は、 `webpack.dll.config` の `vendor` にpluginを追加した上で、 `make scripts-dll` を実行してください.


### コンパイル方法

```bash
$gulp scripts
```

or

```bash
$make scripts
```
 

### ディレクトリ構成

#### components
機能毎のパーツをclassで切り出して作成し、ここに配置します.

#### helpers
各ページにまたがって使うようなhelperクラス、関数をここに配置します.

#### libs
npmにないようなライブラリ、パッケージはここに入れて下さい。そして、必要なページでここからrequireして下さい。


## ドキュメント情報
作成者: 岩本 大樹 <iwamoto@cshool.jp>  
更新日: 2018/07/31
