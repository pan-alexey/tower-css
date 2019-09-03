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
                    <div class="navbar-title center"><b>COMPONENTS LIST {{ $route.params.id }}</b></div>
                    <div class="navbar-group">
                        <router-link to="/components"> <i class='material-icons icon-list'>&#xe896;</i> </router-link>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container gutter-x">
      

      <div class="center">
        <p>СПИСОК КОМПОНЕНТОВ</p>
      </div>




      <div class="list">


        <router-link  to="/components/1" class="list-item ripple" disabled>
          <div class="item-media-icon">
            <i class="material-icons icon-laptop">&#xe31e;</i>
          </div>
          <div class="item-content">/components/1</div>
        </router-link>
                <router-link  to="/components/2" class="list-item ripple">
          <div class="item-media-icon">
            <i class="material-icons icon-laptop">&#xe31e;</i>
          </div>
          <div class="item-content">/components/2</div>
        </router-link>
                <router-link  to="/components/3" class="list-item ripple">
          <div class="item-media-icon">
            <i class="material-icons icon-laptop">&#xe31e;</i>
          </div>
          <div class="item-content">/components/3</div>
        </router-link>




        <router-link  to="/checkbox" class="list-item ripple">
          <div class="item-media-icon">
            <i class="material-icons icon-laptop">&#xe31e;</i>
          </div>
          <div class="item-content">CHECKBOX</div>
        </router-link>



        <router-link  to="/swipemenu" class="list-item ripple">
          <div class="item-media-icon">
            <i class="material-icons icon-laptop">&#xe31e;</i>
          </div>
          <div class="item-content">SWIPE MENU</div>
        </router-link>






        <router-link  to="/slider" class="list-item ripple">
          <div class="item-media-icon">
            <i class="material-icons icon-laptop">&#xe31e;</i>
          </div>
          <div class="item-content">RANGE SLIDER</div>
          <div class="item-meta">
            multitocuh
          </div>
        </router-link>

        <router-link  to="/inputs" class="list-item ripple">
          <div class="item-media-icon">
            <i class="material-icons icon-laptop">&#xe31e;</i>
          </div>
          <div class="item-content">INPUT/TEXTAREA</div>
        </router-link>

        <router-link  to="/navbar" class="list-item ripple">
          <div class="item-media-icon">
            <i class="material-icons icon-laptop">&#xe31e;</i>
          </div>
          <div class="item-content">NAVBAR (FLOAT/STICKY)</div>
        </router-link>

        <router-link  to="/button" class="list-item ripple">
          <div class="item-media-icon">
            <i class="material-icons icon-laptop">&#xe31e;</i>
          </div>
          <div class="item-content">BUTTON & BUTTON GROUP</div>
        </router-link>

        <router-link  to="/list" class="list-item ripple">
          <div class="item-media-icon">
            <i class="material-icons icon-laptop">&#xe31e;</i>
          </div>
          <div class="item-content">LIST VIEW</div>
        </router-link>

        <router-link  to="/carusel" class="list-item ripple">
          <div class="item-media-icon">
            <i class="material-icons icon-laptop">&#xe31e;</i>
          </div>
          <div class="item-content">CARUSEL</div>
        </router-link>


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