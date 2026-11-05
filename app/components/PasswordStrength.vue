<script setup lang="ts">
const props = defineProps<{ password: string }>()
const strength = computed(() => getPasswordStrength(props.password))
</script>

<template>
  <div class="strength" aria-live="polite">
    <div class="bars" :data-score="strength.score">
      <span v-for="i in 4" :key="i" :class="{ on: i <= strength.score }" />
    </div>
    <p class="strength-label" :data-score="strength.score">
      {{ strength.label ? `Strength: ${strength.label}` : 'Enter a password' }}
    </p>
    <ul class="rules">
      <li v-for="r in PASSWORD_RULES" :key="r.id" :class="{ ok: r.test(password) }">
        <span aria-hidden="true">{{ r.test(password) ? '✓' : '○' }}</span> {{ r.label }}
      </li>
    </ul>
  </div>
</template>
