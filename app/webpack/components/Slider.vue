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
              <b>SLIDER</b>
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

    <div class="container">
      <p>SLIDER - компонент SLIDER. Компонент поддерживает multitouch события. В режиме MULTI можно управлять одновременно двумя ручками</p>
      <p>SLIDER - обернут в debounce функцию с вызовом не чаще чем 60ms</p>
      <br>

      <p>SLIDER [MULTI] - КОМПОНЕНТ SLIDER:</p>

      <div class="slider" data-slider="multi">
        <div class="slider-content">
          <div class="slider-bar"></div>
          <div class="slider-handle" data-handle="left"></div>
          <div class="slider-handle" data-handle="right"></div>
        </div>
      </div>
      <p>ПРИМЕР ВЫЗОВА:</p>





      <p>SLIDER [LEFT] - КОМПОНЕНТ SLIDER</p>
      <div class="slider" data-slider="left">
        <div class="slider-content">
          <div class="slider-bar"></div>
          <div class="slider-handle" ></div>
        </div>
      </div>
      <p>ПРИМЕР ВЫЗОВА:</p>


      <p>SLIDER [RIGHT] - КОМПОНЕНТ SLIDER</p>
      <div class="slider" data-slider="right">
        <div class="slider-content">
          <div class="slider-bar"></div>
          <div class="slider-handle" ></div>
        </div>
      </div>
      <p>ПРИМЕР ВЫЗОВА:</p>


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