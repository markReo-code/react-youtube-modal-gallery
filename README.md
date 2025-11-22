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
  - `useFocusTrap`
  - `useEscapeKey`

### カスタムフックについて
本プロジェクトでは「React + TypeScript で複数動画をモーダルウィンドウで表示する」ことを題材にしていますが、
各カスタムフック自体はモーダル専用ではなく、他の UI でも再利用できるように設計しています。

- `useScrollLock` … モーダルだけでなく、ドロワーメニューや検索パネルなど「開いている間は背景を固定したい UI」に利用可能
- `useFocusTrap` … ダイアログやフォーム付きモーダルなど、フォーカスを特定領域内に閉じ込めたい場面で再利用可能
- `useEscapeKey` … モーダル以外にも、「Esc で閉じたい／キャンセルしたい」コンポーネントで共通的に使用できます。

## 主な実装機能
- サムネイル一覧からのモーダル再生
- YouTube サムネイル URL の動的生成
- モーダル表示中の背景スクロールロック（iOS 対応）
- モーダル内のフォーカストラップ（Tab でループ）
- Escape キー / オーバーレイクリックでのクローズ

## ディレクトリ構成

```
├─ public/
│  └─ modal_arrow.svg
├─ src/
│  ├─ _hooks/
│  │  ├─ useEscapeKey.ts
│  │  ├─ useFocusTrap.ts
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
- モーダルオープン中は
  - 背景スクロールロック（`useScrollLock`）
  - フォーカストラップ（`useFocusTrap`）
  - Escape キーでのクローズ（`useEscapeKey`）
  を実装

### 補足：`<dialog>` 要素について
今回は、React から状態管理しやすく、カスタムフックを汎用的に再利用しやすいよう  
`<div role="dialog">` + ARIA 属性 + 自前のフォーカス制御でモーダルを実装しています。  
将来的には `<dialog>` 要素 + `showModal()` / `close()` を組み合わせた実装も検証し、  
ブラウザネイティブな挙動との違いを比較する予定です。

## セットアップ

前提
- Node.js v20 以上

```bash
npm install
npm run dev
```

## 今後の改善、備考
- 現在は `if (!isOpen) return null;` によってモーダルの DOM 自体を付け外ししていますが、
  今後は DOM は常に残したままクラス切り替えで開閉し、`opacity: 0 → 1` のトランジションで
  より自然なフェードイン / フェードアウトを実装したいと考えています。

## ライセンス
このプロジェクトは MIT License のもとで公開されています。






