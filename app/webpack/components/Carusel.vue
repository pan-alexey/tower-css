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
                        <b>carusel</b>
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



    <div navbar-scroll='bind' class="carusel" style=" height: 100vh; position: absolute; top: 0; left: 0; right: 0;">


<!-- 
<div class="container" style="height:20px;">
  <div id="log">log</div>
</div> 
-->
      <div class="carusel-content">

        
        <div class="red carusel-item center-outer-flex center" style="height:300vh;">
              
          <div class="center-inner">1</div>
        </div>

        <div class="blue carusel-item center-outer-flex center" style="height:300vh;">
          <div class="center-inner">2</div>
        </div>

        <div class="green carusel-item center-outer-flex center">
          <div class="center-inner">3</div>
        </div>

        <div class="yellow carusel-item center-outer-flex center">
          <div class="center-inner">4</div>
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