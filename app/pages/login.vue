<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const email = ref('')
const password = ref('')
const busy = ref(false)
const error = ref<string | null>(null)
const info = ref<string | null>(null)
const unconfirmed = ref(false)

watchEffect(() => {
  if (user.value) navigateTo('/dashboard', { replace: true })
})

async function onSubmit() {
  busy.value = true
  error.value = null
  info.value = null
  unconfirmed.value = false
  const { error: err } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  busy.value = false
  if (!err) return navigateTo('/dashboard', { replace: true })
  if (err.code === 'email_not_confirmed' || /not confirmed/i.test(err.message)) {
    unconfirmed.value = true
    error.value = 'Please confirm your email before logging in. Check your inbox for the confirmation link.'
  } else if (err.code === 'invalid_credentials' || /invalid login/i.test(err.message)) {
    error.value = 'Incorrect email or password.'
  } else {
    error.value = err.message
  }
}

async function resend() {
  const { error: err } = await supabase.auth.resend({
    type: 'signup',
    email: email.value,
    options: { emailRedirectTo: `${window.location.origin}/confirm` },
  })
  if (err) error.value = err.message
  else info.value = 'Confirmation email sent. Check your inbox.'
}
</script>

<template>
  <AuthCard title="Welcome back" description="Log in to pick up where you left off.">
    <form class="grid gap-5" @submit.prevent="onSubmit">
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" v-model="email" type="email" autocomplete="email" required />
      </div>
      <PasswordInput id="password" v-model="password" label="Password" autocomplete="current-password" />
      <p v-if="error" class="text-sm text-destructive" role="alert">{{ error }}</p>
      <p v-if="info" class="text-sm text-success">{{ info }}</p>
      <Button v-if="unconfirmed" type="button" variant="outline" @click="resend">
        Resend confirmation email
      </Button>
      <Button type="submit" size="lg" :disabled="busy || !email || !password">
        {{ busy ? 'Logging in...' : 'Log in' }}
      </Button>
    </form>
    <div class="mt-6 grid gap-2 text-center text-sm text-muted-foreground">
      <NuxtLink to="/forgot-password" class="link-lux mx-auto">Forgot password?</NuxtLink>
      <p>New here? <NuxtLink to="/signup" class="link-lux">Create an account</NuxtLink></p>
    </div>
  </AuthCard>
</template>
