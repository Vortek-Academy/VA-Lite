<template>
  <v-container
    class="text-center"
    fluid
    id="title"
    style="top: 0; margin: 3rem 0; color: #eef0f2;"
  >
    <h1
      class="text-center"
      style="margin-top: 6rem; font-size: 4rem; color: #e67e22;"
    >
      VA Lite
    </h1>
    <br />
    <h1 class="text-center">
      Light, purposeful and to the point! Your perfect bot when it comes to a
      quick setup!
    </h1>
    <br />
    <br />
    <v-icon style="padding-bottom: 2rem; color: #e67e22;"
      >mdi-arrow-down</v-icon
    >
    <br />
    <div>
      <v-chip
        id="invite"
        large
        style="background-color: #c40233;"
        :href="invite"
        target="_blank"
      >
        <span style="margin: 0 3rem; font-size: 23px;">Invite Now</span>
      </v-chip>
    </div>
    <br />
    <v-layout wrap style="margin-top: 10rem;">
      <v-row align="center" justify="center">
        <v-card dark class="text-center va-info" style="margin: 0 3rem;">
          <v-card-text style="padding: 1.5rem 2.5rem; font-size: 23px;">
            Developed by VorteK Academy
          </v-card-text>
          <v-card-text>
            <a class="va-link" href="https://discord.gg/3zTaMMC" target="_blank"
              ><v-icon>mdi-discord</v-icon></a
            >
            <a
              class="va-link"
              href="https://twitter.com/vortekacademy"
              target="_blank"
              ><v-icon>mdi-twitter</v-icon></a
            >
            <a class="va-link" href="https://vortekacademy.com/" target="_blank"
              ><v-avatar>
                <v-img
                  style="height: 50px; width: 50px;"
                  src="../assets/VA.png"
                /> </v-avatar
            ></a>
            <a
              class="va-link"
              href="https://steamcommunity.com/id/vortekacademy"
              target="_blank"
              ><v-icon>mdi-steam</v-icon></a
            >
            <a
              class="va-link"
              href="https://www.twitch.tv/vortekacademy"
              target="_blank"
              ><v-icon>mdi-twitch</v-icon></a
            >
          </v-card-text>
          <v-card-text style="font-size: 18px;"
            >© 2020 VorteK Academy
          </v-card-text>
        </v-card>
        <div style="margin: 3rem;">
          <v-row>
            <h2>Policies:</h2>
            <v-btn text class="policy">Privacy</v-btn>
            <v-divider
              color="#eef0f2"
              vertical
              style="height: 1cm;"
            ></v-divider>
            <v-btn text class="policy">Terms</v-btn>
          </v-row>
          <br /><br />
          <v-dialog v-model="dialog.dialog" dark max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="#e67e22">
                Get Newsletters
              </v-btn>
            </template>
            <v-card
              style="
                font-family: Josefin, sans-serif;
                font-weight: bold;
                border: solid 1px #e67e22;
              "
            >
              <v-card-title>
                Subscribe to VA Newsletters
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Your Name"
                        v-model="dialog.name"
                      ></v-text-field>
                      <div
                        v-if="dialog.submitted && !$v.dialog.name.required"
                        class="invalid-feedback"
                      >
                        Name is required
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Email"
                        v-model="dialog.email"
                      ></v-text-field>
                      <div
                        v-if="dialog.submitted && !$v.dialog.email.error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.dialog.email.required"
                          >Email is required</span
                        >
                        <span v-if="!$v.dialog.email.email"
                          >Email is invalid</span
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue dark-1" text @click="dialog.dialog = false"
                  >Close</v-btn
                >
                <v-btn
                  color="blue dark-1"
                  text
                  @click.stop="submit()"
                  :loading="dialog.btnLoading"
                  >Subscribe</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="response.dialog" dark max-width="500px">
            <v-card
              style="
                font-family: Josefin, sans-serif;
                font-weight: bold;
                border: solid 1px #e67e22;
              "
            >
              <v-card-title style="word-break: normal;">
                {{ response.text }}
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue dark-1" text @click="response.dialog = false"
                  >Close</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import config from "../../../../config.json";

export default {
  name: "Home",
  data() {
    return {
      invite: `${config[process.env.VUE_APP_TYPE].api}/invite`,
      dialog: {
        btnLoading: false,
        dialog: false,
        submitted: false,
        name: "",
        email: "",
      },
      response: {
        dialog: false,
        text: "",
      },
    };
  },
  validations: {
    dialog: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    submit() {
      this.btnLoading = true;
      this.dialog.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      fetch(`${config[process.env.VUE_APP_TYPE].api}/api/newsletter`, {
        headers: {
          "Get-Auth": true,
        },
        method: "PUT",
      })
        .then((res) => res.json())
        .then((res) => {
          fetch(
            `${config[process.env.VUE_APP_TYPE].api}/api/newsletter?name=${
              this.dialog.name
            }&email=${this.dialog.email}`,
            {
              headers: {
                Auth: res.token,
              },
              method: "PUT",
            }
          )
            .then((res) => res.json())
            .then((res) => {
              this.dialog.btnLoading = false;
              this.dialog.dialog = false;
              if (res.success && res.status === 204) {
                this.response.text =
                  "This email is already registered for receiving newsletters!";
                this.response.dialog = true;
              } else if (res.success) {
                this.response.text =
                  "Success! Thanks for subscribing to VorteK Academy newsletters!";
                this.response.dialog = true;
              } else if (!res.success) {
                this.response.text = "Something went wrong!";
                this.response.dialog = true;
              }
            });
        });
    },
  },
  mounted() {
    const { access_token, refresh_token } = this.$route.query;
    if (access_token && refresh_token) {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      location.href = "/";
    }
  },
};
</script>

<style scoped>
@import "../assets/Fonts.css";

#invite {
  color: #eef0f2;
  font-size: 20px;
  transition: ease 0.5s;
}

#invite:hover {
  background-color: transparent !important;
  color: #ff9505;
}

#title {
  font-family: "Josefin", sans-serif !important;
}

.va-link {
  text-decoration: none !important;
  padding: 0 7px;
}

.va-info {
  border-radius: 10px !important;
}

.v-icon {
  font-size: 28px;
  color: #ff9505;
  transition: ease 0.5s;
}

.v-icon:hover {
  transform: scale(1.1);
}

.policy {
  color: #ff9505;
  margin: 0 10px;
}

.invalid-feedback {
  color: #e11b22;
}
</style>
