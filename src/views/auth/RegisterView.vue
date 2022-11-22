<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Register</div>

                    <form action=""  @submit="register()">
                        <div class="card-body">
                        <div class="row mb-3">
                            <label for="name" class="col-md-4 col-form-label text-md-end">Name</label>

                            <div class="col-md-6">
                                <input required id="name" :class="error.name ? 'is-invalid' : ''" v-model="formData.name"
                                    type="text" class="form-control " name="name" autocomplete="name">
                                <div class="invalid-feedback">
                                    {{ error.name }}
                                </div>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>

                            <div class="col-md-6">
                                <input required id="email" v-model="formData.email" :class="error.email ? 'is-invalid' : ''"
                                    type="email" class="form-control " name="email" autocomplete="email">
                                <div class="invalid-feedback">
                                    {{ error.email }}
                                </div>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="phone" class="col-md-4 col-form-label text-md-end">Phone</label>

                            <div class="col-md-6">
                                <input required id="phone" v-model="formData.phone" :class="error.phone ? 'is-invalid' : ''"
                                    type="tel" class="form-control " autocomplete="phone">
                                <div class="invalid-feedback">
                                    {{ error.phone }}
                                </div>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

                            <div class="col-md-6">
                                <input v-model="formData.password" :class="error.password ? 'is-invalid' : ''"
                                    id="password" type="password" class="form-control " name="password" required
                                    autocomplete="none">
                                <div class="invalid-feedback">
                                    {{ error.password }}
                                </div>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-end">Confirm
                                Password</label>

                            <div class="col-md-6">
                                <input v-model="formData.password_confirmation"
                                    :class="error.password_confirmation ? 'is-invalid' : ''" id="password-confirm"
                                    type="password" class="form-control" name="password_confirmation" required=""
                                    autocomplete="new-password">
                                <div class="invalid-feedback">
                                    {{ error.password_confirmation }}
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-end">Gender</label>
                            <div class="col-md-6 d-flex">
                                <div class="form-check me-3">
                                    <input v-model="formData.gender" class="form-check-input" value="male" type="radio"
                                        name="gender" id="male">
                                    <label class="form-check-label" for="male">
                                        Male
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input v-model="formData.gender" class="form-check-input" value="female"
                                        type="radio" name="gender" id="felmale">
                                    <label class="form-check-label" for="felmale">
                                        Female
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit"  class="btn btn-primary me-2">
                                    Register
                                </button>
                                <router-link to="/login" class="btn btn-dark">Back
                                    to Login</router-link>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
    name: 'RegisterView',
    data() {
        return {
            formData: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                phone: '',
                gender: 'male',
            },
            error: {
                name: false,
                email: false,
                password: false,
                password_confirmation: false,
                phone: false,
                gender: false,
            }
        }
    },
    methods: {
        validate() {
            this.formData.name == '' ? this.error.name = 'Name is required' : this.error.name = false;
            this.formData.email == '' ? this.error.email = 'Email is required' : this.error.email = false;
            this.formData.password == '' ? this.error.password = 'Password is required' : this.error.password = false;
            this.formData.password_confirmation == '' ? this.error.password_confirmation = 'Password_confirmation is required' : this.error.password_confirmation = false;
            this.formData.phone == '' ? this.error.phone = 'Phone is required' : this.error.phone = false;
        },
        register() {
            event.preventDefault()
            this.validate();
            console.log('trying');
            if (this.formCheck) {
                console.log(true);
                axios.post(this.api + '/user/register', this.formData).then(r => {
                    console.log(r);
                    if (r.data.error) {
                        let errorText = '';
                        r.data.error.forEach(e => {
                            errorText += e;
                        });
                        this.$swal('Error', errorText, 'error');
                    }
                    if (r.data.success) {
                        this.$store.dispatch('tokenStore', r.data.success.token);
                        this.$store.dispatch('getUserData');
                        this.$router.push('/');
                    }
                })
            }
        }
    },
    computed: {
        ...mapState(['api',]),
        formCheck() {
            if (this.error.name == false && this.error.email == false && this.error.password == false
                && this.error.password_confirmation == false && this.error.phone == false) {
                console.log(true);
                return true;
            }
            console.log(false);
            return false;
        }
    },
}
</script>

<style lang="scss" scoped>

</style>