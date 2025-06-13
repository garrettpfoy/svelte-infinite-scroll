<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="h-dvh w-screen">
	<div class="p-10 h-full w-full">
		<div class="h-full w-full overflow-hidden">
			{@render children()}
		</div>
	</div>
</div>