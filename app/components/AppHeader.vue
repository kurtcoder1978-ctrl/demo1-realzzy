<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const email = computed(() => user.value?.email ?? '')
const initial = computed(() => (email.value[0] ?? '?').toUpperCase())

function onDocClick(e: MouseEvent) {
  if (open.value && root.value && !root.value.contains(e.target as Node)) open.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})

async function signOut() {
  open.value = false
  await supabase.auth.signOut()
  await navigateTo('/login')
}
</script>

<template>
  <header class="app-header">
    <NuxtLink to="/dashboard" class="brand">Demo App</NuxtLink>

    <div ref="root" class="user-menu">
      <button
        type="button"
        class="avatar"
        :aria-expanded="open"
        aria-haspopup="menu"
        :aria-label="`Account menu for ${email}`"
        @click="open = !open"
      >
        {{ initial }}
      </button>

      <div v-if="open" class="menu" role="menu">
        <div class="menu-email" :title="email">
          <span class="menu-label">Signed in as</span>
          <span class="menu-value">{{ email }}</span>
        </div>
        <button type="button" role="menuitem" class="menu-item" @click="signOut">Log out</button>
      </div>
    </div>
  </header>
</template>
