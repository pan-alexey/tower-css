// seekbar.vue

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
              <b>seekbar</b>
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
      <p>seekbar - компонент seekbar. Компонент поддерживает multitouch события. В режиме MULTI можно управлять одновременно двумя ручками</p>
      <p>seekbar - обернут в debounce функцию с вызовом не чаще чем 60ms</p>
      <br>

      <p>seekbar [MULTI] - КОМПОНЕНТ seekbar:</p>

      <div class="seekbar" data-seekbar="multi">
        <div class="seekbar-content">
          <div class="seekbar-bar"></div>
          <div class="seekbar-handle" data-handle="left"></div>
          <div class="seekbar-handle" data-handle="right"></div>
        </div>
      </div>
      <p>ПРИМЕР ВЫЗОВА:</p>





      <p>seekbar [LEFT] - КОМПОНЕНТ seekbar</p>
      <div class="seekbar" data-seekbar="left">
        <div class="seekbar-content">
          <div class="seekbar-bar"></div>
          <div class="seekbar-handle" ></div>
        </div>
      </div>
      <p>ПРИМЕР ВЫЗОВА:</p>


      <p>seekbar [RIGHT] - КОМПОНЕНТ seekbar</p>
      <div class="seekbar" data-seekbar="right">
        <div class="seekbar-content">
          <div class="seekbar-bar"></div>
          <div class="seekbar-handle" ></div>
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