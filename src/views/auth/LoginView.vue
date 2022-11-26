<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">
                        <input type="hidden" name="_token" value="P5MJixiFLz3vCcQYeSHow5k9YbzgEWTEpZ5wrYo2">
                        <div class="row mb-3">
                            <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>
                            <div class="col-md-6">
                                <input id="email" :class="error.email ? 'is-invalid' : ''"
                                    placeholder="Enter email address" v-model="formData.email" type="email"
                                    class="form-control" autocomplete="none">
                                <div class="invalid-feedback">
                                    {{ error.email }}
                                </div>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>
                            <div class="col-md-6">
                                <input @keypress.enter="loginProcess()" id="password" :class="error.password ? 'is-invalid' : ''"
                                    placeholder="Enter password" v-model="formData.password" type="password"
                                    class="form-control" autocomplete="none">
                                <div class="invalid-feedback">
                                    {{ error.password }}
                                </div>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember">

                                    <label class="form-check-label" for="remember">
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button @click="loginProcess()" type="button" class="btn btn-primary me-2">
                                    Login
                                </button>
                                <router-link to="/register" class="btn btn-link">Sing
                                    Up Now</router-link>
                                <a class="btn btn-link" href="http://laravelshop-001-site1.etempurl.com/password/reset">
                                    <span class="text-dark">Forgot Your Password?</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
    name: 'LoginView',
    data() {
        return {
            formData: {
                email: '',
                password: '',
            },
            error: {
                email: false,
                password: false
            }
        }
    },
    methods: {
        loginProcess() {
            this.formValidate();
            if (!this.error.email && !this.error.password) {
                axios.post(this.api + '/user/login', this.formData).then(r => {
                    if (r.data.success) {
                        this.$store.dispatch('tokenStore',r.data.success.token);
                        this.$store.dispatch('getUserData');
                        this.$store.dispatch('getCartQty');
                        this.$router.push('/');
                    }
                    if (r.data.error) {
                        let error='';
                        r.data.error.forEach(e => {
                            error += e;
                        });
                        this.$swal.fire('Error', error, 'error');
                    }
                })
            }
        },
        formValidate() {
            this.formData.email == '' ? this.error.email = 'Email is required' : this.error.email = false;
            this.formData.password == '' ? this.error.password = 'Email is required' : this.error.password = false;
            this.formData.password.length < 8 ? this.error.password = 'Minium password length is 8 characters' : this.error.password = false;
        }
    },
    computed: {
        ...mapState(['api']),
        name() {
            return this.data
        }
    },
}
</script>

<style lang="scss" scoped>

</style>