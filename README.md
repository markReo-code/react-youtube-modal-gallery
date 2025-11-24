# YouTube Modal Gallery

## 概要
YouTube 動画のサムネイル一覧から、クリックでモーダル再生できるシンプルなデモです。

## 開発背景
以前にクライアントワーク（Web 制作）で、動画一覧をリスト形式で表示し、各カードをクリックするとモーダルウィンドウで再生する実装を担当しました。  
その経験から「同じことを React + TypeScript ではどう実装するか？」を整理したいと考え、ReactPlayer を使った汎用的なテンプレートとしてまとめたのが本リポジトリです。

## 技術スタック
- React + TypeScript（Vite）
- ReactPlayer
- 自作カスタムフック
  - `useScrollLock`
  - `useEscapeKey`
  - `useInert`

### カスタムフックについて
本プロジェクトでは「React + TypeScript で複数動画をモーダルウィンドウで表示する」ことを題材にしていますが、
各カスタムフック自体はモーダル専用ではなく、他の UI でも再利用できるように設計しています。

- `useScrollLock` … モーダルだけでなく、ドロワーメニューや検索パネルなど「開いている間は背景を固定したい UI」に利用可能
- `useEscapeKey` … モーダル以外にも、「Esc で閉じたい／キャンセルしたい」コンポーネントで共通的に使用できます。
- `useInert` … モーダルオープン中に `<main>` 要素へ `inert` を付与し、背景コンテンツへのフォーカス移動やクリックを無効化します。

## 主な実装機能
- サムネイル一覧からのモーダル再生
- YouTube サムネイル URL の動的生成
- モーダル表示中の背景スクロールロック（iOS 対応）
- Escape キー / オーバーレイクリックによるモーダルを閉じる処理

## ディレクトリ構成

```
├─ public/
│  └─ modal_arrow.svg
├─ src/
│  ├─ _hooks/
│  │  ├─ useEscapeKey.ts
│  │  ├─ useInert.ts
│  │  └─ useScrollLock.ts
│  ├─ components/
│  │  └─ Modal.tsx
│  ├─ data/
│  │  └─ videos.ts
│  ├─ types/
│  │  └─ video.ts
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ index.html
├─ package.json
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
├─ vite.config.ts
└─ README.md
```

### アクセシビリティに関して
- 各カードのサムネイル画像は装飾扱いのため `alt=""`（タイトルテキストを別要素で表示）
- モーダルには `role="dialog"` と `aria-modal="true"` を付与
- モーダルオープン中は以下を実装
  - 背景スクロールロック（`useScrollLock`）
  - `<main>` 要素への `inert` 付与による、背景コンテンツのフォーカス・クリック無効化（`useInert`）
  - Escape キーでのモーダルを閉じる処理（`useEscapeKey`）
  - オーバーレイクリックでのモーダルを閉じる処理

今回のモーダルは「閉じるボタン」と YouTube プレイヤーを主なフォーカス対象としたシンプルな “動画ビューア” タイプのため、  
フォーカストラップ（Tab キーでモーダル内にフォーカスを閉じ込める処理）はあえて実装していません。  
その代わりに、背景に inert を付与することで「フォーカスがモーダル外へ飛ばない」状態を担保しています。

## セットアップ

前提
- Node.js v20 以上

このリポジトリをクローンして実行する場合:

```bash
git clone https://github.com/markReo-code/react-youtube-modal-gallery.git
cd react-youtube-modal-gallery
npm install
npm run dev
```

## 今後の改善・補足
現在は、モーダルの開閉アニメーションをつけるために  
モーダルの DOM 自体は常に残したまま、クラスの付け替えで `opacity` / `visibility` を切り替えています。

アニメーションが不要なケースであれば、`Modal` コンポーネント側で  
`isOpen` が `false` のときに `return null` とし、モーダルをアンマウントする実装の方が
シンプルになる場面もあると思います（DOM から完全に消えるので、スクリーンリーダー的にも分かりやすい状態になります）。  

### 補足：`<dialog>` 要素について
今回は、React から状態管理しやすく、カスタムフックを汎用的に再利用しやすいよう  
`<div role="dialog">` + ARIA 属性に加え、  
背景への `inert` 付与 / Escapeキー / オーバーレイクリックによる
モーダルを閉じる処理という形で実装しています。   
将来的には `<dialog>` 要素 + `showModal()` / `close()` を組み合わせた実装も検証し、  
ブラウザネイティブな挙動との違いを比較する予定です。

## ライセンス
このプロジェクトは MIT License のもとで公開されています






