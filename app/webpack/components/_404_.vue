// _Components_.vue

<template>
  <div class="activity">
    <div class="navbar">
        <div class="navbar-top">
            <div class="navbar-block blue" data-type="float">
                <div class="navbar-content">
                    <div class="navbar-group blue">
                        <router-link to="/"> <i class='material-icons icon-home'>&#xe88a;</i> </router-link>
                    </div>
                    <div class="navbar-title center"><b>PAGE NOT FOUND</b></div>
                    <div class="navbar-group">
                        <router-link to="/components"> <i class='material-icons icon-list'>&#xe896;</i> </router-link>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container gutter-x">
        <div class="center-outer-transform heigt-100vh">
          <div class="center-inner ">
            <h2 class="center">404</h2>
            <h3 class="center">PAGE NOT FOUND</h3>
            <br>
            <router-link class="btn btn-blue btn-block" to="/"> ОБРАТНО НА ГЛАВНУЮ </router-link>
          </div>
    </div>
    </div>
</div>
</template>

<script>
  export default {
        mounted: function () {
           //Необходимо вызвать пересчет отступа
           window.navbar();




        }
  }
</script>