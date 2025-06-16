<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import Bento from "./Bento.svelte";

	// Basic props:
	//  - list : An array of items to display (should be typed in production)
	// - requestMore : A function this component calls when it needs more items to display (reached bottom of scroll)
	interface BentoBoxProps {
		list: any[];
		requestMore(): void;
	}

	// List must be bound so it displays items upad
	let { list = $bindable(), requestMore }: BentoBoxProps = $props();

	let sentinel: HTMLElement | null = null;
	let observer: IntersectionObserver | null = null;

	onMount(() => {
		if (!sentinel) return;

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						requestMore();
					}
				});
			},
			{
				root: null,
				rootMargin: "100px",
				threshold: 0.5
			}
		);

		observer.observe(sentinel);
	});

	onDestroy(() => {
		if (observer && sentinel) {
			observer.unobserve(sentinel);
			observer.disconnect();
		}
	});
</script>

<ul class="h-full w-full overflow-y-auto p-4">
	{#each list as item, index (index)}
		<Bento title={item.title} body={item.body} />
	{/each}
	<li bind:this={sentinel} style="height: 1px;"></li>
</ul>
