<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card"
    :class="
      cn(
        'bg-card text-card-foreground rise-in flex flex-col gap-6 rounded-xl border border-primary/20 py-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
