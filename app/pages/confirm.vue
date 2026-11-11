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
  <AuthCard title="Confirming your email">
    <p v-if="!timedOut" class="text-muted-foreground">One moment.</p>
    <template v-else>
      <p class="text-muted-foreground">
        Your email is confirmed if you followed a valid link. If nothing happens, you can log in now.
      </p>
      <p class="mt-6 text-center text-sm"><NuxtLink to="/login" class="link-lux">Go to log in</NuxtLink></p>
    </template>
  </AuthCard>
</template>
