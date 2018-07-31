# タスクを指定しないmakeの実行を禁止する.
all:
	echo "make単体での実行は禁止されています.タスクを指定して実行して下さい."
	exit 1

# projectのセットアップ
setup:
	yarn install

# サーバー起動.
run:
	gulp

# cssのコンパイル.
styles:
	gulp styles

# jsのコンパイル.
scripts:
	gulp scripts

# js dllのコンパイル.
scripts-dll:
	gulp scripts.dll
