// Home.vue
<style lang="less">
.loading{
    display: block;
    z-index: 1060;
    position: fixed;
    top: -0;
    left: -0;
    right: -0;
    bottom: -0;
}

</style>


<template>
<div>
    <div class="center-outer-transform white loading" 
    v-if="loading">
        <div class="center-inner center">Загрузка...</div>
    </div>


  <div class="activity" >
    <div class="navbar">
        <div class="navbar-top">
            <div class="navbar-block blue" data-type="float">
                <div class="navbar-content">
                    <div class="navbar-group blue">
                        <router-link to="/"> <i class='material-icons icon-home'>&#xe88a;</i> </router-link>
                    </div>
                    <div class="navbar-title center"><b>HOME</b></div>
                    <div class="navbar-group">
                        <router-link to="/components"> <i class='material-icons icon-list'>&#xe896;</i> </router-link>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container gutter-x">
        <p>TOWER - Вэб компонентный фреймворк с открытыс исходным кодом для создания приложения HTML, CSS и JS. Поддерживается даже самыми устаревшими браузерами, такими как Internet Explorer 9</p>
        <p>Модульная архитектура позволяет использовать и подключать только те компоненты, которые нужны</p>
        <p>Для корректной работы, модули не требуют инициализацию, поээтому они работают даже елси не были инициализированны изначально</p>


        <div class="list">

            <router-link  to="/swipemenu" class="list-item ripple">
            <div class="item-media-icon">
                <i class="material-icons icon-laptop">&#xe31e;</i>
            </div>
            <div class="item-content">SWIPE MENU</div>
            </router-link>



            <router-link  to="/box" class="list-item ripple">
            <div class="item-media-icon">
                <i class="material-icons icon-laptop">&#xe31e;</i>
            </div>
            <div class="item-content">BOX</div>
            </router-link>

            <router-link  to="/seekbar" class="list-item ripple">
            <div class="item-media-icon">
                <i class="material-icons icon-laptop">&#xe31e;</i>
            </div>
            <div class="item-content">RANGE SEEKBAR</div>
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
            
        </div>
    </div>

</div>
</div>
</template>

<script>
  export default {
        data: function () {
            return {
                loading:  true
            }
        },
        mounted: function () {
           //Необходимо вызвать пересчет отступа
           window.navbar();


            setTimeout(() => {
            this.loading = false;
            },800);

        },
        
  }
</script>