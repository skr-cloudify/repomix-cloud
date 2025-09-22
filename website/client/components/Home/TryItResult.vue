<script setup lang="ts">
import type { PackResult } from '../api/client';
import TryItResultContent from './TryItResultContent.vue';
import TryItResultErrorContent from './TryItResultErrorContent.vue';

defineProps<{
  result: PackResult | null;
  loading: boolean;
  error: string | null;
  repositoryUrl?: string;
}>();
</script>

<template>
  <div class="result-viewer">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Processing repository...</p>

      <div class="sponsor-section">
        <p class="sponsor-header">Special thanks to:</p>
        <a href="https://www.warp.dev/repomix" target="_blank" rel="noopener noreferrer">
          <img alt="Warp sponsorship" width="400" src="/images/sponsors/warp/Terminal-Image.png">
        </a>
        <p class="sponsor-title">
          <a href="https://www.warp.dev/repomix" target="_blank" rel="noopener noreferrer">
            Warp, the AI terminal for developers
          </a>
        </p>
        <p class="sponsor-subtitle">
          <a href="https://www.warp.dev/repomix" target="_blank" rel="noopener noreferrer">
            Available for MacOS, Linux, & Windows
          </a>
        </p>
      </div>
    </div>

    <TryItResultErrorContent
      v-else-if="error"
      :message="error"
      :repository-url="repositoryUrl"
    />

    <TryItResultContent
      v-else-if="result"
      :result="result"
    />
  </div>
</template>

<style scoped>
.result-viewer {
  margin-top: 24px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.loading {
  padding: 36px;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 16px;
  border: 3px solid var(--vp-c-brand-1);
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

.sponsor-section {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sponsor-section p {
  margin: 8px 0;
}

.sponsor-section .sponsor-header {
  font-size: 0.9em;
}

.sponsor-section img {
  max-width: 100%;
  height: auto;
  margin: 12px 0;
}

.sponsor-section .sponsor-title {
  font-weight: bold;
  font-size: 1.1em;
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

.sponsor-section .sponsor-subtitle {
  font-size: 0.9em;
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
