<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
           <div class="md-title">
            <span style="color:blue">F</span>
            <span style="color:red">u</span>
            <span style="color:yellow">n</span>
            <span style="color:blue">d</span>
            <span style="color:green">o</span>
            <span style="color:red">o</span>
          </div>  
          <div class="md-subtitle">Sign In</div>
        </md-card-header>

        <md-card-content>
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
          <md-field :class="getValidationClass('password')">
            <label for="password">Password</label>
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
             <md-button to="./ForgotPassword" class="md-primary">Forgot Password?</md-button>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-button type="submit" class="md-primary" :disabled="sending">Create account</md-button>
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

      <md-snackbar :md-active.sync="userSaved">The user {{ loginUser }} successfully login!</md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null
    },
    userSaved: false,
    sending: false
  }),
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
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
      this.form.email = null;
      this.form.password = null;
    },
    saveUser() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.loginUser = `${this.form.email} `;
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
  text-align: center;
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