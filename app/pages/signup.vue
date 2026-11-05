<script setup lang="ts">
const supabase = useSupabaseClient()

const email = ref('')
const password = ref('')
const confirm = ref('')
const busy = ref(false)
const error = ref<string | null>(null)
const info = ref<string | null>(null)
const sent = ref(false)

const matches = computed(() => password.value === confirm.value)
const valid = computed(() => email.value.length > 0 && validatePassword(password.value) && matches.value)

const redirectTo = () => `${window.location.origin}/confirm`

async function onSubmit() {
  if (!valid.value) return
  busy.value = true
  error.value = null
  const { error: err } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: { emailRedirectTo: redirectTo() },
  })
  busy.value = false
  if (err) error.value = err.message
  else sent.value = true
}

async function resend() {
  error.value = null
  info.value = null
  const { error: err } = await supabase.auth.resend({
    type: 'signup',
    email: email.value,
    options: { emailRedirectTo: redirectTo() },
  })
  if (err) error.value = err.message
  else info.value = 'Confirmation email sent again.'
}
</script>

<template>
  <main class="card">
    <template v-if="sent">
      <h1>Check your email</h1>
      <p>
        We sent a confirmation link to <strong>{{ email }}</strong>. Click it to activate your account, then log in.
      </p>
      <p v-if="info" class="success">{{ info }}</p>
      <p v-if="error" class="error" role="alert">{{ error }}</p>
      <button class="secondary" @click="resend">Resend email</button>
      <p class="alt"><NuxtLink to="/login">Go to log in</NuxtLink></p>
    </template>

    <template v-else>
      <h1>Create account</h1>
      <form novalidate @submit.prevent="onSubmit">
        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" autocomplete="email" required />
        </div>
        <PasswordInput id="password" v-model="password" label="Password" autocomplete="new-password" />
        <PasswordStrength :password="password" />
        <PasswordInput id="confirm" v-model="confirm" label="Confirm password" autocomplete="new-password" />
        <p v-if="confirm && !matches" class="error">Passwords do not match.</p>
        <p v-if="error" class="error" role="alert">{{ error }}</p>
        <button type="submit" :disabled="!valid || busy">
          {{ busy ? 'Creating account...' : 'Sign up' }}
        </button>
      </form>
      <p class="alt">Already have an account? <NuxtLink to="/login">Log in</NuxtLink></p>
    </template>
  </main>
</template>
