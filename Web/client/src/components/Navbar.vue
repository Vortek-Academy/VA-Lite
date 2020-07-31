<template>
  <div>
    <v-app-bar
      hide-on-scroll
      flat
      style="font-family: 'Josefin', serif; background: transparent;"
    >
      <v-toolbar-title style="padding: 5px; margin-right: 1rem; color: #fbbc0e;"
        ><v-avatar
          ><v-img
            style="height: 40px; width: 40px;"
            src="https://cdn.discordapp.com/avatars/662151947968577563/92bbb5f3004b72f9f65a1ce40d3d95ee.png?size=320"
        /></v-avatar>
        VA Lite</v-toolbar-title
      >
      <v-btn
        text
        href="/"
        v-bind:class="{ active: isActive(`home`), link: true }"
      >
        Home
      </v-btn>
      <v-btn
        text
        href="/commands"
        v-bind:class="{ active: isActive(`commands`), link: true }"
      >
        Commands
      </v-btn>
      <v-btn
        v-if="loggedIn"
        text
        href="/dashboard"
        v-bind:class="{ active: isActive(`dashboard`), link: true }"
      >
        Dashboard
      </v-btn>
      <v-btn
        v-else
        text
        @click.stop="login()"
        v-bind:class="{ active: isActive(`dashboard`), link: true }"
      >
        Dashboard
      </v-btn>
      <!--v-btn text class="link">
        Donate
      </v-btn-->
      <v-spacer></v-spacer>
      <v-btn
        v-if="!loggedIn"
        color="#fbbc0e"
        style="margin-right: 1rem;"
        @click.stop="login()"
      >
        Login
      </v-btn>
      <v-tooltip v-else bottom style="padding: 5px; margin-right: 1rem;">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="#fbbc0e" @click.stop="logout()">
            <v-img
              style="
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 1rem;
              "
              v-on="on"
              v-bind="attrs"
              :src="`https://cdn.discordapp.com/avatars/${user.id}/${
                user.avatar
              }.${user.avatar.startsWith('a_') ? 'gif' : 'png'}`"
            />
            Log Out
          </v-btn>
        </template>
        <span>{{ user.username }}#{{ user.discriminator }}</span>
      </v-tooltip>
    </v-app-bar>
    <v-snackbar
      v-model="cookie"
      bottom
      dark
      timeout="-1"
      style="font-weight: bold;"
    >
      This website uses cookies to ensure best experience. For more information
      on our use of cookies, read our
      <a :href="`/policy/privacy`">Privacy Policy</a>.
      <v-btn text color="#e67e22" @click="acceptCookie()">Accept</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import config from "../../../../config.json";

export default {
  name: "Nav",
  data: () => ({
    user: {},
    loggedIn: false,
    cookie: false,
  }),
  methods: {
    login() {
      fetch(`${config[process.env.VUE_APP_TYPE].api}/api/auth`)
        .then((res) => res.json())
        .then((res) => (location.href = res.url));
    },
    logout() {
      localStorage.removeItem("access_token");
      location.reload();
    },
    isActive(route) {
      return this.$route.name && route === this.$route.name.toLowerCase();
    },
    acceptCookie() {
      localStorage.setItem("valite_cookie", "true");
      this.cookie = false;
    },
  },
  mounted() {
    if (localStorage.getItem("access_token")) {
      fetch(`
    ${
      config[process.env.VUE_APP_TYPE].api
    }/api/user?access_token=${localStorage.getItem("access_token")}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            this.user = res.user;
            this.loggedIn = true;
          } else {
            localStorage.removeItem("access_token");
          }
        });
      if (!this.user) localStorage.removeItem("access_token");
    }
    if (
      !localStorage.getItem("valite_cookie") ||
      localStorage.getItem("valite_cookie") !== "true"
    )
      this.cookie = true;
  },
};
</script>

<style scoped>
@import "../assets/Fonts.css";

.link {
  font-family: Josefin, sans-serif !important;
  color: #fbbc0e !important;
  font-size: 20px;
  padding: 1rem;
  transition: ease 0.2s;
}

.link:hover {
  border-bottom: #eef0f2 solid 2px;
  margin-top: 5px;
}

.active {
  border-bottom: #eef0f2 solid 2px;
  margin-top: 3px;
}
</style>
