# タスクを指定しないmakeの実行を禁止する.
all:
	echo "make単体での実行は禁止されています.タスクを指定して実行して下さい."
	exit 1

# projectのセットアップ
setup:
	yarn

# サーバー起動.
run:
	yarn start

# production build.
build:
	yarn build

# js dllのコンパイル.
rebuild-scripts-dll:
	rm -f ./.dll/vendor-manifest.json ./web/assets/js/vendor.dll.js
	npx webpack --config ./webpack.dll.config.js
