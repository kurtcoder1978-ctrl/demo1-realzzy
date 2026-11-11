<script setup lang="ts">
import { Eye, EyeOff } from '@lucide/vue'

const props = defineProps<{ id: string; label: string; autocomplete?: string }>()
const model = defineModel<string>({ default: '' })
const visible = ref(false)
</script>

<template>
  <div class="grid gap-2">
    <Label :for="props.id">{{ props.label }}</Label>
    <div class="relative">
      <Input
        :id="props.id"
        v-model="model"
        :type="visible ? 'text' : 'password'"
        :autocomplete="props.autocomplete"
        required
        class="pr-12"
      />
      <button
        type="button"
        class="absolute right-1 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition-colors duration-150 hover:text-foreground"
        :aria-label="visible ? 'Hide password' : 'Show password'"
        :aria-pressed="visible"
        @click="visible = !visible"
      >
        <EyeOff v-if="visible" class="size-5" aria-hidden="true" />
        <Eye v-else class="size-5" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
