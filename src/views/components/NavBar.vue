<template>
    <div class="container-fluid bg-dark mb-30">
        <div class="row px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <a class="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse"
                    href="#navbar-vertical" style="height: 65px; padding: 0 30px;">
                    <h6 class="text-dark m-0"><i class="fa fa-bars mr-2"></i>Categories</h6>
                    <i class="fa fa-angle-down text-dark"></i>
                </a>
                <nav class="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
                    id="navbar-vertical" style="width: calc(100% - 30px); z-index: 999;">
                    <div class="navbar-nav w-100">
                        <div class="nav-item dropdown dropright">
                            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Dresses <i
                                    class="fa fa-angle-right float-right mt-1"></i></a>
                            <div class="dropdown-menu position-absolute rounded-0 border-0 m-0">
                                <a href="" class="dropdown-item">Men's Dresses</a>
                                <a href="" class="dropdown-item">Women's Dresses</a>
                                <a href="" class="dropdown-item">Baby's Dresses</a>
                            </div>
                        </div>
                        <a href="" class="nav-item nav-link">Shirts</a>
                    </div>
                </nav>
            </div>
            <div class="col-lg-9">
                <nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                    <a href="" class="text-decoration-none d-block d-lg-none">
                        <span class="h1 text-uppercase text-dark bg-light px-2">Vue</span>
                        <span class="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                    </a>
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div class="navbar-nav mr-auto py-0">
                            <router-link to="/" :class="activePage == 'home' ? 'active' : ''"
                                class="nav-item nav-link ">
                                Home</router-link>
                            <router-link to="/shop" :class="activePage == 'shop' ? 'active' : ''"
                                class="nav-item nav-link">
                                Shop</router-link>
                            <router-link :to="'/shop/products/' + productView.lastSeen"
                                :class="activePage == 'productDetail' ? 'active' : ''" class="nav-item nav-link">Shop
                                Detail
                            </router-link>
                            <router-link to="/orders" :class="activePage == 'orders' ? 'active' : ''"
                                class="nav-item nav-link">My Orders</router-link>
                        </div>
                        <div class="navbar-nav ml-auto py-0 d-none d-lg-block">
                            <a href="" class="btn px-0">
                                <i class="fas fa-heart text-primary"></i>
                                <span class="badge text-secondary border border-secondary rounded-circle"
                                    style="padding-bottom: 2px;">0</span>
                            </a>
                            <router-link to="/cart" class="btn px-0 ml-3">
                                <i class="fas fa-shopping-cart text-primary"></i>
                                <span class="badge text-secondary border border-secondary rounded-circle"
                                    style="padding-bottom: 2px;">{{ navBar.cartQty }}</span>
                            </router-link>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NavBar',
    data() {
        return {
        }
    },
    computed: {
        ...mapState(['activePage', 'productView', 'userToken', 'navBar']),
    },
    mounted() {
        this.$store.dispatch('getUserData');
        if (this.userToken) {
            this.$store.dispatch('getCartQty');
        }
    },
    updated () {
        this.$store.dispatch('getUserData');
    },
}
</script>

<style lang="scss" scoped>

</style>