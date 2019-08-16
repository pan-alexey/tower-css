// SWIPEMENU.vue

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
              <b>SWIPEMENU</b>
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
      <p>SWIPEMENU - КОМПОНЕНТ ДЛЯ БОКОВОГО МЕНЮ. Hаботает аналогично как и реализация в android</p>
      <p>Для проверки, проведите пальцем по экрану влево или вправо</p>
      <p>Исключения для работы:</p>
      <ul>
        <li>.slider</li>
        <li>.swipermenu-exclide</li>
        <li>input</li>
        <li>textarea</li>
        <li>Начальный тангенс перемещения > 2</li>
        <li>Был произведен скролл</li>
        <li>Движение не было произведено более чем зона не чувствительности</li>
      </ul>
      <div style="height: 100vh;"></div>
      <div style="height: 100vh;"></div>
      <div style="height: 100vh;"></div>
    </div>

    <div class="swipemenu">
      <div class="swipemenu-backdrop"></div>
      <div class="swipemenu-content">
        <div class="swipemenu-block" data-swipemenu="left">

          <div class="navbar">
              <div class="navbar-block blue">
                <div class="navbar-content">
                  <div class="navbar-title center">
                    <b>ЛЕВОЕ МЕНЮ</b>
                  </div>
                </div>
              </div>
          </div>



        </div>
        <div class="swipemenu-block" data-swipemenu="right">

          <div class="navbar">
              <div class="navbar-block blue">
                <div class="navbar-content">
                  <div class="navbar-title center">
                    <b>ПРАВОЕ МЕНЮ</b>
                  </div>
                </div>
              </div>
          </div>


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