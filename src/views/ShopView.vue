<template>
    <div class="container" style="min-height: 80vh;">
        <div class="text-center my-5 py-5" v-if="shopView.isLoading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else>
            <div class="container-fluid pt-5" v-if="shopView.shops.length > 0">
                <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span
                        class="bg-secondary pr-3">Shops</span></h2>
                <div class="row px-xl-5 pb-3">
                    <div v-for="(shop, index) in shopView.shops" :key="index" class="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <a class="text-decoration-none" @click="goToShopPage(shop.id,shop.name)">
                            <div class="cat-item d-flex align-items-center mb-4">
                                <div class="overflow-hidden" style="width: 100px; height: 100px;">
                                    <img class="img-fluid" :src="imagePath + shop.profile_photo_path" alt="">
                                </div>
                                <div class="flex-fill pl-3">
                                    <h6>{{ shop.name }}</h6>
                                    <small class="text-body">{{ shop.total_product }} Products</small>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="container-fluid pt-5 pb-3" v-if="shopView.products.length > 0">
                <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span
                        class="bg-secondary pr-3">Products</span></h2>
                <div class="row px-xl-5">
                    <div class="col-md-4 pb-1" v-for="(product, index) in shopView.products" :key="index">
                        <div class="product-item bg-light mb-4">
                            <div class="product-img position-relative overflow-hidden">
                                <img class="img-fluid w-100"  style="height:300px;object-fit:contain" :src="imagePath + product.image" alt="">
                                <div class="product-action">
                                    <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                    <a class="btn btn-outline-dark btn-square" @click="productView(product.id)"
                                        href=""><i class="fa-solid fa-ellipsis"></i></a>
                                    <!-- <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a> -->
                                </div>
                            </div>
                            <div class="text-center py-4">
                                <a class="h6 text-decoration-none text-truncate" href="">{{ product.name }}</a>
                                <div class="d-flex align-items-center justify-content-center mt-2">
                                    <h5>{{ getProductPrice(product.information) }}</h5>
                                    <h6 class="text-muted ml-2"><del>$123.00</del></h6>
                                </div>
                                <div class="d-flex align-items-center justify-content-center mb-1">
                                    <small class="fa fa-star text-primary mr-1"></small>
                                    <small class="fa fa-star text-primary mr-1"></small>
                                    <small class="fa fa-star text-primary mr-1"></small>
                                    <small class="fa fa-star text-primary mr-1"></small>
                                    <small class="fa fa-star text-primary mr-1"></small>
                                    <small>(99)</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="searchStatus == '1'">
                <div class="d-flex justify-content-center ">
                    <img style="width:300px;height:300px" class=" rounded rounded-circle   shadow-lg text-center"
                        src="../../public/img/shop_emoji.webp" alt="" srcset="">
                </div>
                <h1 class="text-center"><i class="fa-solid fa-keyboard"></i> Please Enter the Key to Search</h1>
            </div>
            <div v-else-if="searchStatus == '2'">
                <div class="d-flex justify-content-center">
                    <img style="width:300px;height:300px" class="rounded rounded-circle shadow-lg text-center"
                        src="../../public/img/sad-emoji.jpg" alt="" srcset="">
                </div>
                <h1 class="text-center">There is nothing to Show concern with <code>{{ shopView.searchKey }}</code></h1>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "ShopView",
    methods: {
        getProductPrice(key) {
            const infos = JSON.parse(key);
            let value = '';
            for (let i = 0; i < infos.length; i++) {
                if (infos[i].key.toLowerCase() == 'price') {
                    value = infos[i].value;
                    break;
                }
            }
            return value;
        },
        productView(id) {
            event.preventDefault();
            this.$router.push('/shop/products/' + id)
        },
        goToShopPage(id,name){
            event.preventDefault();
            this.$router.push(`/shopPage/${id}/${name}`)
        }
    },
    mounted() {
        this.$store.state.activePage = 'shop';
    },
    computed: {
        ...mapState(['shopView', 'imagePath']),
        searchStatus() {
            if (this.shopView.searchKey.length == 0) {
                return '1'
            }
            if (this.shopView.shops.length == 0 && this.shopView.products.length == 0 && this.shopView.isLoading == false) {
                return '2'
            }
            return false;
        }
    },
}
</script>

<style lang="scss" scoped>

</style>