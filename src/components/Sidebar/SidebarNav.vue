<template>
  <nav class="sidebar-nav mt-2">
    <VuePerfectScrollbar
      :settings="psSettings"
      class="scroll-area"
      @ps-scroll-y="scrollHandle">
      <ul class="nav mt-2">
        <template v-for="(item, index) in navItems">
          <template v-if="item.title">
            <SidebarNavTitle
              :key="index"
              :name="item.name"
              :classes="item.class"
              :wrapper="item.wrapper"/>
          </template>
          <template v-else-if="item.divider">
            <SidebarNavDivider
              :key="index"
              :classes="item.class"/>
          </template>
          <template v-else-if="item.label">
            <SidebarNavLabel
              :key="index"
              :name="item.name"
              :url="item.url"
              :icon="item.icon"
              :label="item.label"
              :classes="item.class"/>
          </template>
          <template v-else>
            <template v-if="item.children">
              <!-- First level dropdown -->
              <SidebarNavDropdown
                :key="index"
                :name="item.name"
                :url="item.url"
                :icon="item.icon">
                <template v-for="(childL1, index1) in item.children">
                  <template v-if="childL1.children">
                    <!-- Second level dropdown -->
                    <SidebarNavDropdown
                      :key="index1"
                      :name="childL1.name"
                      :url="childL1.url"
                      :icon="childL1.icon">
                      <li
                        v-for="(childL2, index2) in childL1.children"
                        :key="index2"
                        class="nav-item">
                        <SidebarNavLink
                          :name="childL2.name"
                          :url="childL2.url"
                          :icon="childL2.icon"
                          :badge="childL2.badge"
                          :variant="childL2.variant"
                          :attributes="childL2.attributes" />
                      </li>
                    </SidebarNavDropdown>
                  </template>
                  <template v-else>
                    <SidebarNavItem
                      :key="index1"
                      :classes="item.class">
                      <SidebarNavLink
                        :name="childL1.name"
                        :url="childL1.url"
                        :icon="childL1.icon"
                        :badge="childL1.badge"
                        :variant="childL1.variant"
                        :attributes="childL1.attributes"/>
                    </SidebarNavItem>
                  </template>
                </template>
              </SidebarNavDropdown>
            </template>
            <template v-else-if="isEnabled(item.roleNames)">
              <SidebarNavItem
                :key="index"
                :classes="item.class">
                <SidebarNavLink
                  :name="item.name"
                  :url="item.url"
                  :icon="item.icon"
                  :badge="item.badge"
                  :variant="item.variant"
                  :attributes="item.attributes"/>
              </SidebarNavItem>
            </template>
          </template>
        </template>
      </ul>
      <slot/>
    </VuePerfectScrollbar>
  </nav>
</template>

<script>
import SidebarNavDivider from "./SidebarNavDivider";
import SidebarNavDropdown from "./SidebarNavDropdown";
import SidebarNavLink from "./SidebarNavLink";
import SidebarNavTitle from "./SidebarNavTitle";
import SidebarNavItem from "./SidebarNavItem";
import SidebarNavLabel from "./SidebarNavLabel";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  name: "SidebarNav",
  components: {
    SidebarNavDivider,
    SidebarNavDropdown,
    SidebarNavLink,
    SidebarNavTitle,
    SidebarNavItem,
    SidebarNavLabel,
    VuePerfectScrollbar
  },
  props: {
    navItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      currentUserRole: this.$store.state.account.role_names
    };
  },
  computed: {
    psSettings: () =>
      // ToDo: find better rtl fix
      ({
        maxScrollbarLength: 200,
        minScrollbarLength: 40,
        suppressScrollX: getComputedStyle(document.querySelector("html")).direction !== "rtl",
        wheelPropagation: false,
        interceptRailY: styles => ({ ...styles, height: 0 })
      })
  },
  methods: {
    scrollHandle(evt) {
      // console.log(evt)
    },

    isEnabled(roles) {
      const allow = this.currentUserRole.map(role => roles.includes(role));
      return allow.includes(true);
    }
  }
};
</script>

<style scoped lang="css">
  .scroll-area {
    position: absolute;
    height: 100%;
    margin: auto;
  }

  .sidebar .nav-link {
    color: #cedce4;
    font-size: 15px !important;
  }
  .sidebar .nav-link.active{
    background: none !important;
    color: white !important;
  }

  .sidebar .nav-link:hover {
    color: #fff;
    text-decoration: none;
    background: none;
  }

  .sidebar .nav-dropdown.open {
    background: none;
  }

  @media (min-width: 992px){
    .sidebar-minimized .sidebar .nav-item:hover > .nav-link {
      background: white;
      color: black;
    }
  }
</style>
