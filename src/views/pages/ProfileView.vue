<template>
    <div class="container-xl px-4 mt-4">
        <!-- Account page navigation-->
        <nav class="nav nav-borders">
            <router-link class="nav-link active ms-0" to="/profile">Profile</router-link>
        </nav>
        <hr class="mt-0 mb-4">
        <div class="row">
            <div class="col-xl-4">
                <!-- Profile picture card-->
                <div class="card mb-4 mb-xl-0">
                    <div class="card-header">Profile Picture</div>
                    <div class="card-body text-center">
                        <!-- Profile picture image-->
                        <img v-if="userInfo.profile_photo_path" class="img-account-profile rounded-circle mb-2"
                            :src="imagePath + userInfo.profile_photo_path" alt="">
                        <img v-else class="img-account-profile rounded-circle mb-2" :src="server + 'img/def_user.webp'"
                            alt="">
                        <!-- Profile picture help block-->
                        <div class="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                        <!-- Profile picture upload button-->
                        <label for="profile_image" class="btn btn-primary" type="button">Upload new image</label>
                        <input @change="uploadImage($event)" id="profile_image" class="d-none" type="file">
                    </div>
                </div>
            </div>
            <div class="col-xl-8">
                <!-- --Loading Card --  -->
                <div v-if="isLoading" class="card" aria-hidden="true">
                    <div class="card-body">
                        <h5 class="card-title placeholder-glow">
                            <span class="placeholder col-6"></span>
                        </h5>
                        <p class="card-text placeholder-glow">
                            <span class="placeholder col-7"></span>
                            <span class="placeholder col-4"></span>
                            <span class="placeholder col-4"></span>
                            <span class="placeholder col-6"></span>
                            <span class="placeholder col-8"></span>
                        </p>
                        <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
                    </div>
                </div>
                <!-- Account details card-->
                <div v-else class="card mb-4">
                    <div class="card-header">Account Details</div>
                    <div class="card-body">
                        <!-- Form Group (username)-->
                        <div class="mb-3">
                            <label class="small mb-1" for="inputUsername">Username (how your name will appear to
                                other users on the site)</label>
                            <input class="form-control" id="inputUsername" type="text" placeholder="Enter your username"
                                v-model="formData.name">
                        </div>
                        <!-- Form Group (email address)-->
                        <div class="mb-3">
                            <label class="small mb-1" for="inputEmailAddress">Email address</label>
                            <input class="form-control" id="inputEmailAddress" type="email"
                                placeholder="Enter your email address" v-model="formData.email">
                        </div>
                        <!-- Form Row-->
                        <div class="row gx-3 mb-3">
                            <!-- Form Group (phone number)-->
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputPhone">Phone number</label>
                                <input class="form-control" id="inputPhone" type="tel"
                                    placeholder="Enter your phone number" v-model="formData.phone">
                            </div>
                            <!-- Form Group (birthday)-->
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputGender">Gender</label>
                                <select id="inputGender" v-model="formData.gender" class="form-select">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <!-- Save changes button-->
                        <button class="btn btn-primary" @click="saveInfo()" type="button">Save changes</button>
                        <hr class="my-3">
                        <div class="">
                            <div class="mb-3">
                                <label class="small mb-1" for="inputUpdatePassword"><i class="fa-solid fa-key"></i> Update Password</label>
                                <input v-model="updatePassword" class="form-control" id="inputUpdatePassword" type="text"
                                    placeholder="Enter your new password">
                            </div>
                            <button  @click="passwordUpdate()" class="btn btn-primary">Updated Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { mapGetters, mapState } from 'vuex'
export default {
    name: 'ProfileView',
    data() {
        return {
            formData: {
                name: '',
                email: '',
                phone: '',
                gender: '',
            },
            isLoading: false,
            updatePassword:''
        }
    },
    methods: {
        showpopup(data, text) {
            if (data.success) {
                this.$swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: text,
                    showConfirmButton: false,
                    timer: 1000
                })
                this.$store.dispatch('getUserData');
            }
            if (data.error) {
                let errorText = '';
                data.error.forEach(err => {
                    errorText += err;
                });
                this.$swal.fire('Error', errorText, 'error');
            }
        },
        uploadImage(event) {
            let file = event.target.files[0];
            let file_type = file.type.split('/');
            if (file_type[0] != 'image') {
                this.$swal.fire('Error', 'Data type must be image!', 'error');
                return;
            }
            let formData = {
                image: file,
            }
            axios.post(this.api + '/user/image_change', formData, this.authHeader).then(r => {
                this.showpopup(r.data, 'Profile photo updated.');
            });
        },
        formDataChange() {
            this.formData = {
                name: this.userInfo.name,
                email: this.userInfo.email,
                phone: this.userInfo.phone,
                gender: this.userInfo.gender,
            }
        },
        saveInfo() {
            axios.post(this.api + '/user/update', this.formData, this.authHeader).then(r => {
                this.showpopup(r.data, 'Profile information updated.');
            })
        },
        passwordUpdate(){
            let data = {password:this.updatePassword}
            axios.post(this.api+'/user/update_password',data,this.authHeader).then(r=>{
                this.showpopup(r.data,'Password Updated');
                if (r.data) {
                    this.updatePassword = ''
                }
            })
        }
    },
    computed: {
        ...mapState(['api', 'server', 'userInfo', 'imagePath']),
        ...mapGetters(['authHeader']),
        name() {
            return this.data
        }
    },
    mounted() {
        if (this.userInfo.name == 'My Account') {
            this.isLoading = true;
            setTimeout(() => {
                this.formDataChange();
                this.isLoading = false;
            }, 2000);
        } else {
            this.formDataChange();
        }

    },

}
</script>

<style lang="scss" scoped>
body {
    margin-top: 20px;
    background-color: #f2f6fc;
    color: #69707a;
}

.img-account-profile {
    height: 10rem;
}

.rounded-circle {
    border-radius: 50% !important;
}

.card {
    box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);
}

.card .card-header {
    font-weight: 500;
}

.card-header:first-child {
    border-radius: 0.35rem 0.35rem 0 0;
}

.card-header {
    padding: 1rem 1.35rem;
    margin-bottom: 0;
    background-color: rgba(33, 40, 50, 0.03);
    border-bottom: 1px solid rgba(33, 40, 50, 0.125);
}

.form-control,
.dataTable-input {
    display: block;
    width: 100%;
    padding: 0.875rem 1.125rem;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1;
    color: #69707a;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #c5ccd6;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.35rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.nav-borders .nav-link.active {
    color: #0061f2;
    border-bottom-color: #0061f2;
}

.nav-borders .nav-link {
    color: #69707a;
    border-bottom-width: 0.125rem;
    border-bottom-style: solid;
    border-bottom-color: transparent;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0;
    padding-right: 0;
    margin-left: 1rem;
    margin-right: 1rem;
}
</style>