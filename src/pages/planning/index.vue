<template>
	<q-page class="flex flex-start column">
		<q-card>
			<q-card-section>
				<h3 class="q-py-sm q-ma-none text-weight-bold text-uppercase">Planning</h3>
			</q-card-section>
		</q-card>
		<div>
			<q-tabs
				dense
				align="left"
				narrow-indicator
				class="q-mb-md"
			>
				<q-route-tab name="ContentTopics" label="Content Topics" :to="{name:'planning.content-topics.index'}"/>
				<q-route-tab name="ContentCreationSchedule" label="Schedule" :to="{name:'planning.schedule.index'}"/>
				<q-route-tab name="PlatformGoals" label="Goals" :to="{name:'planning.goals.index'}"/>
			</q-tabs>
			<div class="q-pa-md">
				<router-view></router-view>
			</div>
		</div>
	</q-page>
</template>

<script>
export default {
	name: 'index',
	data () {
		return {}
	},
	methods: {}
}
</script>

<style scoped>

</style>
