<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import Bento from "./Bento.svelte";

	// Basic props:
	//  - list : An array of items to display (should be typed in production)
	// - requestMore : A function this component calls when it needs more items to display (reached bottom of scroll)
	interface BentoBoxProps {
		list: any[];
		loading: boolean;
		requestMore(): void;
	}

	// List must be bound so it displays items reactively
	let { list = $bindable(), loading = $bindable(), requestMore }: BentoBoxProps = $props();

	// Sentinel element for IntersectionObserver
	// This element will be observed to trigger loading more items when it comes into view
	let sentinel: HTMLElement | null = null;

	// IntersectionObserver instance
	let observer: IntersectionObserver | null = null;

	// When component is mounted, setup the IntersectionObserver
	// and start observing the sentinel element
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

	// When component is destroyed, disconnect the observer
	// to prevent memory leaks and stop observing the sentinel
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
	{#if loading}
		<!-- Simulate 5 items loading... -->
		{#each Array(5) as _, i (i)}
			<li>
				<Bento title="Loading..." body="Fetching more items..." loading={true} />
			</li>
		{/each}
	{/if}
	<li bind:this={sentinel} style="height: 1px;"></li>
</ul>
