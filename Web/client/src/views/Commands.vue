<template>
  <v-container style="margin-top: 5rem;">
    <v-card style="background: #161719;">
      <v-app-bar flat style="background: transparent; color: #eef0f2;">
        <v-layout wrap>
          <v-toolbar-title style="color: #e67e22;">
            Select Category
          </v-toolbar-title>
          <v-spacer />
          <v-btn
            v-for="cat in categories"
            :key="cat"
            depressed
            v-bind:class="{ active: isActive(cat) }"
            @click.stop="filterCommand(cat.toLowerCase())"
            style="margin: 0 5px; background: #e67e22;"
          >
            {{ cat }}
          </v-btn>
        </v-layout>
      </v-app-bar>
      <v-card-title style="color: #e67e22;">
        <v-layout wrap>
          {{ category }} Commands
          <v-spacer />
          <v-text-field
            dark
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-layout>
      </v-card-title>
      <v-data-table
        dark
        style="background: transparent;"
        :headers="headers"
        :items="commands"
        :loading="loading"
        :search="search"
        loading-text="Fetching the data from VA servers..."
        :items-per-page="5"
        class="elevation-6"
      >
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import config from "../../../../config.json";

export default {
  name: "Commands",
  data: () => ({
    search: "",
    loading: true,
    category: "All",
    categories: [],
    allCommands: [],
    commands: [],
    headers: [
      {
        text: "Name",
        value: "name",
      },
      {
        text: "Description",
        value: "description",
      },
      {
        text: "Usage",
        value: "usage",
      },
    ],
  }),
  methods: {
    filterCommand(cat) {
      this.commands = this.allCommands;
      this.category = cat[0].toUpperCase() + cat.slice(1);
      if (cat === "all") return;
      this.commands = this.commands.filter((c) => c.cat.toLowerCase() === cat);
    },
    isActive(cat) {
      return cat.toLowerCase() === this.category.toLowerCase();
    },
  },
  beforeCreate() {
    fetch(`${config[process.env.VUE_APP_TYPE].api}/api/commands`)
      .then((res) => res.json())
      .then((data) => {
        this.commands = data.commands;
        this.allCommands = data.commands;
        this.categories = this.commands.reduce(
          (acc, val) =>
            acc.includes(val.cat.toUpperCase())
              ? acc
              : [...acc, val.cat.toUpperCase()],
          ["ALL"]
        );
        this.loading = false;
      });
  },
};
</script>

<style scoped>
.active {
  background: transparent !important;
  color: #eef0f2 !important;
}
</style>
