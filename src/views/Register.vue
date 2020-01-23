<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100 md-with-hover">
        <md-card-header>
          <div class="md-title">
            <span style="color:blue">F</span>
            <span style="color:red">u</span>
            <span style="color:yellow">n</span>
            <span style="color:blue">d</span>
            <span style="color:green">o</span>
            <span style="color:red">o</span>
          </div>
          <div class="md-subtitle">Create your Fundoo Account</div>
        </md-card-header>
        <div>
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('firstName')">
                  <label for="first-name">First Name</label>
                  <md-input
                    name="first-name"
                    id="first-name"
                    autocomplete="given-name"
                    v-model="form.firstName"
                    :disabled="sending"
                  />
                  <span
                    class="md-error"
                    v-if="!$v.form.firstName.required"
                  >The first name is required</span>
                  <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('lastName')">
                  <label for="last-name">Last Name</label>
                  <md-input
                    name="last-name"
                    id="last-name"
                    autocomplete="family-name"
                    v-model="form.lastName"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
                  <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
                </md-field>
              </div>
            </div>

            <md-field :class="getValidationClass('email')">
              <label for="email">Email</label>
              <md-input
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                v-model="form.email"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
              <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
            </md-field>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('password')">
                  <label for="last-name">Password</label>
                  <md-input
                    type="password"
                    name="password"
                    id="password"
                    autocomplete="password"
                    v-model="form.password"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
                  <span class="md-error" v-else-if="!$v.form.password.minlength">Invalid password</span>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('confirm')">
                  <label for="last-name">Confirm</label>
                  <md-input
                    type="password"
                    name="confirm"
                    id="confirm"
                    autocomplete="confirm"
                    v-model="form.confirm"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.confirm.required">The confirm is required</span>
                  <span class="md-error" v-else-if="!$v.form.confirm.minlength">Invalid confirm</span>
                </md-field>
              </div>
            </div>
          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />
        </div>

        <md-card-actions>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-button type="submit" class="md-primary" :disabled="sending">Sign in instead</md-button>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-button
                type="submit"
                class="md-dense md-raised md-primary"
                :disabled="sending"
              >Next</md-button>
            </div>
          </div>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirm: null
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        maxLength: maxLength(8)
      },
      confirm: {
        required

        // target:password
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.email = null;
      this.form.password = null;
      this.form.confirm = null;
    },
    saveUser() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`;
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },

    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.md-card {
  margin-left: 400px;
  margin-top: 150px;
}
.md-card-header {
  text-align: left;
  font-size: 150%;
}
.md-card-media {
  margin-top: 9px;
  width: 300px;
  height: 300px;
}
.md-card-content {
  text-align: left;
  font-size: 150%;
}
</style>