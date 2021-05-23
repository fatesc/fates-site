<template>
  <section class="section">
    <div class="container">
        <b-message type="is-danger" has-icon aria-close-label="Close message">
          <template #header>
            An error occured: <b>{{ error.statusCode }}</b>
          </template>
          {{ error.message }}
        </b-message>
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
  },
})
</script>
