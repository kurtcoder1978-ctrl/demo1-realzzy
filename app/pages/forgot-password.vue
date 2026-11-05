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
  <main class="card">
    <h1>Reset password</h1>
    <template v-if="sent">
      <p>
        If an account exists for <strong>{{ email }}</strong>, we've sent a link to reset your password.
      </p>
      <p class="alt"><NuxtLink to="/login">Back to log in</NuxtLink></p>
    </template>
    <template v-else>
      <p>Enter your email and we'll send you a link to choose a new password.</p>
      <form @submit.prevent="onSubmit">
        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" autocomplete="email" required />
        </div>
        <p v-if="error" class="error" role="alert">{{ error }}</p>
        <button type="submit" :disabled="busy || !email">
          {{ busy ? 'Sending...' : 'Send reset link' }}
        </button>
      </form>
      <p class="alt"><NuxtLink to="/login">Back to log in</NuxtLink></p>
    </template>
  </main>
</template>
