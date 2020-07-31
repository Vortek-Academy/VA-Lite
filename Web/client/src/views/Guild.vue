<template>
  <v-container style="margin-top: 5rem;" grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm6>
        <v-card
          dark
          hover
          elevation="4"
          style="background: #161719; color: #e67e22;"
          class="opacity-hover"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-2" style="color: #e67e22;">
                {{ guild.name }}
              </v-list-item-title>
              <v-divider />
              <div class="overline mb-4">{{ guild.id }}</div>
              <v-list-item-subtitle>
                <v-chip
                  label
                  style="margin-right: 4px; background: #ff9505; color: black;"
                  v-for="d in counts"
                  :key="d"
                >
                  {{ d.type }}: {{ d.count }}
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar size="80" color="black">
              <v-img :src="guild.iconURL"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card
          dark
          hover
          elevation="4"
          style="background: #161719; color: #e67e22;"
          class="opacity-hover"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline">Guild Prefix</div>
              <v-text-field
                dark
                append-icon="mdi-cogs"
                label="Enter new prefix"
                v-model="prefix"
                single-line
                hide-details
              ></v-text-field>
              <div class="overline mt-4">Mod Action Log Channel</div>
              <v-select
                dark
                solo
                dense
                label="Select Channel"
                v-model="logChannel"
                :items="channel"
                :menu-props="{ offsetY: true }"
              ></v-select>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-spacer />
            <v-btn
              @click.stop="save()"
              :loading="loading"
              depressed
              style="background-color: #e67e22; color: black;"
              ><v-icon style="margin-right: 3px;"
                >mdi-content-save-outline</v-icon
              >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" dark max-width="500px">
      <v-card
        style="
          font-family: Josefin, sans-serif;
          font-weight: bold;
          border: solid 1px #e67e22;
        "
      >
        <v-card-title style="word-break: normal;">
          {{ text }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue dark-1" text @click="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import config from "../../../../config.json";

export default {
  Name: "GDash",
  data: () => ({
    counts: [],
    guild: {},
    prefix: "",
    logChannel: "",
    channel: [],
    loading: false,
    dialog: false,
    text: "",
  }),
  methods: {
    save() {
      this.loading = true;
      let route = `${
        config[process.env.VUE_APP_TYPE].api
      }/api/guild?access_token=${localStorage.getItem("access_token")}&id=${
        this.guild.id
      }`;

      if (this.prefix !== this.guild.database.prefix)
        route += `&prefix=${this.prefix}`;
      const channel = this.guild.channels.find(
        (x) => `#${x.name}` === this.logChannel
      );
      if (channel && channel.id !== this.guild.database.moderationChannel)
        route += `&logChannel=${channel.id}`;

      fetch(route, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.success) {
            this.text =
              "Something went wrong! Please contact us if this continues.";
            this.loading = false;
            return (this.dialog = true);
          }
          this.text = "Successfully updated the server configs!";
          this.loading = false;
          this.dialog = true;
        });
    },
  },
  beforeCreate() {
    fetch(
      `${
        config[process.env.VUE_APP_TYPE].api
      }/api/guilds?access_token=${localStorage.getItem("access_token")}&id=${
        this.$route.params.id
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) return (location.href = "/");
        this.guild = res.guild;
        this.counts.push(
          { type: "Members", count: this.guild.memberSize },
          { type: "Channels", count: this.guild.channelSize },
          { type: "Roles", count: this.guild.rolesSize }
        );
        this.channel = this.guild.channels
          .filter((x) => x.type === "text")
          .map((c) => `#${c.name}`);
        this.prefix = this.guild.database.prefix;
        const channel = this.guild.channels.find(
          (x) => x.id === this.guild.database.moderationChannel
        );
        if (channel) this.logChannel = `#${channel.name}`;
      });
  },
};
</script>
