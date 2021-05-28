<template>
  <div class="column">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title has-text-white">
          {{ title }}
        </p>
        <b-icon
          :icon="icon"
          size="is-medium"
          :type="icontype || 'is-primary'"
        />
      </header>
      <div class="card-content">
        <div class="content has-text-centered">
          <slot/>
        </div>
      </div>
      <footer v-if="footer" class="card-footer">
        <div class="card-footer-item">
          <span>
            <p class="has-text-grey">
              {{ footer }}
            </p>
          </span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false
    },
    icontype: {
      type: String,
      required: false,
    },
    footer: {
      type: String,
      required: false
    }
  }
}
</script>
