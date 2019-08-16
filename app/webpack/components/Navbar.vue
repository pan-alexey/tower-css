// SWIPEMENU.vue

<template>
  <div class="activity">
    <div class="navbar">
      <div class="navbar-top">
        <div class="navbar-block blue" :data-type="type">
          <div class="navbar-content">
            <div class="navbar-group blue">
              <router-link to="/">
                <i class="material-icons icon-home">&#xe88a;</i>
              </router-link>
            </div>
            <div class="navbar-title center">
                <b>NAVBAR</b>
            </div>
            <div class="navbar-group">
              <router-link to="/components">
                <i class="material-icons icon-list">&#xe896;</i>
              </router-link>
            </div>
          </div>
        </div>
        <div class="navbar-block gray"  v-on:click="type = type=='float' ? 'sticky' : 'float';">
          <div class="navbar-content">
              <div class="navbar-title center">
                SECOND BAR FOR <b>{{ type.toUpperCase() }}</b>
              </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <p>SWIPEMENU - КОМПОНЕНТ ДЛЯ БОКОВОГО МЕНЮ. Hаботает аналогично как и реализация в android</p>
      <p>Для проверки, проведите пальцем по экрану влево или вправо</p>
      <p>Для переключения нажмите на компку:</p>
      <div class="btn btn-block btn-blue btn-material" v-on:click="type = type=='float' ? 'sticky' : 'float';">NAVBAR [ {{ type.toUpperCase() }} ]</div>

      <div style="height: 100vh;"></div>
      <div style="height: 100vh;"></div>
      <div style="height: 100vh;"></div>
    </div>


  </div>
</template>

<script>
export default {
  data: function() {
    return {
      type: "float"
    };
  },
  mounted: function() {
    //Необходимо вызвать пересчет отступа
    window.navbar();
  }
};
</script>