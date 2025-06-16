<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="description" content="Infinite scrolling + data loading example written in SvelteKit by Garrett Foy">
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
</svelte:head>

<div class="h-dvh w-screen">
	<div class="p-5 h-full w-full">
		<div class="h-full w-full overflow-hidden">
			{@render children()}
		</div>
	</div>
</div>