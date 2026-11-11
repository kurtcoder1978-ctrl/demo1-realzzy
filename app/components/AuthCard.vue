<script setup lang="ts">
defineProps<{ title: string; description?: string }>()
</script>

<template>
  <Card class="w-full max-w-md gap-6">
    <CardHeader class="px-6 sm:px-10">
      <CardTitle class="font-serif text-3xl font-medium leading-tight">{{ title }}</CardTitle>
      <CardDescription v-if="description" class="text-muted-foreground">{{ description }}</CardDescription>
    </CardHeader>
    <CardContent class="px-6 sm:px-10">
      <slot />
    </CardContent>
  </Card>
</template>
