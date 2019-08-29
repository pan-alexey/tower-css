// Slider.vue

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
              <b>CARUSEL</b>
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




<div class="carusel">
  <div class="carusel-content" style="height: 300px;">
    <div class="carusel-item red">1</div>
    <div class="carusel-item blue">2</div>
    <div class="carusel-item yellow">3</div>
    <div class="carusel-item green">4</div>
  </div>
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