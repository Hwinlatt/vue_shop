<template>
    <!-- Topbar Start -->
    <div class="container-fluid">
        <div class="row bg-secondary py-1 px-xl-5">
            <div class="col-lg-6 d-none d-lg-block">
                <div class="d-inline-flex align-items-center h-100">
                    <a class="text-body mr-3" href="">About</a>
                    <a class="text-body mr-3" href="">Contact</a>
                    <a class="text-body mr-3" href="">Help</a>
                    <a class="text-body mr-3" href="">FAQs</a>
                </div>
            </div>
            <div class="col-lg-6 text-center text-lg-right">
                <div class="d-inline-flex align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">{{
                                userInfo.name
                        }}</button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <router-link v-if="!isLogin" to="/login" class="dropdown-item" type="button">Sign in
                            </router-link>
                            <router-link v-if="!isLogin" to="/register" class="dropdown-item" type="button">Sign up
                            </router-link>
                            <span v-if="isLogin" @click="this.$router.push('/profile')" class="dropdown-item profileBtn"
                                type="button"><i class="fa-solid fa-user"></i> Profile</span>
                            <span v-if="isLogin" @click="logout()" class="dropdown-item logoutBtn" type="button"><i
                                    class="fa-solid fa-power-off"></i> Logout</span>
                        </div>
                    </div>
                    <div class="btn-group mx-2">
                        <button type="button" class="btn btn-sm btn-light dropdown-toggle"
                            data-toggle="dropdown">USD</button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <button class="dropdown-item" type="button">EUR</button>
                            <button class="dropdown-item" type="button">GBP</button>
                            <button class="dropdown-item" type="button">CAD</button>
                        </div>
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-light dropdown-toggle"
                            data-toggle="dropdown">EN</button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <button class="dropdown-item" type="button">FR</button>
                            <button class="dropdown-item" type="button">AR</button>
                            <button class="dropdown-item" type="button">RU</button>
                        </div>
                    </div>
                </div>
                <div class="d-inline-flex align-items-center d-block d-lg-none">
                    <a href="" class="btn px-0 ml-2">
                        <i class="fas fa-heart text-dark"></i>
                        <span class="badge text-dark border border-dark rounded-circle"
                            style="padding-bottom: 2px;">0</span>
                    </a>
                    <router-link to="/cart" class="btn px-0 ml-2">
                        <i class="fas fa-shopping-cart text-dark"></i>
                        <span class="badge text-dark border border-dark rounded-circle" style="padding-bottom: 2px;">{{
                                navBar.cartQty
                        }}</span>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
            <div class="col-lg-4">
                <a href="" class="text-decoration-none">
                    <span class="h1 text-uppercase text-primary bg-dark px-2">Vue</span>
                    <span class="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Shop</span>
                </a>
            </div>
            <div class="col-lg-4 col-6 text-left">
                <div class="input-group">
                    <input v-model="searchKey" @keypress.enter="search()" type="text" class="form-control"
                        placeholder="Search for products">
                    <div class="input-group-append">
                        <span @click="search()" style="cursor: pointer;"
                            class="input-group-text bg-transparent text-primary">
                            <i class="fa fa-search"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-6 text-right">
                <p class="m-0">Customer Service</p>
                <h5 class="m-0">+012 345 6789</h5>
            </div>
        </div>
    </div>
    <!-- Topbar End -->

</template>

<script>
import axios from 'axios'
import { mapGetters, mapState } from 'vuex'
export default {
    name: 'TopBar',
    data() {
        return {
            searchKey: '',
        }
    },
    methods: {
        logout() {
            axios.post(this.api + '/user/logout', {}, this.authHeader).then(r => {
                console.log(r.data);
                if (r.data.success) {
                    localStorage.removeItem('token');
                    location.reload();
                }
            }).catch(err => console.log(err))
        },
        search() {
            this.$store.state.shopView.isLoading = true;
            this.$store.state.shopView.shops = [];
            this.$store.state.shopView.products = [];
            this.$store.state.shopView.searchKey = this.searchKey;
            if (this.searchKey.length > 0) {
                axios.get(this.api + '/shop/' + this.searchKey).then(r => {
                    this.$store.state.shopView.shops = r.data.shops;
                    this.$store.state.shopView.products = r.data.products;
                    this.$router.push('/shop');
                    console.log(this.$store.state.shopView);
                    this.$store.state.shopView.isLoading = false;
                }).catch(err => {
                    console.log(err);
                    this.$store.state.shopView.isLoading = false
                    this.$swal.fire(
                        'The Internet?',
                        'That thing is still around?',
                        'question'
                    )
                })
            } else {
                this.$store.state.shopView.isLoading = false;
            }
        }
    },
    computed: {
        ...mapState(['userInfo', 'api', 'navBar']),
        ...mapGetters(['isLogin', 'authHeader']),
    },
    mounted() {
        if (this.userToken) {
            this.$store.dispatch('getCartQty');
        }
    },
}
</script>

<style lang="scss" scoped>
.logoutBtn:hover{
    color: red;
}
.profileBtn:hover{
    color:#FFC800;
}
</style>