
<template>

  <v-app>
    <!-- <v-app-bar
      app
      color="green"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="/assets/logo-footer.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

    
    </v-app-bar> -->

    <v-content>
      <Giphy/>
    </v-content>
  </v-app>
</template>

<script>
import Giphy from './components/Giphy';

export default {
  name: 'App',

  components: {
    Giphy,
  },

  data: () => ({
    //
  }),
};
</script>
