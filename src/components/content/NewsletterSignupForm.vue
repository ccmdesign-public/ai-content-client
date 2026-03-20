<script setup lang="ts">
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
  if (!emailValue || !/.+@.+\..+/.test(emailValue)) {
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
  <div class="signup-form">
    <div v-if="status === 'success'" class="signup-form__success" aria-live="polite">
      <span class="material-symbols-outlined signup-form__success-icon" aria-hidden="true">check_circle</span>
      <p class="signup-form__success-text">You're in! Check your inbox.</p>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="signup-form__form">
      <div class="signup-form__field">
        <label :for="emailId" class="signup-form__label">Email address</label>
        <div class="signup-form__input-row">
          <input
            :id="emailId"
            v-model="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            autocomplete="email"
            class="signup-form__input"
            :aria-invalid="status === 'error' ? 'true' : undefined"
            :aria-describedby="status === 'error' ? `${emailId}-error` : undefined"
          />
          <button
            type="submit"
            class="signup-form__button"
            :disabled="status === 'loading'"
          >
            {{ status === 'loading' ? 'Subscribing...' : 'Subscribe' }}
          </button>
        </div>
      </div>

      <!-- Honeypot field -- hidden from real users -->
      <div aria-hidden="true" class="signup-form__honeypot">
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
        class="signup-form__error"
        role="alert"
      >
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>

<style scoped>
.signup-form__form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.signup-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.signup-form__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--muted-foreground);
}

.signup-form__input-row {
  display: flex;
  gap: 0.5rem;
}

.signup-form__input {
  flex: 1;
  padding: 0.625rem 0.875rem;
  font-size: 1rem;
  font-family: inherit;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm, 0.375rem);
  background: var(--background);
  color: var(--foreground);
  min-width: 0;
}

.signup-form__input:focus {
  outline: 2px solid var(--primary);
  outline-offset: -1px;
  border-color: var(--primary);
}

.signup-form__input[aria-invalid="true"] {
  border-color: var(--destructive, #ef4444);
}

.signup-form__button {
  padding: 0.625rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  font-family: inherit;
  background: var(--primary);
  color: var(--primary-foreground, #fff);
  border: none;
  border-radius: var(--radius-sm, 0.375rem);
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.15s ease;
}

.signup-form__button:hover {
  opacity: 0.9;
}

.signup-form__button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.signup-form__honeypot {
  position: absolute;
  left: -9999px;
  top: -9999px;
  opacity: 0;
  height: 0;
  width: 0;
  overflow: hidden;
  pointer-events: none;
}

.signup-form__error {
  margin: 0;
  font-size: 0.875rem;
  color: var(--destructive, #ef4444);
}

.signup-form__success {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: color-mix(in srgb, var(--primary) 10%, transparent);
  border-radius: var(--radius-sm, 0.375rem);
}

.signup-form__success-icon {
  color: var(--primary);
  font-size: 1.5rem;
}

.signup-form__success-text {
  margin: 0;
  font-weight: 500;
  color: var(--foreground);
}

@media (max-width: 480px) {
  .signup-form__input-row {
    flex-direction: column;
  }

  .signup-form__button {
    width: 100%;
  }
}
</style>
