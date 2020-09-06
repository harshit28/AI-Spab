<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <img src="favicon.png" height="50px" width="50px">

        AI Spab
      </h5>
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Register</h3>" customHeader>
        <p class="widget-auth-info">
            Use your email to sign in.
        </p>
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <div class="form-group">
            <input class="form-control no-border" ref="name" required type="text" name="name" placeholder="Name" />
          </div>
          <div class="form-group">
            <input class="form-control no-border" ref="number" required type="text" name="phone" placeholder="Phone number" />
          </div>
          <div class="form-group">
            <textarea class="form-control no-border" ref="address" required type="text" name="text" placeholder="Address" />
          </div>
          <div class="form-group">
            <input class="form-control no-border" ref="email" required type="email" name="email" placeholder="Email" />
          </div>
          <div class="form-group">
            <input class="form-control no-border" ref="password" required type="password" name="password" placeholder="Password" />
          </div>
          <b-button type="submit" size="sm" class="auth-btn mb-3" variant="inverse">Register</b-button>
          
        </form>
        <p class="widget-auth-info">
          Already have an account? Login In now!
        </p>
        <router-link class="d-block text-center" to="login">Login</router-link>
      </Widget>
    </b-container>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';

export default {
  name: 'RegisterPage',
  components: { Widget },
  data() {
    return {
      errorMessage: null,
    };
  },
  methods: {
    login() {
      this.$router.push('login');
    },
  },
  created() {
    if (window.localStorage.getItem('authenticated') === 'true') {
      this.$router.push('/login');
    }
  },
};
</script>
