<template>
  <div
    :class="type"
    :style="{width: (width ? width : '50px'), height: (height ? height : '50px')}"
    class="circle-btn"
    @click="onClick">
    <p>
      <slot>X</slot>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: true
    },
    type: "",
    width: null,
    height: null
  }
};
</script>
<style scoped>
  	.circle-btn {
		border-radius: 100%;
		background-color: #264eee;
		position: relative;
		cursor: default !important;
	}

	.circle-btn p {
    	margin: 0;
    	position: absolute;
    	top: 50%;
    	left: 50%;
    	margin-right: -50%;
    	transform: translate(-50%, -50%);
		font-weight: 500;
		text-align: center;
		color: #ffffff;
	}

	.circle-btn.btn-green {
		background-color: #1ed660;
	}

	.circle-btn.btn-white {
  		background-color: #ffffff;
		color: #264eee !important;
	}

	.circle-btn:hover {
		background-color: #1c40d4;
	}

	.circle-btn:active {
		background: unset;
  		border: solid 1px #1c40d4;
	}

	.circle-btn.btn-green:hover {
		background-color: #06a73f;
	}

	.circle-btn.btn-green:active {
		background: unset;
		border: solid 1px #1ed660;
	}

	.circle-btn.btn-white:hover {
		background-color: #cbcbcb;
	}

	.circle-btn.btn-white:active {
		background: unset;
  		border: solid 1px #ffffff;
	}
</style>
