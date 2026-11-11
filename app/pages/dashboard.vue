<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <AuthCard title="Welcome to realzzy">
    <p class="text-muted-foreground">
      You're signed in as <strong class="text-foreground">{{ user?.email }}</strong>.
    </p>
  </AuthCard>
</template>
