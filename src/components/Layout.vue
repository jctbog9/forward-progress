<template>
  <div id="app">
    <app-header/>
    <div class="container-fluid">
      <router-view/>
    </div>
  </div>
</template>
<script>
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
export default {
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter
  }
};
</script>
<style lang="scss">
@import '~bootstrap/scss/bootstrap';
// $fa-font-path: '~font-awesome/fonts';
// @import '~font-awesome/scss/font-awesome.scss';
.columns {
  flex-wrap: wrap;
}
</style>
