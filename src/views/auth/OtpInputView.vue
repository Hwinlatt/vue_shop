<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div v-if="isLoading" class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <span class="">Getting User Data</span>
                </div>
                <div v-if="!isLoading" class="card">
                    <small v-if="state==2" class="m-1">Otp Code is sent to {{ formData.email }}</small>
                    <div class="card-header"><span>Enter Email</span> <span>Enter OTP Code</span></div>
                    <div class="card-body">
                        <div v-if="state == 1">
                            <label for="">Email Address</label>
                            <input type="email" v-model="formData.email" placeholder="...@gmail.com"
                                class="form-control">
                            <div class="text-end">
                                <button v-if="otpRequesting" class="btn btn-primary mt-4" type="button" disabled>
                                    <span class="spinner-border spinner-border-sm" role="status"
                                        aria-hidden="true"></span>
                                    Loading...
                                </button>
                                <button v-else  @click="requestOtp()" class="btn btn-primary mt-4"
                                    :disabled="formData.email.length < 3">Request Otp</button>
                            </div>
                        </div>
                        <div v-if="state == 2">
                            <label for="">OtpCode</label>
                            <input type="text" placeholder="######" v-model="formData.code" class="form-control"
                                autocomplete="none" maxlength="6">
                            <button @click="requestOtp()" :disabled="resentOtpTime > 0" class="btn btn-link mt-4">Resent
                                Otp <span v-if="resentOtpTime > 0">{{ resentOtpTime }}</span></button>
                            <button class="btn btn-primary mt-4 float-end" @click="submitOtp()">Submit </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapState } from 'vuex'
export default {
    name: "OtpInputView",
    data() {
        return {
            formData: {
                email: '',
                code: ''
            },
            state: 1,
            isLoading: true,
            resentOtpTime: 10,
            otpRequesting:false,
        }
    },
    methods: {
        requestOtp() {
            this.otpRequesting = true;
            axios.post(this.api + '/req_otp_code', this.formData, this.authHeader).then(r => {
                if (r.data.success) {
                    this.state = 2;
                    this.resentOtpCount();
                    this.otpRequesting = false;
                }
            }).catch(err=>this.otpRequesting = false);
        },
        resentOtpCount() {
            this.resentOtpTime = 15;
            let count = setInterval(() => {
                this.resentOtpTime--;
                if (this.resentOtpTime == 0) {
                    clearInterval(count);
                }
            }, 1000);
        },
        submitOtp() {
            axios.post(this.api + '/otp/submit', this.formData, this.authHeader).then(r => {
                if (r.data.success) {
                    this.$store.dispatch('getUserData');
                    this.$swal.fire('Success', 'Otp Code is right.', 'success');
                    this.$router.go(-1)
                } else if (r.data.error) {
                    let errorText = '';
                    r.data.error.forEach(e => {
                        errorText += e;
                    });
                    this.$swal.fire('Error', errorText, 'error');
                }
            });
        }
    },
    computed: {
        ...mapState(['userInfo', 'api']),
        ...mapGetters(['authHeader']),
    },
    mounted() {
        setTimeout(() => {
            this.formData.email = this.userInfo.email;
            this.isLoading = false
        }, 2000);
    },
}
</script>

<style lang="scss" scoped>

</style>