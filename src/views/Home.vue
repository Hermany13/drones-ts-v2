<template>
  <div class="home">
    <div class="content-container">
      <div class="table-container" v-bind:class="[defaultPage ? 'hide' : 'show']">
        <div class="search-section">
          <div class="input-container-id">
            <span>Drone Id</span>
            <form v-on:submit.prevent="id !== '' ? fetchIdSearch() : fetchData()"> 
            <input v-model="id"/>
            </form>
          </div>

          <div class="input-container-name">
            <span>Name</span>
            <form v-on:submit.prevent="name !== '' ? fetchNameSearch() : fetchData()"> 
            <input v-model="name"/>
            </form>
          </div>
        </div>
        <table class="table">
          <thead>
            <th scope="col" class="head-drones" v-on:click="sortData('id')"><div><span>DRONE</span><img v-bind:class="[order === 'asc' ? 'asc' : 'desc']" src="https://cdn.iconscout.com/icon/free/png-256/keyboard-arrow-up-1782046-1514246.png"/></div></th>
            <th scope="col" class="head-drones" v-on:click="sortData('name')"><div><span>CUSTOMER</span><img v-bind:class="[order === 'asc' ? 'asc' : 'desc']" src="https://cdn.iconscout.com/icon/free/png-256/keyboard-arrow-up-1782046-1514246.png"/></div></th>
            <th scope="col" class="head-drones" v-on:click="sortData('battery')"><div><span>BATTERIES</span><img v-bind:class="[order === 'asc' ? 'asc' : 'desc']" src="https://cdn.iconscout.com/icon/free/png-256/keyboard-arrow-up-1782046-1514246.png"/></div></th>
            <th scope="col" class="head-drones" v-on:click="sortData('max_speed')"><div><span>MAX SPEED</span><img v-bind:class="[order === 'asc' ? 'asc' : 'desc']" src="https://cdn.iconscout.com/icon/free/png-256/keyboard-arrow-up-1782046-1514246.png"/></div></th>
            <th scope="col" class="head-drones" v-on:click="sortData('average_speed')"><div><span>AVERAGE SPEED</span><img v-bind:class="[order === 'asc' ? 'asc' : 'desc']" src="https://cdn.iconscout.com/icon/free/png-256/keyboard-arrow-up-1782046-1514246.png"/></div></th>
            <th scope="col">CURRENT FLY</th>
            <th scope="col" class="status-head">STATUS</th>
          </thead>
          <tbody>
            <tr v-for="drone in drones" :key="drone.id">
              <td scope="row">
                {{ drone.id }}
              </td>
              <td scope="row" class="customer">
                <div class="customer-content">
                  <div class="customer-img">
                    <img v-bind:src="drone.image" />
                  </div>
                  <div class="text-container">
                    <router-link :to="{ name: 'Detail', params: { id: drone.id } }">
                      <span>
                        {{ drone.name }}
                      </span>
                    </router-link>
                    <p>
                      {{ drone.address }}
                    </p>
                  </div>
                </div>
              </td>
              <td scope="row">
                <b-progress :value="drone.battery" :max="100" height="4px"></b-progress>
              </td>
              <td scope="row" class="speed">
                <SpeedMarker :speed="drone.max_speed"/>
              </td>
              <td scope="row" class="speed">
                <SpeedMarker :speed="drone.average_speed"/>
              </td>
              <td scope="row">
                {{ drone.fly }}
              </td>
              <td scope="row">
                <span class="badge"
                v-bind:class="[drone.status === 'failed' ? 'badge-danger' : 'badge-primary',
                drone.status === 'delayed' ? 'badge-warning' : 'badge-primary']">
                {{ drone.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Navigation" class="navigation">
          <ul class="pagination">
            <li v-bind:class="[defaultPage ? 'link-block' : 'page-item',
            page === 1 ? 'link-block' : 'page-item']">
              <a class="page-link" v-on:click="previos">Previous</a>
            </li>
            <li v-bind:class="[defaultPage ? 'link-block' : 'page-item',
            page === 1 ? 'link-block' : 'page-item']"><a class="page-link" v-on:click="previos">
              {{ defaultPage ? defaultPage : page - 1 }}
              </a>
            </li>
            <li class="page-item middle-button"><a class="page-link" href="#">{{ defaultPage ? defaultPage : page }}</a></li>
            <li class="page-item"><a class="page-link" v-on:click="next">{{ defaultPage ? defaultPage + 1 : page + 1}}</a></li>
            <li class="page-item"><a class="page-link" v-on:click="next">Next</a></li>
          </ul>
        </nav>
      </div>
      <div class="show-data" v-bind:class="[defaultPage ? 'show' : 'hide']" v-on:click="loadTable">Load table</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// Services
