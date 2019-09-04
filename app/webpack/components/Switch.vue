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
<!-- Rounded switch -->
<!-- Rectangular switch -->
<div class="switch">
  <input type="checkbox">
  <span class="handle"></span>
  <span>checkbox-3</span>
</div>

<br>

<lable class="switch">
  <input type="checkbox" v-model="checked">
  <span class="handle"></span>
  <span>{{ checked }}</span>
</lable>

<br>


<!-- Rounded switch -->
<!-- Rectangular switch -->



    <div class="list">
        <div class="list-item">
          <div class="item-media-icon">
            <i class="material-icons icon-laptop">&#xe31e;</i>
          </div>
          <div class="item-content">Single line item</div>
          <div class="item-meta">
            
<label class="switch">
  <input type="checkbox">
  <span class="handle"></span>
</label>

          </div>
        </div>
        <div class="list-item">
          <div class="item-content">Single line item</div>
          <div class="item-meta">meta</div>
        </div>
        <div class="list-item">
          <div class="item-media-icon">
            <i class="material-icons icon-laptop">&#xe31e;</i>
          </div>
          <div class="item-content">Single line item</div>
        </div>
        <div class="list-item">
          <div class="item-content">Single line item</div>
        </div>
      </div>






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

