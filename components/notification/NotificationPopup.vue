<template>
  <v-dialog v-model="dialog">
    <v-card v-if="notification" flat dark color="warning">
      <v-img height="300" :src="`/${notification.type}.gif`" />
      <v-card-text class="text-xs-center display-3 font-weight-black pa-5">
        {{ notification.message }}
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "nuxt-property-decorator";
import Notification from '~/models/Notification'

@Component
export default class NotificationPopup extends Vue {
  @Prop() notifications!: Array<Notification>;
  dialog: boolean = false;
  notification: Notification | null = null;

  mounted() {
    setInterval(() => {
      if (this.notifications.length > 0 && !this.dialog) {
        this.alert(this.notifications.shift()!)
      }
    }, 1000)
  }

  alert(notification: Notification) {
    this.dialog = true
    this.notification = notification

    const audio = new Audio(`/${notification.type}.wav`);
    audio.play();

    setTimeout(() => {
      this.dialog = false
      this.notification = null;
    }, 20000);
  }
}
</script>
