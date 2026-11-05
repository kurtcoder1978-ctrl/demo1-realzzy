<script setup lang="ts">
const supabase = useSupabaseClient()

const ready = ref(false)
const expired = ref(false)
const password = ref('')
const confirm = ref('')
const busy = ref(false)
const done = ref(false)
const error = ref<string | null>(null)

const matches = computed(() => password.value === confirm.value)
const valid = computed(() => validatePassword(password.value) && matches.value)

onMounted(() => {
  // The recovery link signs the user into a temporary recovery session.
  const { data: sub } = supabase.auth.onAuthStateChange((event) => {
    if (event === 'PASSWORD_RECOVERY') ready.value = true
  })
  setTimeout(async () => {
    if (!ready.value) {
      const { data } = await supabase.auth.getSession()
      if (data.session) ready.value = true
      else expired.value = true
    }
  }, 2500)
  onBeforeUnmount(() => sub.subscription.unsubscribe())
})

async function onSubmit() {
  if (!valid.value) return
  busy.value = true
  error.value = null
  const { error: err } = await supabase.auth.updateUser({ password: password.value })
  busy.value = false
  if (err) {
    error.value = err.message
    return
  }
  done.value = true
  await supabase.auth.signOut()
}
</script>

<template>
  <main class="card">
    <h1>Choose a new password</h1>

    <template v-if="done">
      <p class="success">Your password has been updated.</p>
      <p class="alt"><NuxtLink to="/login">Log in with your new password</NuxtLink></p>
    </template>

    <template v-else-if="ready">
      <form novalidate @submit.prevent="onSubmit">
        <PasswordInput id="password" v-model="password" label="New password" autocomplete="new-password" />
        <PasswordStrength :password="password" />
        <PasswordInput id="confirm" v-model="confirm" label="Confirm new password" autocomplete="new-password" />
        <p v-if="confirm && !matches" class="error">Passwords do not match.</p>
        <p v-if="error" class="error" role="alert">{{ error }}</p>
        <button type="submit" :disabled="!valid || busy">
          {{ busy ? 'Saving...' : 'Update password' }}
        </button>
      </form>
    </template>

    <template v-else-if="expired">
      <p class="error">This reset link is invalid or has expired.</p>
      <p class="alt"><NuxtLink to="/forgot-password">Request a new link</NuxtLink></p>
    </template>

    <p v-else>Verifying link...</p>
  </main>
</template>
