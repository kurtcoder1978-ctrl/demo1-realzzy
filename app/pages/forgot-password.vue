<script setup lang="ts">
const supabase = useSupabaseClient()

const email = ref('')
const busy = ref(false)
const sent = ref(false)
const error = ref<string | null>(null)

async function onSubmit() {
  busy.value = true
  error.value = null
  const { error: err } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: `${window.location.origin}/reset-password`,
  })
  busy.value = false
  if (err) error.value = err.message
  else sent.value = true
}
</script>

<template>
  <AuthCard title="Reset your password">
    <template v-if="sent">
      <p class="text-muted-foreground">
        If an account exists for <strong class="text-foreground">{{ email }}</strong>, we've sent a link to reset your
        password.
      </p>
      <p class="mt-6 text-center text-sm"><NuxtLink to="/login" class="link-lux">Back to log in</NuxtLink></p>
    </template>
    <template v-else>
      <p class="mb-5 text-muted-foreground">Enter your email and we'll send you a link to choose a new password.</p>
      <form class="grid gap-5" @submit.prevent="onSubmit">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" v-model="email" type="email" autocomplete="email" required />
        </div>
        <p v-if="error" class="text-sm text-destructive" role="alert">{{ error }}</p>
        <Button type="submit" size="lg" :disabled="busy || !email">
          {{ busy ? 'Sending...' : 'Send reset link' }}
        </Button>
      </form>
      <p class="mt-6 text-center text-sm"><NuxtLink to="/login" class="link-lux">Back to log in</NuxtLink></p>
    </template>
  </AuthCard>
</template>
