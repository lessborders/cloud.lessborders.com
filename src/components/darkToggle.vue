<template>
	<button
		:title="theme == 'dark' ? 'Dark Theme' : 'Light Theme'"
		@click="toggleTheme()"
		class="theme btn btn-transparent px-3"
	>
		<i v-if="theme === 'dark'" class="fa-duotone fa-moon text-warning fa-lg"></i>
		<i v-if="theme != 'dark'" class="fa-duotone fa-sun-bright text-warning fa-lg"></i>
	</button>
</template>

<script>

	export default {
		data() {
			return {
				theme: localStorage.getItem("theme")
			};
		},
		methods: {
			toggleTheme() {
				if (this.theme == "dark") {
					this.theme = "light";
					document.body.setAttribute("data-theme", "light");
					localStorage.setItem("theme", "light");
				} else {
					this.theme = "dark";
					document.body.setAttribute("data-theme", "dark");
					localStorage.setItem("theme", "dark");
				}
			}
		}
	};
</script>