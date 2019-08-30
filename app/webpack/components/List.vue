// List.vue

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
              <b>HOME</b>
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
      <div class="list">
        <div class="list-item">
          <div class="item-media-icon">
            <i class="material-icons icon-laptop">&#xe31e;</i>
          </div>
          <div class="item-content">Single line item</div>
          <div class="item-meta">meta</div>
        </div>
        <div class="list-item">
          <div class="item-content">Single line item</div>
          <div class="item-meta">meta</div>
        </div>
        <div class="list-item">
          <div class="item-media-icon">
            <i class="material-icons icon-laptop">&#xe31e;</i>
          </div>
          <div class="item-content">Single line item</div>
        </div>
        <div class="list-item">
          <div class="item-content">Single line item</div>
        </div>
      </div>

      <div class="list">
        <router-link to="/components" class="list-item">
          <div class="item-media-icon">
            <i class="material-icons icon-laptop">&#xe31e;</i>
          </div>
          <div class="item-content">
            <div class="content-title">Single line item</div>
            <div class="content-caption">
              Single line item
              <br />Single line item
            </div>
          </div>
          <div class="item-meta">meta</div>
        </router-link>
        <div class="list-item">
          <div class="item-content">
            <div class="content-title">Single line item</div>
            <div class="content-caption">
              Single line item
              <br />Single line item
            </div>
          </div>
          <div class="item-meta">meta</div>
        </div>
        <div class="list-item">
          <div class="item-media-icon">
            <i class="material-icons icon-laptop">&#xe31e;</i>
          </div>
          <div class="item-content">
            <div class="content-title">Single line item</div>
            <div class="content-caption">
              Single line item
              <br />Single line item
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-content">Single line item</div>
        </div>
      </div>

      <div class="list">
        <router-link to="/components" class="list-item">
          <div class="item-media-small">
            <img src="/img/48x48.jpg" class="img-auto img-circle" />
          </div>
          <div class="item-content">Single line item</div>
          <div class="item-meta">meta</div>
        </router-link>

        <router-link to="/components" class="list-item">
          <div class="item-media-medium">
            <img src="/img/56x56.jpg" class="img-auto" />
          </div>
          <div class="item-content">Single line item</div>
          <div class="item-meta">meta</div>
        </router-link>

        <router-link to="/components" class="list-item">
          <div class="item-media-big">
            <img src="/img/100x56.jpg" class="img-auto" />
          </div>
          <div class="item-content">
            <div class="content-title">Single line item</div>
            <div class="content-caption">
              Single line item
              <br />Single line item
            </div>
          </div>
          <div class="item-meta">meta</div>
        </router-link>
      </div>

      <div class="list">
        <router-link to="/components" class="list-item">
          <div class="item-media-small">
            <img src="/img/48x48.jpg" class="img-auto img-circle" />
          </div>
          <div class="item-content">
            <div class="content-title">Single line item</div>
            <div class="content-caption">Single line item</div>
          </div>
          <div class="item-meta">meta</div>
        </router-link>

        <router-link to="/components" class="list-item ripple">
          <div class="item-media-medium">
            <img src="/img/56x56.jpg" class="img-auto" />
          </div>
          <div class="item-content">
            <div class="content-title">Single line item</div>
            <div class="content-caption">Single line item</div>
          </div>
          <div class="item-meta">meta</div>
        </router-link>

        <router-link to="/components" class="list-item">
          <div class="item-media-big">
            <img src="/img/100x56.jpg" class="img-auto" />
          </div>
          <div class="item-content">
            <div class="content-title">Single line item</div>
            <div class="content-caption">Single line item</div>
          </div>
          <div class="item-meta">meta</div>
        </router-link>
      </div>

      <div class="list">
        <router-link to="/components" class="list-item">
          <div class="item-media-small">
            <img src="/img/48x48.jpg" class="img-auto img-circle" />
          </div>
          <div class="item-content">
            <div class="content-title">Single line item</div>
            <div class="content-caption">
              Single line item
              <br />Single line item
            </div>
          </div>
          <div class="item-meta">meta</div>
        </router-link>

        <router-link to="/components" class="list-item">
          <div class="item-media-medium">
            <img src="/img/56x56.jpg" class="img-auto" />
          </div>
          <div class="item-content">
            <div class="content-title">Single line item</div>
            <div class="content-caption">
              Single line item
              <br />Single line item
            </div>
          </div>
          <div class="item-meta">meta</div>
        </router-link>

        <router-link to="/components" class="list-item">
          <div class="item-media-big">
            <img src="/img/100x56.jpg" class="img-auto" />
          </div>
          <div class="item-content">
            <div class="content-title">Single line item</div>
            <div class="content-caption">
              Single line item
              <br />Single line item
            </div>
          </div>
          <div class="item-meta">meta</div>
        </router-link>
      </div>

      <div class="list">
        <router-link to="/components" class="list-item">
          <div class="item-media-small item-top">
            <img src="/img/48x48.jpg" class="img-auto img-circle" />
          </div>
          <div class="item-content">
            <div class="content-title">Single line item</div>
            <div class="content-caption">
              Single line item
              <br />Single line item
            </div>

            <div class="list-item">
              <div class="item-media-small">
                <img src="/img/48x48.jpg" class="img-auto img-circle" />
              </div>
              <div class="item-content">
                <div class="content-title">Single line item</div>
                <div class="content-caption">
                  Single line item
                  <br />Single line item
                </div>
              </div>
              <div class="item-meta">meta</div>
            </div>
          </div>
        </router-link>

        <router-link to="/components" class="list-item">
          <div class="item-media-medium">
            <img src="/img/56x56.jpg" class="img-auto" />
          </div>
          <div class="item-content">
            <div class="content-title">Single line item</div>
            <div class="content-caption">
              Single line item
              <br />Single line item
            </div>
          </div>
          <div class="item-meta">meta</div>
        </router-link>

        <router-link to="/components" class="list-item">
          <div class="item-media-big item-top">
            <img src="/img/100x56.jpg" class="img-auto" />
          </div>
          <div class="item-content">
            <div class="content-title">Single line item</div>
            <div class="content-caption">
              Single line item
              <br />Single line item
            </div>

            <div class="list-item">
              <div class="item-media-big item-top">
                <img src="/img/100x56.jpg" class="img-auto" />
              </div>
              <div class="item-content">
                <div class="content-title">Single line item</div>
                <div class="content-caption">
                  Single line item
                  <br />Single line item
                </div>
              </div>
              <div class="item-meta">meta</div>
            </div>
          </div>
        </router-link>
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