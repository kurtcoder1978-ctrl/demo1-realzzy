<script setup lang="ts">
import { Check, Circle } from '@lucide/vue'

const props = defineProps<{ password: string }>()
const strength = computed(() => getPasswordStrength(props.password))

// rose -> copper -> gold -> sage
const barColors = ['', 'bg-[#f0788a]', 'bg-[#d98a5f]', 'bg-primary', 'bg-success']
</script>

<template>
  <div class="grid gap-2" aria-live="polite">
    <div class="grid grid-cols-4 gap-1.5" :data-score="strength.score">
      <span
        v-for="i in 4"
        :key="i"
        class="h-1.5 rounded-full transition-colors duration-300"
        :class="i <= strength.score ? barColors[strength.score] : 'bg-border'"
      />
    </div>
    <p class="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
      {{ strength.label ? `Strength: ${strength.label}` : 'Enter a password' }}
    </p>
    <ul class="grid gap-1 text-sm">
      <li
        v-for="r in PASSWORD_RULES"
        :key="r.id"
        class="flex items-center gap-2 transition-colors duration-200"
        :class="r.test(password) ? 'text-success' : 'text-muted-foreground'"
      >
        <Check v-if="r.test(password)" class="size-4" aria-hidden="true" />
        <Circle v-else class="size-4" aria-hidden="true" />
        {{ r.label }}
      </li>
    </ul>
  </div>
</template>
