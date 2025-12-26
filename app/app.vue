<script setup>
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  htmlAttrs: { lang: 'en' }
})

useSeoMeta({
  title: 'One Tap SOS',
  description: 'Instant emergency alerts with one tap'
})
</script>

<template>
  <UApp>
    <UHeader class="sticky top-0 z-50">
      <template #left>
        <NuxtLink
          to="/"
          class="font-bold text-lg"
        >
          🚨 One Tap SOS
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain class="px-4 sm:px-6">
      <NuxtPage />
    </UMain>

    <UFooter class="mt-16">
      <template #left>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} One Tap SOS
        </p>
      </template>

      <template #right>
        <span class="text-sm text-muted">
          Built with Nuxt UI
        </span>
      </template>
    </UFooter>
  </UApp>
</template>
