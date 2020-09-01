<template>
  <v-container grid-list-xl style="margin-top: 5rem;">
    <v-layout wrap>
      <v-flex xs12 sm6 lg4 v-for="guild in guilds" :key="guild.id">
        <v-card
          dark
          hover
          elevation="4"
          style="background: #161719; color: #e67e22;"
          class="opacity-hover"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{ guild.id }}</div>
              <v-list-item-title class="headline mb-1">{{
                guild.name
              }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar size="80" color="black">
              <v-img
                :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
              :href="`/dashboard/guild/${guild.id}`"
              depressed
              v-if="guild.hasBot"
              style="background-color: #e67e22; color: black;"
              >Manage
            </v-btn>
            <v-btn
              :href="invite"
              depressed
              v-else
              style="background-color: #e11b22;"
              >Add Bot
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import config from "../../../../config.json";

export default {
  Name: "Dashboard",
  data: () => ({
    guilds: [],
    invite: `${config[process.env.VUE_APP_TYPE].api}/invite`,
  }),
  beforeCreate() {
    fetch(
      `${
        config[process.env.VUE_APP_TYPE].api
      }/api/guilds?access_token=${localStorage.getItem("access_token")}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) location.href = "/";
        this.guilds = res.guilds;
      });
  },
};
</script>
