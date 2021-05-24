<template>
  <section class="section">
    <div class="container">
        <b-message type="is-danger" :closable="false" has-icon aria-close-label="Close message">
          <template #header>
            An error occured: <b>{{ error.statusCode }}</b>
          </template>
          {{ error.message }}
        </b-message>
        <div class="columns buttons is-mobile">
          <b-button class="column is-medium is-4 is-offset-2" tag="NuxtLink" type="is-dark" icon-right="home" to="/">Home</b-button>
          <b-button class="column is-medium is-4" tag="NuxtLink" type="is-dark" icon-right="arrow-left" :to="this.$nuxt.context.from ? this.$nuxt.context.from.path : '/'">Return</b-button>
        </div>
        <script>
        </script>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
export default (Vue as VueConstructor<
  Vue & {
    pageNotFound: string
    otherError: string
    error: {
      statusCode: number
    }
  }
>).extend({
  layout: "default",
  props: {
    error: {
      type: Object,
      default: null
    }
  }
})
</script>
