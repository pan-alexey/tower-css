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

    <div class="container gutter">
      <p class="center gutter-y">Обычные кнопки</p>

      <div class="display-inline-block gutter-nano">
        <div class="btn btn-secondary">secondary</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-red">red</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-green">green</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-blue">blue</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-pink">pink</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-yellow">yellow</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-orange">orange</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-gray">gray</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-black">black</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-white">white</div>
      </div>

      <div class="display-inline-block gutter-nano">
        <div class="btn btn-purple">purple</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-deep-purple">deep-purple</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-indigo">indigo</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-light-blue">light-blue</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-cyan">cyan</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-teal">teal</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-light-green">light-green</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-lime">lime</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-amber">amber</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-deep-orange">deep-orange</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-brown">brown</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-blue-gray">blue-gray</div>
      </div>
    </div>

    <div class="container gutter">
      <p class="center gutter-y">Кнопки [material]</p>

      <div class="display-inline-block gutter-nano">
        <div class="btn btn-secondary btn-material ripple">secondary</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-red btn-material ripple">red</div>
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

    <div class="container gutter">
      <p class="center gutter-y">Кнопки [text]</p>

      <div class="display-inline-block gutter-nano">
        <div class="btn btn-secondary btn-text ripple">secondary</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-red btn-text ripple">red</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-green btn-text">green</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-blue btn-text">blue</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-pink btn-text">pink</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-yellow btn-text">yellow</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-orange btn-text">orange</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-gray btn-text">gray</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-black btn-text">black</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-white btn-text">white</div>
      </div>

      <div class="display-inline-block gutter-nano">
        <div class="btn btn-purple btn-text">purple</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-deep-purple btn-text">deep-purple</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-indigo btn-text">indigo</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-light-blue btn-text">light-blue</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-cyan btn-text">cyan</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-teal btn-text">teal</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-light-green btn-text">light-green</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-lime btn-text">lime</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-amber btn-text">amber</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-deep-orange btn-text">deep-orange</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-brown btn-text">brown</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-blue-gray btn-text">blue-gray</div>
      </div>
    </div>




    <div class="container gutter">
      <p class="center gutter-y">Кнопки [color]</p>

      <div class="display-inline-block gutter-nano">
        <div class="btn btn-secondary btn-color">secondary</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-red btn-color">red</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-green btn-color">green</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-blue btn-color">blue</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-pink btn-color">pink</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-yellow btn-color">yellow</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-orange btn-color">orange</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-gray btn-color">gray</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-black btn-color">black</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-white btn-color">white</div>
      </div>

      <div class="display-inline-block gutter-nano">
        <div class="btn btn-purple btn-color">purple</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-deep-purple btn-color">deep-purple</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-indigo btn-color">indigo</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-light-blue btn-color">light-blue</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-cyan btn-color">cyan</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-teal btn-color">teal</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-light-green btn-color">light-green</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-lime btn-color">lime</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-amber btn-color">amber</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-deep-orange btn-color">deep-orange</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-brown btn-color">brown</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-blue-gray btn-color">blue-gray</div>
      </div>
    </div>




    <div class="container gutter">
      <p class="center gutter-y">Кнопки [border]</p>

      <div class="display-inline-block gutter-nano">
        <div class="btn btn-secondary btn-border">secondary</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-red btn-border">red</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-green btn-border">green</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-blue btn-border">blue</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-pink btn-border">pink</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-yellow btn-border">yellow</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-orange btn-border">orange</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-gray btn-border">gray</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-black btn-border">black</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-white btn-border">white</div>
      </div>

      <div class="display-inline-block gutter-nano">
        <div class="btn btn-purple btn-border">purple</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-deep-purple btn-border">deep-purple</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-indigo btn-border">indigo</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-light-blue btn-border">light-blue</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-cyan btn-border">cyan</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-teal btn-border">teal</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-light-green btn-border">light-green</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-lime btn-border">lime</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-amber btn-border">amber</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-deep-orange btn-border">deep-orange</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-brown btn-border ripple">brown</div>
      </div>
      <div class="display-inline-block gutter-nano">
        <div class="btn btn-blue-gray btn-border">blue-gray</div>
      </div>
    </div>

    <div class="container gutter">
      <p class="center gutter-y">Блочные кнопки</p>
      <div class="gutter-y-nano">
        <div class="btn btn-block btn-blue-gray btn-material">blue-gray</div>
      </div>
      <div class="gutter-y-nano">
        <div class="btn btn-block btn-blue-gray btn-material">blue-gray</div>
      </div>
    </div>



    <div class="container gutter">
      <p class="center gutter-y">Группа кнопок</p>
   
      <div class="gutter-y-nano">
          <div class="btn-group">
              <div class="btn btn-material btn-red">red</div>
              <div class="btn btn-material btn-red">red</div>
          </div>
      </div>

      <div class="gutter-y-nano">
          <div class="btn-group btn-group-blind">
                  <div class="btn btn-material btn-red">red</div>
                  <div class="btn btn-material btn-red">red</div>
          </div>
      </div>

      
      <div class="gutter-y-nano">
          <div class="btn-group btn-group-block">
              <div class="btn btn-material btn-red">red</div>
              <div class="btn btn-material btn-red">red</div>
          </div>
      </div>

      <div class="gutter-y-nano">
          <div class="btn-group btn-group-blind btn-group-block">
                  <div class="btn btn-material btn-red">red</div>
                  <div class="btn btn-material btn-red">red</div>
          </div>
      </div>

      <div class="gutter-y-nano">
          <div class="btn-group btn-group-blind btn-group-block">
                  <div class="btn btn-border btn-red">red</div>
                  <div class="btn btn-border btn-red">red</div>
                  <div class="btn btn-border btn-red">red</div>
                  <div class="btn btn-border btn-red">red</div>
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