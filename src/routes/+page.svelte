<script lang="ts">
	import BentoBox from "$lib/components/custom/bento/BentoBox.svelte";
	import { onMount } from "svelte";
	import type { Post } from "../types/post";
	import { deserialize } from "$app/forms";
	import type { ActionResult } from "@sveltejs/kit";

    let data = $state<Post[]>([]);
    let limit = $state(10);
    let expected = $derived(10);
    let increment = 5;
    let offset = $state(0);

    // Add data handles fetching more data and adding it to our data array.
    async function addData(amount: number) {
        // First adjust the offset and limit
        // Since we are adding more data, we need to increase the offset
        offset += amount;
        expected += amount;

        const formData = new FormData();

        formData.append("limit", String(limit));
        formData.append("offset", String(offset));

        const response = await fetch("?/fetchPosts", {
            method: "POST",
            body: formData,
        })

        const result: ActionResult = deserialize(await response.text());

        if(result.type === "success" && Array.isArray(result.data?.posts)) {
            const posts: Post[] = result.data.posts as Post[];
            data = [...data, ...posts];
        } else {
            console.error("Error fetching posts");
            expected -= amount;
        }
    }

    onMount(() => {
        addData(limit); 
    })
    
</script>


<div class="h-full flex flex-col justify-evenly content-center items-center">
    <div class="p-2 flex flex-col space-y-2 shrink-0 w-full justify-center">
        <h1 class="text-2xl font-bold text-center">Infinite Scroll + Data Load Demo</h1>
        <p class="text-lg font-mono text-center">
            This demo showcases an infinite scroll implementation using Svelte. As you scroll down, more posts are fetched and displayed from a FormAction.
        </p>
    </div>
    <div class="flex grow overflow-hidden w-full">
        <BentoBox requestMore={() => {addData(increment)}} bind:list={data} />
    </div>
</div>

