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


<label class="pure-material-checkbox">
  <input type="checkbox">
  <span>Checkbox</span>
</label>


<br>

<br>
<div class="checkbox">
  <input type="checkbox" checked>
  <label>checkbox-3</label>
</div>


<br>
<div class="checkbox">
  <label>checkbox-4</label>
  <input type="checkbox" checked>
  
</div>


    </div>
  </div>
</template>

<script>
export default {
  mounted: function() {
    //Необходимо вызвать пересчет отступа
    window.navbar();
  }
};
</script>

