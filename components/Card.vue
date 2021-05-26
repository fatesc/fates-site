<template>
  <div class="column">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          {{ title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content has-text-centered">
          <b-icon
            :icon="icon"
            size="is-medium"
            type="is-primary"
          />
        </div>
      </div>
      <footer v-if="footer" class="card-footer">
        <div class="card-footer-item">
          <span>
            <slot>
              <p class="has-text-grey">
                {{ footer }}
              </p>
            </slot>
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
      required: true
    },
    footer: {
      type: String,
      required: false
    }
  }
}
</script>
