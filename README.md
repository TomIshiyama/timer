# timer

Electron application with Solid and TypeScript.

## Project architecture

A project architecture is under considering due to a lack of my knowledge.

[SPA Component の推しディレクトリ構成について語る](https://zenn.dev/yoshiko/articles/99f8047555f700)

[Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

### Storybook

Storybook は現在起動しない。`yarn storybook` は `require is not defined in ES module scope` で止まる。ビルド基盤を Vite 7 へ上げた一方で、Storybook を 7.0.12 に据え置いたため。`@storybook/builder-vite` 7.0.12 の peer は `vite: ^3 || ^4` に留まっている。

リリース経路には関わらないため、配布物には影響しない。Storybook 10 系への移行は別途行う。

## macOS 配布時のコード署名

Apple の署名証明書を持たないため、`electron-builder.yml` で `mac.identity` に `"-"` を指定して ad-hoc 署名している。ad-hoc 署名は発行元を伴わない自己完結の署名で、バンドルの整合性は保たれる。

この指定を外すと electron-builder は署名処理そのものを打ち切る。未署名の `.app` をダウンロード経由で受け取ると、Gatekeeper が「壊れているため開けません」と判定して起動できない。

`build/entitlements.mac.plist` の `com.apple.security.cs.disable-library-validation` も外せない。ad-hoc 署名では Hardened Runtime の Library Validation が働く。Team ID を持たない `Electron Framework` を読み込めず、起動が失敗する。

発行元が未認証であることに変わりはないため、受け取り方によっては初回起動時に「開発元を確認できません」の警告が出る。

### 配布する側

タグを `v*.*.*` の形式で push すると `.github/workflows/release.yml` が各 OS 向けにビルドする。成果物は GitHub Releases に添付されて公開されるので、受け取る側にはこのリリースページの URL を渡す。起動手順はリリース本文に書かれるため、別途の説明は要らない。

成果物のファイル名には `package.json` の `version` が入る。タグと食い違うとリリースページの表示と中身がずれるので、タグを打つ前に同じ値へ揃える。

macOS 版は Apple Silicon と Intel の双方で動く universal バイナリを配る。`yarn build:mac` を実行すると、手元でも同じ成果物を `dist/` に作れる。自分で使うだけなら後述の「自分でビルドして使う」のほうが速い。

### 受け取った側の起動手順

`com.apple.quarantine` 属性はブラウザや Slack などダウンロードするアプリが付ける。`curl` は付けないため、次の手順なら警告が出ずに起動する。

```bash
$ curl -L -o timer.zip <リリースの zip URL>
$ unzip timer.zip -d /Applications
```

ブラウザでダウンロードした場合は、属性を外してから起動する。

```bash
$ xattr -dr com.apple.quarantine /Applications/timer.app
```

コマンドを使わない場合は、起動して警告が出た後に `システム設定` の `プライバシーとセキュリティ` から「このまま開く」を選ぶ。macOS 15 以降は Finder で右クリックして「開く」を選ぶ回避方法が廃止されているので、この経路を使う。

quarantine 属性はダウンロードしたファイルごとに付き、承認も引き継がれない。そのため、いずれの手順もバージョンを更新するたびに必要になる。

### 自分でビルドして使う

自分でビルドした `.app` には `com.apple.quarantine` が付かないので、警告も出ず属性を外す操作も要らない。

Node.js と yarn 1 系が必要になる。動作を確認したのは Node 22 (CI) と Node 26 (手元) で、yarn は `yarn -v` が 1.x を返すものを使う。

```bash
$ git clone https://github.com/TomIshiyama/timer.git
$ cd timer
$ yarn install --frozen-lockfile
$ yarn build:mac:local
```

ビルドの最後に `appOutDir=dist/mac-arm64` のように出力先が表示される。Apple Silicon なら `dist/mac-arm64`、Intel なら `dist/mac` になる。`uname -m` が `arm64` を返せば Apple Silicon にあたる。

```bash
$ cp -R dist/mac-arm64/timer.app /Applications/
$ open /Applications/timer.app
```

`yarn build:mac:local` は実行中の Mac のアーキテクチャだけをビルドし、dmg も zip も作らない。配布用の `yarn build:mac` より速く終わる。Apple Silicon の手元では 45 秒ほどだった。

更新は `git pull` してビルドし直す。ダウンロードで受け取る場合と違い、毎回 quarantine 属性を外す操作は要らない。
