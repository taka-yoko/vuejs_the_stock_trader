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

ヘッダの作成。
bootstrapの設定を利用
https://getbootstrap.com/docs/3.3/components/#navbar

必要な所だけを抽出。サイト内リンクは、前章で設定したvue-routerのものを
使用。
タグとクラス名をbootstrapのルールに沿うようにする。

```html
<ul class="nav navbar-nav">
  <router-link to="/portfolio" activeClass="active" tag="li"><a>Portfolio</a></router-link>
  <router-link to="/stocks" activeClass="active" tag="li"><a>Stocks</a></router-link>
</ul>
```

## Planning the Next Steps

次に実装するcomponentを考える。
はStocks componentを作成することにする。

- stockをグリッド表示する
- stock名と現在の価格を表示
- inputフィールドとbuyボタンを実装。inputフィールドが空でなく、有効な数字であればユーザーはstockを買うことができる。

## Creating Stocks Components

Stocks.vueにダミーのdataを用意して、v-forで配列分のStockを作成

```javascript
data() {
  return {
    stocks: [
      { id: 1, name: 'BMW', price: 110 },
      { id: 2, name: 'Google', price: 200},
      { id: 3, name: 'Apple', price: 250},
      { id: 4, name: 'Twitter', price: 8},
    ]
  }
},
```

## Adding a "Buy" Button

Stocks componentからStock componentへstockデータを
送る。
Stock componentのpropsで受け取ったデータを表示。
Stock componentのbuy buttonのイベント設定。
id, price, quantityをorderオブジェクトとしてまとめる。
ここではとりあえずconsole.logで表示まで。

```javascript
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      }
      console.log(order);
    }
  }
```

無効な数字が入っているときは、buy buttonを無効にする
※v-modelに.numberをつけないと、文字列とみなされて、 Number.isIntegerですべて無効、と判断されてしまう。

```html
<input
  type="number"
  class="form-control"
  placeholder="Quantity"
  v-model.number="quantity">

<button
  class="btn btn-success"
  @click="buyStock"
  :disabled="!isValidNumber"
  >Buy</button>
```

```javascript
computed: {
    isValidNumber() {
      return Number.isInteger(this.quantity) && this.quantity > 0;
    }
  },
```

## Setting up the Vuex State Management

vuexをインストール
Storeの設定(Stocks側)
main.jsでstore読み込み
Storeでdataの初期設定を行う。
App.vueのcreatedでaction呼び出し

## Adding a Portfolio Module to Vuex

Storeの設定(Portfolio側)

## Working on the Portfolio Stocks

## Connecting the Portfolio with Vuex

## Time to fix some Errors

src/components/portfolio/Stock.vue の
sellStock Actionとmethodの名前が重複していた所を修正

## Displaying the Funds

fundsの表示。HomeとHeaderに表示する。

## Adding some Order Checks

- stock購入数の合計金額が、所持金を超えるとボタンが押せなくなる設定
- stock売却数が、所持したstock数を超えるとボタンが押せなくなる設定

いずれもcomputedに設定を追加する。

## Making Funds Look Nicer with Filters

globalフィルターを作成し、各コンポーネントで使用。

```javascript
Vue.filter('currency', (value) => {
  return `$${value.toLocaleString()}`
});
```

## Ending the Day - Randomizing Stocks

stock priceをランダムに変更する。
headerのEnd Dayをクリックすることでpriceが更新されるようにする。

```javascript
//Header.vue
methods: {
  ...mapActions([
      'randomizeStocks'
  ]),
  endDay() {
    this.randomizeStocks();
  }
}
```

```javascript
//modules/stocks.js
'RND_STOCKS' (state) {
  state.stocks.forEach(stock => {
    stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
  });
}
```

## Animating the Route Transitions

各コンポーネントの表示・非表示の際にアニメーションするように設定

```html
<transition name="slide" mode="out-in">
    <router-view></router-view>
</transition>
```

この辺りはcss3の設定の話

```css
<style scoped>
    .slide-enter-active {
        animation: slide-in 200ms ease-out forwards;
    }
    .slide-leave-active {
        animation: slide-out 200ms ease-out forwards;
    }

    @keyframes slide-in {
        from {
            transform: translateY(-30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-30px);
            opacity: 0;
        }
    }
</style>
```

## Saving &amp; Fetching Data - Adding a Dropdown

ヘッダーのdropdownリストを有効にする。
bootstrapの機能で、 class="dropdown"にopenを追加すると、
下にあるdropdown-menuが表示される。

```javascript
<li
    class="dropdown"
    :class="{ open: isShow }">
...
<ul class="dropdown-menu">
    <li><a href="#">Save Data</a></li>
    <li><a href="#">Load Data</a></li>
  </ul>
```

Save&LoadのテキストクリックでtoggleDropdownメソッドが発動する。
toggleDropdownではisShowをtrue, falseでtoggleする。

```html
@click.prevent="toggleDropdown">Save & Load<span class="caret"></span></a>
```

```javascript
toggleDropdown() {
  this.isShow = !this.isShow;
}
```

## Setting up vue-resource and Firebase

動画だとvue-resourceだが、ここはaxiosを使うことにする

## Saving Data (PUT Request)

src/api/async_api.jsにaxiosでfirebaseからデータの取得、更新
するメソッドを記述。

## Fetching Data (GET Request)

firebaseからデータを取得。
async_api.jsにaxiosのgetメソッドを追加。

```javascript
getData() {
  axios.get(API_URI + "data.json");
}
```

actions.jsを新たに作成。loadDataボタンを押したときに
データを取得するアクションを記述。
非同期処理はアクションに記載して、取得したデータをmutationにcommitで渡す。

```javascript
import AsyncAPI from '../api/async_api.js';

export const loadData = ({commit}) => {
  AsyncAPI.getData()
    .then(responce => {
      const data = response.json();

      if(data) {
        const stocks = data.stocks;
        const funds = data.funds;
        const stockPortfolio = data.stockPortfolio;

        const portfolio = {
          funds,
          stockPortfolio
        };

        commit('SET_STOCKS', stocks);
        commit('SET_PORTFOLIO', portfolio);
      }
    });
};
```

## Testing and Bug Fixes

loadDataボタン押下後、firebaseからデータを取得。
actionメソッド（mapActions使用）

```javascript
...mapActions({
    randomizeStocks: 'randomizeStocks',
    fetchData: 'loadData'
}),

loadData() {
  this.fetchData();
}
```

actionメソッドをstoreに登録。

```javascript
import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  modules: {
    stocks,
    portfolio
  }
});
```

## Project Wrap Up

このchapterで使ったもの
- animation
- routing
- vuex
- if statements
- lists
- conditionals

このchapterでやらなかったこと
- nested routes

## Bonus: Debugging Vuex with Vue Developer Tools

Vue developer toolを使うと、デバッグが楽になる。
mutation（stateの変更）の詳細、取り消しなどが可能になる。
