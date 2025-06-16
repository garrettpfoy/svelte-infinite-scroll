<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0" /> -->

<div class="h-dvh w-screen">
	<div class="p-5 h-full w-full">
		<div class="h-full w-full overflow-hidden">
			{@render children()}
		</div>
	</div>
</div>