<script lang="ts">
	import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
	import { cn } from "$lib/utils";

    interface BentoProps {
        title: string;
        body: string;
        loading?: boolean;
    }

    let className = "p-8 dark:bg-zinc-900/30";

    let { title, body, loading}: BentoProps = $props();
</script>

<div>
  <div class="my-4 w-full border-[0.5px] border-zinc-400 dark:border-white/70 relative shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)]">
    <div class={cn("text-left", className)}>
      {#if loading}
        <Skeleton class="my-1 h-8 w-1/2" />
        <Skeleton class="my-1 h-8 w-3/4" />
      {:else}
        <h2 class="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p class="text-gray-700 dark:text-gray-300">
          {body}
        </p>
      {/if}
    </div>
  </div>
</div>