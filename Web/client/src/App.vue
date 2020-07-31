<template>
  <v-app style="background: #010b13; top: 0; left: 0;">
    <NavBar style="z-index: 500; position: fixed; width: 100%;" />
    <router-view />
  </v-app>
</template>

<script>
import NavBar from "./components/Navbar";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>
