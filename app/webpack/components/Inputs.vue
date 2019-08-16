// Inputs.vue

<template>
  <div class="activity">
    <div class="navbar">
      <div class="navbar-top">
        <div class="navbar-block blue" data-type="float">
          <div class="navbar-content no-offset">
            <div class="navbar-group blue">
              <router-link to="/">
                <i class="material-icons icon-home">&#xe88a;</i>
              </router-link>
            </div>
            <div class="navbar-title center">
              <b>INPUTS</b>
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

    <div class="container">
      <p>INPUTS - ДВА РЕЖИМА РАБОТЫ</p>





      <p>ПРИМЕР [input-material]</p>
      <div class="input-block input-material input-blue valid">
        <div class="input-content no-offset">
          <div class="input-sibling">
            <div class="btn btn-3 btn-material red">OK</div>
          </div>
          <div class="input-form">
            <input value="Введите/Удалите текст" />
            <lable>input</lable>
          </div>
        </div>
      </div>
      <br>
      <br>
      <div class="input-block input-material offset input-green valid">
        <div class="input-content no-offset">
          <div class="input-form">
            <textarea row-max="4">Введите/Удалите текст (4)</textarea>
            <lable>textarea</lable>
          </div>
          <div class="input-sibling">
            <div class="btn btn-3 btn-material red">OK</div>
          </div>
        </div>
      </div>





      <p>ПРИМЕР [input-border]</p>
      <div class="input-block input-border offset input-blue valid">
        <div class="input-content">
          <div class="input-sibling">
            <div class="btn btn-3 btn-material red">OK</div>
          </div>
          <div class="input-form">
            <input value="Введите/Удалите текст" />
            <lable>input</lable>
          </div>
        </div>
      </div>
      <br><br>
      <div class="input-block input-border offset input-green valid">
        <div class="input-content">
          <div class="input-form">
            <textarea row-max="4">Введите/Удалите текст (4)</textarea>
            <lable>textarea</lable>
          </div>
          <div class="input-sibling">
            <div class="btn btn-3 btn-material red">OK</div>
          </div>
        </div>
      </div>





      <div style="height: 100vh;"></div>
      <div style="height: 100vh;"></div>
      <div style="height: 100vh;"></div>
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