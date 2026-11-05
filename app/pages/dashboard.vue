<script setup lang="ts">
definePageMeta({ layout: 'app' })

const user = useSupabaseUser()
</script>

<template>
  <main class="card">
    <h1>Welcome</h1>
    <p>
      You're signed in as <strong>{{ user?.email }}</strong>.
    </p>
  </main>
</template>
