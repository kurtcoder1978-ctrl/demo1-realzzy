<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="flex flex-1 items-start justify-center px-4 py-12 sm:items-center sm:py-16">
      <slot />
    </main>
  </div>
</template>
