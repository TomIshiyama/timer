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

macOS 版は Apple Silicon と Intel の双方で動く universal バイナリを配る。手元でビルドする場合は `npm run build:mac` を実行すると `dist/` に同じものが出る。

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
