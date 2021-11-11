<template>
  <div>
    <div
      :style="{width: width ? width : 570 + 'px'}"
      class="custom-modal">
      <!-- Content will be placed here -->
      <!-- <div class="layer1"></div> -->
      <div :class="{'under-layer1': !hideBoxShadow}">
        <div :class="{'under-layer2': !hideBoxShadow}">
          <div :style="{padding: padding ? padding : '60px 0px'}">
            <slot />
          </div>
        </div>
      </div>
    </div>
    <div class="temp"/>
  </div>
</template>

<script>
export default {
  name: "Modal",

  components: { },

  props: {
    padding: null,
    width: null,
    hideBoxShadow: true
  },

  mounted() {
  },

  methods: { }
};
</script>

<style scoped>
	.custom-modal {
		border-radius: 10px;
    background-color: #f5f9ff;
    padding: 0px 15px;
	}

  .under-layer1 {
    padding: 0px 15px;
    border-radius: 5px;
    border: unset;
    background-color: #f5f9ff;
    box-shadow: 0px 15px 1px 0px rgb(245, 250, 255, 0.3);
  }

  .under-layer1.disabled, .under-layer2.disabled {
    box-shadow: unset !important
  }

  .under-layer2 {
    padding: 0px 25px;
    border: unset;
    border-radius: 5px;
    background-color: #f5f9ff;
    box-shadow: 0px 30px 1px 0px rgb(245, 250, 255, 0.3);
  }

  .layer1 {
    width: 540px;
    height: 100%;
    opacity: 0.3;
    border-radius: 5px;
    background-color: #f5f9ff;
    z-index: 1;
    position: absolute;
    display: block;
  }

	.custom-modal input {
		height: 50px;
		border-top-left-radius: unset;
    border-bottom-left-radius: unset;
		border-radius: 5px !important;
		border: solid 1px rgba(0, 0, 0, 0.07);
		background-color: #ffffff;
		padding: 13px 20px 16px 20px;
		color: #7c7d8d;
		font-size: 16px;
	}

	.custom-modal .input-group {
    display: block;
  }

  .custom-modal .input-group input {
    width: 100%;
  }

  .custom-modal .form-group {
    margin-bottom: 26px;
  }

  .custom-modal .form-group p {
    margin-bottom: 14px;
  }

  .custom-modal .login {
    transform: translate(-100%, -50%);
    position: absolute;
    top: 50%;
    margin-right: -100%;
    font-size: 14px;
    color: #264eee !important;
  }

  .custom-modal .login span{
    color: #979ea5 !important;
  }

  .temp {
    height: 40px;
    opacity: 0;
    display: block;
  }

</style>