import { fetchQuery, fetchSearchData, Drones } from '@/services/drones';

// Helpers
import queryBuilder from '@/helpers/QueryBuilder';

// Components
import SpeedMarker from '@/components/SpeedMarker.vue';

@Component({
  components: {
    SpeedMarker,
  }
})
export default class Home extends Vue {

  drones: object = {};
  defaultPage = Number(this.$router.currentRoute.meta.page);

  // Query
  page = Number(this.$router.currentRoute.params.page);
  sort = '';
  order = 'asc';

  // Search
  name = '';
  id = '';

  async mounted() {
    const query = queryBuilder(this.id, String(this.page), this.sort, this.order);
    this.drones = await fetchQuery(query);
  }

  async fetchIdSearch() {
    const response = await fetchQuery(`/${this.id}`);
    this.drones = [response];
  }

  async fetchNameSearch() {
    this.drones = await fetchSearchData(this.name);
  }

  async fetchData() {
    const query = queryBuilder(this.id, String(this.page), this.sort, this.order);
    this.drones = await fetchQuery(query);
  }

  sortData(where: string) {
    this.sort = where;
    this.order = this.order === 'asc' ? 'desc' : 'asc';
    this.fetchData();
  }

  loadTable() {
    this.$router.push({ name: 'home', params: { page: '1' } });
    document.location.reload(true);
  }

  previos() {
    this.$router.push({ name: 'home', params: { page: String(this.page - 1) } });
    this.page = this.page - 1;
    this.fetchData();
  }

  next() {
    this.$router.push({ name: 'home', params: { page: String(this.page +1) } });
    this.page = this.page + 1;
    this.fetchData();
  }
}
</script>

