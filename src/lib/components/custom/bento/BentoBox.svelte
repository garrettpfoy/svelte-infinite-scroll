<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import Bento from "./Bento.svelte";

    interface BentoBoxProps {
        list : any[];
        requestMore(): void;
    }

    let { list = $bindable(), requestMore }: BentoBoxProps = $props();

    let listElement = $state<any>(undefined);

    onMount(() => {
		if (listElement) {
			listElement.addEventListener("scroll", function () {
				if (
					listElement.scrollTop + listElement.clientHeight >=
					listElement.scrollHeight
				) {
					requestMore();
				}
			});
		}
	});

	onDestroy(() => {
        if(listElement) {
            listElement?.removeAllListeners("scroll");
        }
	});

</script>

<ul bind:this={listElement} class="h-full w-full overflow-y-auto p-4">
	{#each list as item, index (index)}
		<Bento title={item.title} body={item.body} />
	{/each}
</ul>
