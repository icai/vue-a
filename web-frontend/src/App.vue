<template>
	<div id="app">
		<!--<top-menu></top-menu>-->
		<!--<el-row style="top: 80px;">
			<el-col :offset="2" :span="20">
				<transition name="router">
					<router-view></router-view>
				</transition>
			</el-col>			
		</el-row>-->
		<router-view></router-view>
	</div>
</template>

<script>

</script>

<style>	
	body {
		margin: 0px;
		padding: 0px;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
		font-weight: 400;
		-webkit-font-smoothing: antialiased;
	}
	
	#app {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		margin-top:0px;
	}
</style>