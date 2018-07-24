<template>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand">Stock Trader</router-link>
    </div>

    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <router-link to="/portfolio" activeClass="active" tag="li"><a>Portfolio</a></router-link>
        <router-link to="/stocks" activeClass="active" tag="li"><a>Stocks</a></router-link>
      </ul>
      <strong class="navbar-text navbar-right">Funds: {{ funds | currency }}</strong>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#" @click="endDay">End Day</a></li>
        <li
            class="dropdown"
            :class="{ open: isShow }">
          <a
            href="#"
            class="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            @click.prevent="toggleDropdown">Save & Load<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#" @click.prevent="saveData">Save Data</a></li>
            <li><a href="#" @click.prevent="loadData">Load Data</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
</template>

<style scoped>
  .show {
    display: block;
  }
</style>


<script>
import {mapActions} from 'vuex';
import AsyncAPI from '../api/async_api.js';

export default {
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    funds () {
      return this.$store.getters.funds;
    }
  },
  methods: {
    ...mapActions([
        'randomizeStocks'
    ]),
    endDay() {
      this.randomizeStocks();
    },
    toggleDropdown() {
      this.isShow = !this.isShow;
    },
    saveData() {
      const data = {
        funds: this.$store.getters.funds,
        stockPortfolio: this.$store.getters.stockPortfolio,
        stocks: this.$store.getters.stocks
      };
      AsyncAPI.putData(data);
    },
    loadData() {

    }
  }
}
</script>