<style>
  .content-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .content-container > .show {
    display: block;
  }

  .content-container > .show-data {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    background-color: #007bff;
    padding-top: 7px;
    margin-top: 30px;
    color: #fff;
    cursor: pointer;
    transition: 0.3s;
  }

  .content-container > .show-data:hover {
    background-color: #53a6ff;
  }

   .content-container > .show-data > a {
     color: white;
     text-align: center;
  }

  .content-container > .hide {
    display: none;
  }

  .content-container > .table-container {
    width: 1060px;
    margin-top: 20px;
  }

  .content-container > .table-container > .search-section {
    display: flex;
    width: 98%;
    justify-content: flex-start;
    margin: 0 auto;
  }

  .content-container > .table-container > .search-section > .input-container-id {
    display: grid;
    text-align: left;
    margin-bottom: 20px;
  }

  .content-container > .table-container > .search-section > .input-container-id > span {
    color: #32a0ff;
    font-weight: bold;
    font-size: 13px;
  }

  .content-container > .table-container > .search-section > .input-container-id > form > input {
    border: 1px solid #92ccff;
    height: 36px;
    width: 120px;
    border-radius: 8px;
    background-color: #e7f4ff;
    text-indent: 5px;
    color: #32a0ff;
    margin-top: 5px;
  }

  .content-container > .table-container > .search-section > .input-container-id > form > input:focus {
    outline-width: 0;
  }

  .content-container > .table-container > .search-section > .input-container-name {
    display: grid;
    text-align: left;
    margin-bottom: 20px;
    margin-left: 50px;
  }

  .content-container > .table-container > .search-section > .input-container-name > span {
    color: #32a0ff;
    font-weight: bold;
    font-size: 13px;
  }

  .content-container > .table-container > .search-section > .input-container-name > form > input {
    border: 1px solid #92ccff;
    height: 36px;
    width: 200px;
    border-radius: 8px;
    background-color: #e7f4ff;
    text-indent: 5px;
    color: #32a0ff;
    margin-top: 5px;
  }

  .content-container > .table-container > .search-section > .input-container-name > form > input:focus {
    outline-width: 0;
  }


  .content-container > .table-container > .navigation > .pagination {
    justify-content: center;
    margin-top: 30px;
  }

  .content-container > .table-container > .navigation > .pagination .middle-button > a {
    background-color: #007BFF;
    color: #fff;
  }

  .content-container > .table-container > .navigation > .pagination  {
    color: #007BFF;
  }

  .content-container > .table-container > .navigation > .pagination .link-block {
    display: none;
  }

  .content-container > .table-container > .table > thead > th {
    border-top: none;
    font-size: 14px;
    font-weight: 300;
    color: #50ACFB;
    border-bottom: 0.5px solid #92ccff;
    text-align: left;
  }

  .content-container > .table-container > .table > thead > th.head-drones {
    cursor: pointer;
    transition: all 0.3s;
  }

  .content-container > .table-container > .table > thead > th.head-drones > div {
    display: flex;
    justify-content: space-around;
  }

  .content-container > .table-container > .table > thead > th.head-drones:hover {
    background-color: #bde0ff;
    color: #fff;
  }

  .content-container > .table-container > .table > thead > th.head-drones > div > span {
    display: flex;
  }

  .content-container > .table-container > .table > thead > th.head-drones > div > img {
    opacity: 0.3;
    transition: all 0.3s;
  }

  .content-container > .table-container > .table > thead > th.head-drones > div > img.desc {
    width: 20px;
    transform: rotate(180deg);
  }

  .content-container > .table-container > .table > thead > th.head-drones > div > img.asc {
    width: 20px;
  }

  .content-container > .table-container > .table > thead > th.status-head {
    text-align: center;
  }

  .content-container > .table-container > .table > tbody > tr > td {
    color: #32a0ff;
    vertical-align: inherit;
    border-top: none;
    border-bottom: 0.5px solid #92ccff;
  }

  .content-container > .table-container > .table > tbody > tr > td.customer {
    text-align: left;
  }

  .content-container > .table-container > .table > tbody > tr >
  td.customer > .customer-content {
    display: flex;
  }

  .content-container > .table-container > .table > tbody > tr >
  td.customer > .customer-content > .customer-img {
    margin-right: 7px;
    background-color: #bde0ff;
    width: 60px;
    height: 60px;
    border-radius: 100%;
  }

  .content-container > .table-container > .table > tbody > tr >
  td.customer > .customer-content > img {
    object-fit: cover;
    margin: 0 auto;
  }

  .content-container > .table-container > .table > tbody > tr >
  td.customer > .customer-content > .text-container > a > span {
    font-size: 22px;
    font-weight: bold;
    color: #32a0ff;
    transition: 0.2s;
  }

  .content-container > .table-container > .table > tbody > tr >
  td.customer > .customer-content > .text-container > a:hover {
    text-decoration: none;
  }

  .content-container > .table-container > .table > tbody > tr >
  td.customer > .customer-content > .text-container > a > span:hover {
    color: #85c6ff;
  }

  .content-container > .table-container > .table > tbody > tr > td.customer >
  .customer-content > .text-container > p {
    font-size: 14px;
    font-weight: 300;
    color: #32a0ff;
    margin-bottom: 0;
  }

  .content-container > .table-container > .table > tbody > tr > td > div.progress {
    background-color: #bde0ff;
  }

  .content-container > .table-container > .table > tbody > tr > td > span.badge {
    width: 70px;
    height: 29px;
    padding: 9px 0;
    border-radius: 6px;
  }

  @media(max-width: 480px) {
    .content-container > .table-container {
      width: 100%;
      overflow: auto;
      max-width: 480px;
      padding: 10px;
    }
  }
</style>