# vue-cli

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).


## What's this?

UdemyのVue JS - The Complete GuideのSection18 Final Project - The Stock Traderをまとめたもの。 https://www.udemy.com/vuejs-2-the-complete-guide

## Project Introduction

## Project Setup and Planning

「スプレッド演算子 (spread operator)」を使うため、babelをインストール
$ npm install --save-dev babel-preset-stage-2

まず現状で考えつくコンポーネントの作成と、ルーティングの設定を行っていく。

## Creating the First Components

考えつくコンポーネントを作成。
この段階ではtemplateに表示確認用の文字を暫定的に入れておく。

## Setup Project Routes

vue-routerインストール
$ npm i --save vue-router

src直下にroutes.js作成。ルーティングの設定を行う。

```javascript
//import .... 各コンポーネントファイルをimport

export const routes = [
  { path: '/', component: Home },
  { path: '/portfolio', component: Portfolio },
  { path: '/stocks', component: Stocks }
];
```

main.jsで読み込む

```javascript
const router = new VueRouter({
  mode: 'history',
  routes
});
```

App.vueのtemplateでrouter-viewタグを記述。

```html
<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>
```

ローカルで以下のページにアクセス。ルーティング設定が
効いていることがわかる。

- http://localhost:8080/
- http://localhost:8080/portfolio
- http://localhost:8080/stocks

## Adding a Header and Navigation

## Planning the Next Steps

## Creating Stocks Components

## Adding a "Buy" Button

## Setting up the Vuex State Management

## Adding a Portfolio Module to Vuex

## Working on the Portfolio Stocks

## Connecting the Portfolio with Vuex

## Time to fix some Errors

## Displaying the Funds

## Adding some Order Checks

## Making Funds Look Nicer with Filters

## Ending the Day - Randomizing Stocks

## Animating the Route Transitions

## Saving &amp; Fetching Data - Adding a Dropdown

## Setting up vue-resource and Firebase

## Saving Data (PUT Request)

## Fetching Data (GET Request)

## Testing and Bug Fixes

## Project Wrap Up

## Bonus: Debugging Vuex with Vue Developer Tools

## Module Resources &amp; Useful Links

