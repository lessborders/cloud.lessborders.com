<template>
  <nav id="navigation">
    <div 
    class="navbar navbar-expand-lg sticky-top"
    :class="{ 'navbar--hidden': !showNavbar, 'navbar--scrolled': scrolledNavbar }">
      <div class="container">
        <router-link class="navbar-brand me-2 me-lg-3" to="/">
          <img class="invert-dark logo" height="48" width="48" alt="Less Borders Logo" src="https://static.lessborders.com/apps/lessborders/lessborders_logo.svg"/>
          <span class="h6 ms-2"><span class="text-gradient">Cloud</span></span>
        </router-link>

        <!-- Desktop Menu -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li v-for="page in pages" :key="page" class="nav-item ms-1 me-1">
              <router-link v-if="!page.children" class="nav-link btn btn-transparent" :to="page.link">
                {{page.name}}
              </router-link>
              <div v-if="page.children" class="dropdown has-megamenu">
                <div class="nav-link dropdown-toggle custom-icon icon-right btn btn-transparent" href="#" data-bs-toggle="dropdown">
                  {{page.name}} <i class="fa-solid fa-angle-down"></i>
                </div>
                <div class="dropdown-menu megamenu" role="menu">
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Mobile Toggle -->
        <a class="btn btn-transparent me-auto d-lg-none px-3 mobileMenuToggle custom-icon">
              <i class="fa-duotone fa-bars-sort fa-lg"></i>
        </a>

        <!-- Right Menu -->
        <div class="d-flex">
          <ul class="nav">
            <li>
              <darkToggle/>
            </li>
            <!--<li class="dropdown has-megamenu">
              <productDropdown/>
            </li>-->
            <li class="ms-2">
              <div class="btn btn-primary" aria-current="page" href="#">
                  <i class="fa-duotone fa-user-alien"></i> <div class=" ps-2 d-none d-sm-inline">Sign in</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="offcanvas offcanvas-start d-lg-none" tabindex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
      <div class="offcanvas-header">
        <h6 class="offcanvas-title text-gradient" id="mobileMenuLabel">
          <img class="invert-dark logo" height="48" width="48" alt="Less Borders Logo" src="https://static.lessborders.com/apps/lessborders/lessborders_logo.svg"/>
          &nbsp;Cloud
        </h6>
        <button type="button" class="btn btn-transparent" data-bs-dismiss="offcanvas" aria-label="Close"><i class="fa-solid fa-xmark fa-lg"></i></button>
      </div>
      <div class="offcanvas-body p-0">
        <ul id="mobileMenuList" class="nav flex-column" style="list-style: none;">
            <li v-for="page in pages" :key="page">
              <router-link v-if="!page.children" class="nav-link mobileMenuToggle h5" :to="page.link">
                {{page.name}}
              </router-link>
              <div v-if="page.children">
                <a :href="'#mobileMenuList' + encodeURIComponent(page.name)" class="nav-link custom-icon icon-right h5 collapsed" data-bs-toggle="collapse" role="button">
                  {{page.name}} <i class="fa-solid fa-angle-down"></i>
                </a>
                <ul class="collapse" :id="'mobileMenuList' + encodeURIComponent(page.name)" data-bs-parent="#mobileMenuList" style="list-style: none;">
                  <li v-for="page in page.children" :key="page">
                    <router-link v-if="!page.children" class="nav-link mobileMenuToggle" :to="page.link">
                      {{page.name}}
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<script>
import * as bootstrap from "bootstrap";

const pages = [
    {
        name: "Plans & Products",
        link: "/plans",
        active: 0,
        children: false
    },
    {
        name: "Orders & Invoices",
        link: "/orders",
        active: 0,
        children: false
    },
    {
        name: "Settings",
        link: "/account",
        active: 0,
        children: false
    },
];

export default {
  data() {
    return {
      scrolledNavbar: false,
      showNavbar: true,
      lastScrollPosition: 0,
      pages: pages,
      myOffCanvas: null
    };
  },
  mounted() {
    const myOffcanvas = document.getElementById('mobileMenu');
    const bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);

    var mobileMenuToggles = document.getElementsByClassName("mobileMenuToggle");
    for (var i = 0; i < mobileMenuToggles.length; i++) {
      mobileMenuToggles[i].addEventListener("click", function(){
        bsOffcanvas.toggle();
      });
    }
    
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollOffset = 70;

      if (currentScrollPosition < 0) {
        return;
      }

      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < scrollOffset) {
        return;
      }
      
      this.scrolledNavbar = currentScrollPosition > scrollOffset;
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    }
  }
};
</script>