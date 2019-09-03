// _Components_.vue
<style>
.box-example{
    display: inline-block;
    width: 5rem;
    height: 5rem;
    margin: .25rem;
}
</style>

<template>
  <div class="activity">
    <div class="navbar">
      <div class="navbar-top">
        <div class="navbar-block blue" data-type="float">
          <div class="navbar-content">
            <div class="navbar-group blue">
              <router-link to="/">
                <i class="material-icons icon-home">&#xe88a;</i>
              </router-link>
            </div>
            <div class="navbar-title center">
              <b>BOX</b>
            </div>
            <div class="navbar-group">
              <router-link to="/components">
                <i class="material-icons icon-list">&#xe896;</i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container gutter-x">


<br>
<br>
<div class="checkbox">
  <input type="checkbox">
  <div class="chekmark">checkbox-3</div>
  <span></span>
</div>

<br>
<br>

<div class="checkbox">
  <input type="checkbox" v-model="checked">
  <i class="chekmark"></i>
  <span>checkbox-3</span>
</div>

<span for="checkbox">{{ checked }}</span>


    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      checked:  true
    }
  },
  mounted: function() {
    //Необходимо вызвать пересчет отступа
    window.navbar();
  }
};
</script>

