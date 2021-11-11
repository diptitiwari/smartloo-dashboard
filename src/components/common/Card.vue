<template>
  <b-card
    :class="cssClass"
    card-min-height="180">
    <template v-slot:header>
      <span class="mb-0">
        <i :class="icon"/>
        {{ title }}
      </span>
    </template>
    <slot />
  </b-card>
</template>

<script>
export default {
  name: "EBCard",
  props: {
    cssClass: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: true,
      default: "Title"
    },
    icon: {
      type: String,
      required: false,
      default: "fa "
    }
  }
};
</script>

<style scoped>
[card-min-height="180"] {
  min-height: 180px;
}
</style>
