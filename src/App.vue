<template>
  <div>
    <metainfo>
      <template v-slot:title="{ content }">{{ content ? `${content} · cloud · less borders` : `Cloud · less borders` }}</template>
    </metainfo>
    <Header v-if="this.$store.state.isUserLoggedIn"/>
    <div id="page" class="d-flex col mx-auto">
      <router-view></router-view>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import { useMeta } from 'vue-meta';
  var winSize = '';

  export default {
    setup () {
      useMeta({
        title: '',
        description : 'Less Borders is making it easier for startups, creators and entrepreneurs by providing services and tools to help deliver projects.',
        htmlAttrs: { lang: 'en', amp: true },
      })
    },
    data() {
        return {
          token: null
        }
    },
    created() {
    },
    mounted() {
      window.addEventListener("resize", this.detectBreakpoint);
      window.dispatchEvent(new Event('resize'));
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.detectBreakpoint);
    },
    methods: {
      getSSO() {
        const token = authenticationService.sso()
        this.token = token
      },
      detectBreakpoint() {
        var newWinSize = 'mobile'; // default value, check for actual size
        if (window.innerWidth >= 992) {
            newWinSize = 'desktop';
        }else if (window.innerWidth >= 576){
            newWinSize = 'tablet';
        }

        if( newWinSize != winSize ) {
					document.body.setAttribute("data-breakpoint", newWinSize);
            winSize = newWinSize;
        }
      }
    },
    name: "App"
  };
</script>