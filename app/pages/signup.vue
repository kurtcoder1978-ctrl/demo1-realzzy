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
  <AuthCard v-if="sent" title="Check your email">
    <p class="text-muted-foreground">
      We sent a confirmation link to <strong class="text-foreground">{{ email }}</strong>. Click it to activate your
      account, then log in.
    </p>
    <p v-if="info" class="mt-4 text-sm text-success">{{ info }}</p>
    <p v-if="error" class="mt-4 text-sm text-destructive" role="alert">{{ error }}</p>
    <Button variant="outline" class="mt-6 w-full" @click="resend">Resend email</Button>
    <p class="mt-6 text-center text-sm text-muted-foreground">
      <NuxtLink to="/login" class="link-lux">Go to log in</NuxtLink>
    </p>
  </AuthCard>

  <AuthCard v-else title="Create your account" description="Short videos, real chemistry. Start with your email.">
    <form class="grid gap-5" novalidate @submit.prevent="onSubmit">
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" v-model="email" type="email" autocomplete="email" required />
      </div>
      <PasswordInput id="password" v-model="password" label="Password" autocomplete="new-password" />
      <PasswordStrength :password="password" />
      <PasswordInput id="confirm" v-model="confirm" label="Confirm password" autocomplete="new-password" />
      <p v-if="confirm && !matches" class="text-sm text-destructive">Passwords do not match.</p>
      <p v-if="error" class="text-sm text-destructive" role="alert">{{ error }}</p>
      <Button type="submit" size="lg" :disabled="!valid || busy">
        {{ busy ? 'Creating account...' : 'Sign up' }}
      </Button>
    </form>
    <p class="mt-6 text-center text-sm text-muted-foreground">
      Already a member? <NuxtLink to="/login" class="link-lux">Log in</NuxtLink>
    </p>
  </AuthCard>
</template>
