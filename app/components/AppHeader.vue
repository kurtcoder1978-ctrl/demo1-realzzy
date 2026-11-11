<script setup lang="ts">
import { LogOut } from '@lucide/vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const email = computed(() => user.value?.email ?? '')
const initial = computed(() => (email.value[0] ?? '?').toUpperCase())

async function signOut() {
  await supabase.auth.signOut()
  await navigateTo('/login')
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
    <div class="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-4 sm:px-6">
      <NuxtLink
        to="/"
        class="font-serif text-2xl font-medium tracking-tight text-foreground transition-colors duration-200 hover:text-primary"
        aria-label="realzzy home"
      >
        realzzy<span class="text-primary">.</span>
      </NuxtLink>

      <DropdownMenu v-if="user">
        <DropdownMenuTrigger as-child>
          <button
            type="button"
            class="rounded-full ring-1 ring-primary/60 ring-offset-2 ring-offset-background transition-shadow duration-200 hover:ring-primary"
            :aria-label="`Account menu for ${email}`"
          >
            <Avatar class="size-10">
              <AvatarFallback class="bg-secondary font-serif text-base text-primary">
                {{ initial }}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-64 border-border bg-popover">
          <DropdownMenuLabel class="flex flex-col gap-0.5 font-normal">
            <span class="text-xs uppercase tracking-[0.08em] text-muted-foreground">Signed in as</span>
            <span class="truncate text-sm font-medium text-foreground" :title="email">{{ email }}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="cursor-pointer" @select="signOut">
            <LogOut class="size-4" aria-hidden="true" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <nav v-else class="flex items-center gap-2" aria-label="Account">
        <Button as-child variant="ghost">
          <NuxtLink to="/login">Log in</NuxtLink>
        </Button>
        <Button as-child>
          <NuxtLink to="/signup">Sign up</NuxtLink>
        </Button>
      </nav>
    </div>
  </header>
</template>
