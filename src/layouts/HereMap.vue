<template>
  <div class="here-map">
    <div
      id="mapContainer"
      ref="map"
      :style="{ width: width, height: height }"/>
  </div>
</template>
<script>
import JQuery from "jquery";
import Vue from "vue";

const $ = JQuery;
export default {
  name: "HereMap",
  props: {
    lat: String | Number,
    lng: String | Number,
    width: String,
    height: String,
    markers: null,
    sites: Array,
    mapId: String
  },
  data() {
    return {
      center: {
        lat: "",
        lng: ""
      },
      map: {},
      platform: {},
      ui: {},
      behavior: {}
    };
  },

  watch: {
    sites(newVal, oldVal) {
      this.addSites();
    },
    markers(newVal, oldVal) {
      this.addMarkers();
    },
    lat(newVal, oldVal) {
      console.log("this is new val", newVal, "this is old value", oldVal);
    },
    lng(newVal, oldVal) {
      console.log("this is new val", newVal, "this is old value", oldVal);
    }
  },
  created() {
    this.getSiteInfo();
  },

  mounted() {
    this.platform = new H.service.Platform({
      apikey: "Wk4nF2rnYkVleQBc3EFrXGAgZaR8X5JSmshSG5ASxo4"
    });
    const layers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      document.getElementById("mapContainer"),
      layers.raster.normal.map,
      {
        zoom: 11,
        center: { lng: this.lng, lat: this.lat },
        pixelRatio: window.devicePixelRatio || 1
      },
    );
    window.addEventListener("resize", () => this.map.getViewPort().resize());
    this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, layers);
    this.setUpClickListener();
    this.addSites();
  },

  methods: {
    async getSiteInfo() {
      try {
        const response = await Vue.$http.get("sites");
        const res = response.data;
        this.center.lat = res.home_location.latitude;
        this.center.lng = res.home_location.longitude;
      } catch (error) {
        const res = error.response.data;
        this.$notify({
          group: "alert",
          type: "error",
          text: res.error,
          width: 400
        });
      }
    },
    setUpClickListener() {
      this.map.addEventListener("tap", (evt) => {
        const coord = this.map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
        this.$emit("onClick", { lat: coord.lat.toFixed(7), long: coord.lng.toFixed(7) });
      });
    },

    addSites() {
      if (typeof this.sites === "undefined" || this.sites === null) {
        return;
      }
      const markers = [];
      let status = false;
      const homeElement = document.createElement("div");
      const homeIcon = require("../assets/icons/home_marker-512.png");
      homeElement.innerHTML = `<img src='${homeIcon}' style="width:6%">`;

      this.sites.forEach((site) => {
        const element = document.createElement("div");
        let iconUrl = null;

        if (site.latitude == this.lat && site.longitude == this.lng) {
          iconUrl = homeIcon;
          status = true;
        } else {
          iconUrl = require("../assets/icons/marker_2-512.png");
        }

        // element.style.backgroundColor = '#ffffff';
        // element.style.width = '32px';
        // element.style.height = '32px';
        // element.style.display = 'block';
        // element.style.borderRadius = '50%';
        // element.style.padding = '2px 8px';
        // element.style.boxShadow = '1px 1px 1px 1px rgba(38, 78, 238, 1)'; */
        element.innerHTML = `<img src='${iconUrl}' style="width:5%">`;

        const domIcon = new H.map.DomIcon(element, {
          onAttach(clonedElement, domIcon, domMarker) {},
          onDetach(clonedElement, domIcon, domMarker) {}
        });

        const bearsMarker = new H.map.DomMarker({ lat: site.latitude, lng: site.longitude }, {
          icon: domIcon
        });

        bearsMarker.setData("<div class='custom-bubble py-2 col-md-12' id='custom-modal'>" +
                            `<h4>${site.name}</h4>` +
                            "<div class='d-flex'>" +
                            `<img class='eb-image' src='${iconUrl}'>` +
                            `<p class='pl-2 pr-2'>${site.address}</p>` +
                            "</div>" +
                            "<div class='col-md-12 p-0 mt-2'>" +
                            `<button class='btn btn-primary' id='site${site.id}'>Site details</button>` +
                            "</div>" +
                        "</div>");
        markers.push(bearsMarker);
      });

      if (!status) {
        const domIcon = new H.map.DomIcon(homeElement, {
          onAttach(clonedElement, domIcon, domMarker) {},
          onDetach(clonedElement, domIcon, domMarker) {}
        });
        const bearsMarker = new H.map.DomMarker({ lat: this.lat, lng: this.lng }, {
          icon: domIcon
        });
        bearsMarker.setData("<div>This home for this tenant</div>");
        markers.push(bearsMarker);
      }
      console.log("this is marker", markers);
      const group = new H.map.Group();
      group.addObjects(markers);
      this.map.addObject(group);
      //   this.map.getViewModel().setLookAtData({
      //     zoom: 10,
      //     bounds: group.getBoundingBox(),
      //   });
      group.addEventListener("tap", (evt) => {
        const { target } = evt;
        const bubble = new H.ui.InfoBubble(target.getGeometry(), {
          content: target.getData()
        });
        this.ui.addBubble(bubble);
        setTimeout(this.setJqueryFunction(), 300);
      }, false);
    },

    addMarkers() {
      if (typeof this.markers === "undefined" || this.markers === null) {
        return;
      }
      const markers = [];
      console.log(this.markers);
      this.markers.forEach((marker) => {
        const element = document.createElement("div");
        const iconUrl = require("../assets/icons/marker.png");
        element.style.backgroundColor = "#ffffff";
        element.style.width = "32px";
        element.style.height = "32px";
        element.style.display = "block";
        element.style.borderRadius = "50%";
        element.style.padding = "2px 8px";
        element.style.margin = "-16px 0px 0px -16px";
        element.style.boxShadow = "1px 1px 1px 1px rgba(38, 78, 238, 1)";
        element.innerHTML =
                        `<img src='${iconUrl}'>`;
        const domIcon = new H.map.DomIcon(element, {
          onAttach(clonedElement, domIcon, domMarker) {},
          onDetach(clonedElement, domIcon, domMarker) {}
        });
        const bearsMarker = new H.map.DomMarker({ lat: marker.lat, lng: marker.long }, {
          icon: domIcon
        });
        // bearsMarker.setData(
        //     "<div class='custom-bubble col-md-12' id='custom-modal'>" +
        //         "<h6 class='text-center pt-2 pb-2'>SMART LOO OFFICE</h6>" +
        //         "<p>Site type: " + site.site_type + "</p>" +
        //         "<p>" + site.address + "</p>" +
        //         "<div class='col-md-12 p-0 text-right mt-2 ml-2'>" +
        //         "<button class='btn btn-primary' id='site" + site.id + "'>Site details</button>" +
        //         "</div>" +
        //     "</div>"
        // );
        markers.push(bearsMarker);
      });
      const group = new H.map.Group();
      group.addObjects(markers);
      this.map.removeObjects(this.map.getObjects());
      this.map.addObject(group);
      // this.map.getViewModel().setLookAtData({
      //     zoom: 10,
      //     bounds: group.getBoundingBox()
      // });
      // group.addEventListener('tap', (evt) => {
      //     var target = evt.target;
      //     var bubble =  new H.ui.InfoBubble(target.getGeometry(), {
      //         content: target.getData()
      //     });
      //     this.ui.addBubble(bubble);
      //     setTimeout(this.setJqueryFunction(), 300);
      // }, false);
    },

    setJqueryFunction() {
      $(document).ready(() => {
        $("#custom-modal button").click(() => {
          this.gotoSiteDetails($("#custom-modal button").attr("id"));
        });
      });
    },

    gotoSiteDetails(siteId) {
      const id = parseInt(siteId.slice(4));
      Vue.router.push({
        name: "site-details",
        params: { id }
      });
    }
  }
};
</script>

<style>
.eb-image {
  height: 29px;
  margin-top: 6px;
}
.H_ib_body{
  min-width: 300px;
  padding: 10px;
}
.H_ib_content{
  margin: 0px !important;
}
</style>
