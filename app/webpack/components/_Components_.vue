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
                    <div class="navbar-title center"><b>COMPONENTS LIST </b></div>
                    <div class="navbar-group">
                        <router-link to="/components"> <i class='material-icons icon-list'>&#xe896;</i> </router-link>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
      
      <ul>
        <li><router-link to="/swipemenu"> <i class='material-icons icon-home'>&#xe88a;</i> swipemenu</router-link></li>
        <li><router-link to="/slider"> <i class='material-icons icon-home'>&#xe88a;</i> slider</router-link></li>
        <li><router-link to="/inputs"> <i class='material-icons icon-home'>&#xe88a;</i> inputs</router-link></li>
        <li><router-link to="/navbar"> <i class='material-icons icon-home'>&#xe88a;</i> navbar</router-link></li>
        <li><router-link to="/button"> <i class='material-icons icon-home'>&#xe88a;</i> buttons</router-link></li>
      </ul>
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