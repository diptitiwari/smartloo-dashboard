<template>
  <div
    :class="type"
    :style="{width: (width ? width : '150px'), height: (height ? height : '55px')}"
    class="normal-btn"
    @click="onClick(params)">
    <p>
      <slot>Button</slot>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: false
    },
    params: null,
    type: "",
    width: null,
    height: null
  }
};
</script>
<style scoped>
  .normal-btn {
		width: 150px;
		height: 55px;
		border-radius: 5px;
		background-color: #264eee;
		position: relative;
		cursor: default !important;
	}

	.normal-btn p {
		font-family: TT Norms;
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

	.normal-btn.btn-green {
		background-color: #1ed660;
	}

	.normal-btn.btn-white {
  		background-color: #ffffff;
		color: #264eee !important;
	}

	.normal-btn.btn-grey {
		border: solid 1px rgba(0, 0, 0, 0.07) !important;
		background-color: #f3f3f3 !important;
	}

	.normal-btn.btn-red {
		background-color: rgb(233, 75, 61) !important;
		border: unset !important;
	}

	.normal-btn:hover {
		background-color: #1c40d4;
	}

	.normal-btn:active {
		background-color: #264eee;
  		/* border: solid 1px #1c40d4; */
	}

	.normal-btn.btn-green:hover {
		background-color: #06a73f;
	}

	.normal-btn.btn-green:active {
		opacity: 1;
		background: #1ed660;
		border: unset;
		/* border: solid 1px #1ed660; */
	}

	.normal-btn.btn-white:hover {
		background-color: #cbcbcb;
	}

	.normal-btn.btn-red:hover {
		background-color: rgb(215, 60, 45) !important
	}

	.normal-btn.btn-white:active {
		opacity: 1;
		background: unset;
  		border: solid 1px #ffffff;
	}

	.normal-btn.btn-grey:hover {
		background-color: rgba(0, 0, 0, 0.06) !important;
	}

	.normal-btn.btn-grey:active {
		opacity: 1;
		background-color: rgb(0, 0, 0, 0.04) !important;
	}

	.normal-btn.btn-red:active {
		opacity: 1;
		background-color: rgb(233, 75, 61) !important;
	}

	.normal-btn.btn-grey p {
		color: #000000 !important;
		font-weight: bold !important;
		font-size: 18px;
	}

</style>
