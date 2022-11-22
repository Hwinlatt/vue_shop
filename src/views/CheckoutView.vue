<template>
    <div>
        <div class="container-fluid">
            <div class="row px-xl-5">
                <div class="col-12">
                    <nav class="breadcrumb bg-light mb-30">
                        <a class="breadcrumb-item text-dark" href="#">Home</a>
                        <a class="breadcrumb-item text-dark" href="#">Shop</a>
                        <span class="breadcrumb-item active">Checkout</span>
                    </nav>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <form @submit="placeOrder()">
                <div class="row px-xl-5">
                    <div class="col-lg-8">
                        <h5 class="section-title position-relative text-uppercase mb-3"><span
                                class="bg-secondary pr-3">Billing Address</span></h5>
                        <div class="bg-light p-30 mb-5">
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Name</label>
                                    <input required :value="userInfo.name" readonly class="form-control" type="text"
                                        placeholder="John">
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>E-mail</label>
                                    <input required readonly :value="userInfo.email" class="form-control" type="text"
                                        placeholder="example@email.com">
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Mobile No-1</label>
                                    <input required v-model="userData.phone_1" class="form-control" type="tel"
                                        placeholder="+123 456 789">
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Mobile No-2</label>
                                    <input required v-model="userData.phone_2" class="form-control" type="tel"
                                        placeholder="+123 456 789">
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>City</label>
                                    <select required @change="changeTown()" v-model="userData.city"
                                        class="custom-select">
                                        <option value="">Please Select City..</option>
                                        <option :value="city.toLowerCase()" v-for="(city, index) in cities"
                                            :key="index">{{ city }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Township</label>
                                    <select required v-model="userData.township" class="custom-select">
                                        <option value="">Please Select Township..</option>
                                        <option :value="town.toLowerCase()" v-for="(town, index) in getTownship()"
                                            :key="index">{{ town }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-12 form-group">
                                    <label>payment</label>
                                    <select required v-model="userData.payment" class="custom-select">
                                        <option value="cach">Cach</option>
                                        <option value="wave pay">Wave Pay</option>
                                        <option value="kpay">Kpay</option>
                                    </select>
                                </div>
                                <div class="col-md-12 form-group">
                                    <label>Address</label>
                                    <textarea required v-model="userData.address" rows="6"
                                        class="form-control"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <h5 class="section-title position-relative text-uppercase mb-3"><span
                                class="bg-secondary pr-3">Order Total</span></h5>
                        <div class="bg-light p-30 mb-5">
                            <div class="border-bottom">
                                <h6 class="mb-3">Products</h6>
                                <div v-for="(cart, index) in carts" :key="index" class="d-flex justify-content-between">
                                    <p class="col-7">{{ cart.name }} x {{ cart.qty }}</p>
                                    <p>{{ getProductInfo(cart.information, 'price') * cart.qty }}</p>
                                </div>
                            </div>
                            <div class="border-bottom pt-3 pb-2">
                                <div class="d-flex justify-content-between mb-3">
                                    <h6>Subtotal</h6>
                                    <h6>{{ getsubTotal }} MMK</h6>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <h6 class="font-weight-medium">Delivery Fee</h6>
                                    <h6 class="font-weight-medium">{{ userData.deliveryFee }} MMK</h6>
                                </div>
                            </div>
                            <div class="pt-2">
                                <div class="d-flex justify-content-between mt-2">
                                    <h5>Total</h5>
                                    <h5>{{ getsubTotal + userData.deliveryFee }}</h5>
                                </div>
                            </div>
                        </div>
                        <div class="mb-5">
                            <div class="bg-light p-30">
                                <button :disabled="!dataStatus"
                                    class="btn btn-block btn-primary font-weight-bold py-3">Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapState } from 'vuex';
export default {
    name: 'CheckoutView',
    data() {
        return {
            carts: [],
            userData: {
                phone_1: '',
                phone_2: '',
                city: '',
                township: '',
                deliveryFee: 0,
                address: '',
                payment: 'cach'
            },
            townships: {
                yangon: ['North Okkalapa', 'South Okkalapa', 'Bahan', 'Mayangyone', 'Thingangyun', 'Thakatha', 'Lamadaw'],
                bago: ['OkaPho', 'ThanatPin']
            },
            cities: ['Yangon', 'Bago']
        }
    },
    methods: {
        getOldDetail() {
            axios.get(this.api + '/order/old_detail', this.authHeader).then(r => {
                if (r.data) {
                    this.userData.phone_2 = r.data.phone_2;
                    let address = r.data.city.split(',');
                    this.userData.city = address[0].trim();
                    this.changeTown();
                    this.userData.township = address[1].trim();
                    this.userData.address = r.data.address;
                }
            });
        },
        getCarts() {
            axios.post(this.api + '/cart', {}, this.authHeader).then(r => {
                this.carts = r.data;
                this.userData.phone_1 = this.userInfo.phone;

            })
        },
        getProductInfo(info, text) {
            const infos = JSON.parse(info);
            let value = '';
            for (let i = 0; i < infos.length; i++) {
                if (infos[i].key.toLowerCase() == text) {
                    value = infos[i].value;
                    break;
                }
            }
            return value;
        },
        changeTown() {
            this.userData.township = '';
            if (this.userData.city == 'yangon') {
                this.userData.deliveryFee = 3000
            } else if (this.userData.city == 'bago') {
                this.userData.deliveryFee = 5000
            } else if (this.userData.city == '') {
                this.userData.deliveryFee = 0
            }
        },
        getTownship() {
            if (this.userData.city == 'yangon') {
                return this.townships.yangon;
            } else if (this.userData.city == 'bago') {
                return this.townships.bago;
            }
        },
        placeOrder() {
            event.preventDefault();
            if (this.isActive) {
                axios.post(this.api + '/order/add', this.userData, this.authHeader).then(r => {
                    if (r.data.success) {
                        this.$swal.fire('Success', 'Order Created.', 'success');
                        this.$router.push('/shop');
                        this.$store.dispatch('getCartQty');
                    }
                    if (r.data.error) {
                        let errText = '';
                        r.data.error.forEach(err => {
                            errText += err;
                            if (err == 'Please activate account first!') {
                                this.$router.push('/otp_confirm')
                            }
                        });
                        this.$swal.fire('Error', errText, 'error');
                    }
                })
            }else{
                this.$router.push('/otp_confirm')
            }

        }
    },
    computed: {
        ...mapState(['api', 'userInfo']),
        ...mapGetters(['authHeader', 'isActive']),
        getsubTotal() {
            let value = 0;
            this.carts.forEach(cart => {
                value += cart.qty * this.getProductInfo(cart.information, 'price');
            });
            return value;
        },
        dataStatus() {
            if (this.userData.phone_1 == '' || this.userData.phone_2 == '' || this.userData.city == '' || this.userData.township == '' ||
                this.userData.deliveryFee == 0 || this.userData.address == ''
            ) {
                return false;
            } else {
                return true;
            }

        }
    },
    mounted() {
        this.getCarts();
        this.getOldDetail();
    },
}
</script>

<style lang="scss" scoped>

</style>