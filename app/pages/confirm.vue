<script setup lang="ts">
// Landing page for the email-confirmation link. The Supabase module exchanges
// the token in the URL for a session; once the user is set we go to the dashboard.
const user = useSupabaseUser()
const timedOut = ref(false)

watch(
  user,
  (u) => {
    if (u) navigateTo('/dashboard', { replace: true })
  },
  { immediate: true },
)

onMounted(() => {
  setTimeout(() => (timedOut.value = true), 5000)
})
</script>

<template>
  <main class="card">
    <h1>Confirming your email...</h1>
    <p v-if="!timedOut">One moment.</p>
    <template v-else>
      <p>Your email is confirmed if you followed a valid link. If nothing happens, you can log in now.</p>
      <p class="alt"><NuxtLink to="/login">Go to log in</NuxtLink></p>
    </template>
  </main>
</template>
