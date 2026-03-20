<script setup lang="ts">
import { CheckCircle } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const emailId = useId()
const honeypotId = useId()

const email = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')

// Check localStorage for previous signup
const alreadySubscribed = ref(false)
onMounted(() => {
  try {
    alreadySubscribed.value = localStorage.getItem('newsletter-subscribed') === 'true'
    if (alreadySubscribed.value) {
      status.value = 'success'
    }
  } catch {
    // localStorage unavailable (private browsing, SSR)
  }
})

async function handleSubmit(event: Event) {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  // Honeypot check on client side
  const honeypot = (formData.get('company') as string || '').trim()
  if (honeypot) {
    // Silently pretend success
    status.value = 'success'
    return
  }

  const emailValue = email.value.trim()
  if (!emailValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    status.value = 'error'
    errorMessage.value = 'Please enter a valid email address.'
    return
  }

  status.value = 'loading'
  errorMessage.value = ''

  try {
    await $fetch('/api/subscribe', {
      method: 'POST',
      body: { email: emailValue, company: '' },
    })
    status.value = 'success'
    try {
      localStorage.setItem('newsletter-subscribed', 'true')
    } catch {
      // localStorage unavailable
    }
  } catch (err: any) {
    status.value = 'error'
    errorMessage.value = err?.data?.message || err?.statusMessage || 'Unable to subscribe. Please try again later.'
  }
}
</script>

<template>
  <div>
    <div v-if="status === 'success'" class="flex items-center gap-2 p-3 bg-primary/10 rounded-md" aria-live="polite">
      <CheckCircle class="size-6 text-primary shrink-0" aria-hidden="true" />
      <p class="m-0 font-medium text-foreground">You're in! Check your inbox.</p>
    </div>

    <form v-else class="flex flex-col gap-2" @submit.prevent="handleSubmit">
      <div class="flex flex-col gap-1.5">
        <Label :for="emailId" class="text-sm font-medium text-muted-foreground">Email address</Label>
        <div class="flex gap-2 max-sm:flex-col">
          <Input
            :id="emailId"
            v-model="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            autocomplete="email"
            :aria-invalid="status === 'error' ? 'true' : undefined"
            :aria-describedby="status === 'error' ? `${emailId}-error` : undefined"
            class="flex-1"
          />
          <Button
            type="submit"
            :disabled="status === 'loading'"
            class="max-sm:w-full"
          >
            {{ status === 'loading' ? 'Subscribing...' : 'Subscribe' }}
          </Button>
        </div>
      </div>

      <!-- Honeypot field -- hidden from real users -->
      <div aria-hidden="true" class="absolute -left-[9999px] -top-[9999px] opacity-0 h-0 w-0 overflow-hidden pointer-events-none">
        <label :for="honeypotId">Company</label>
        <input
          :id="honeypotId"
          type="text"
          name="company"
          tabindex="-1"
          autocomplete="one-time-code"
        />
      </div>

      <p
        v-if="status === 'error'"
        :id="`${emailId}-error`"
        class="m-0 text-sm text-destructive"
        role="alert"
      >
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>
