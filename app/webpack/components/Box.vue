// _Components_.vue
<style>
.box-example{
    display: inline-block;
    width: 5rem;
    height: 5rem;
    margin: .25rem;
}
</style>

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
              <b>BOX</b>
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


        <span class="box-material box-example"></span>
        <span class="box box-example"></span>
        <span class="box-border box-example"></span>
        <span class="box-border border-orange box-example"></span>
        <span class="box border-top border-blue box-example"></span>



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

