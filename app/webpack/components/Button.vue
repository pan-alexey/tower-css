// Home.vue

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
              <b>BUTTON</b>
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



    <div class="container gutter-y">
      <p class="center  gutter-y"> Обычные кнопки </p>


      <div class="display-inline-block gutter-nano">
        <div class="btn btn-secondary btn-material">secondary</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-red btn-material">red</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-green btn-material">green</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-blue btn-material">blue</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-pink btn-material">pink</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-yellow btn-material">yellow</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-orange btn-material">orange</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-gray btn-material">gray</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-black btn-material">black</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-white btn-material">white</div>
      </div>

      <div class="display-inline-block gutter-nano">
        <div class="btn btn-purple btn-material">purple</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-deep-purple btn-material">deep-purple</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-indigo btn-material">indigo</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-light-blue btn-material">light-blue</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-cyan btn-material">cyan</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-teal btn-material">teal</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-light-green btn-material">light-green</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-lime btn-material">lime</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-amber btn-material">amber</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-deep-orange btn-material">deep-orange</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-brown btn-material">brown</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-blue-gray btn-material">blue-gray</div>
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