<template>
    <div class="row px-xl-5">
        <div class="row px-xl-5">
            <div class="col-md-8">
                <div id="header-carousel" class="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li v-for="index in shop.slideShows.length" :key="index" data-target="#header-carousel"
                            :data-slide-to="index - 1" :class="{ active: index == 1 }"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div v-for="(slide, index) in shop.slideShows" :key="index"
                            class="carousel-item position-relative" :class="{ active: index == 0 }"
                            style="height: 430px;">
                            <img class="position-absolute w-100 h-100" :src="imagePath + slide.image"
                                style="object-fit: cover;">
                            <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div class="p-3" style="max-width: 700px;">
                                    <h1 class="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                                        {{ slide.title }}
                                    </h1>
                                    <p style="height:150px;overflow: auto;"
                                        class="mx-md-5 px-5 animate__animated animate__bounceIn">{{ slide.description }}
                                    </p>
                                    <a v-if="slide.link"
                                        class="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                                        :href="slide.link">Go To</a>
                                    <a class="btn btn-link py-2 px-4 mt-3 animate__animated animate__fadeInUp rounded"
                                        :href="imagePath + slide.image">View Image</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="product-offer mb-30" style="height: 200px;">
                    <img class="img-fluid" style="object-fit:contain" :src="imagePath + shop.info.profile_photo_path"
                        alt="">
                </div>
                <div class="product-offer mb-30" style="">
                    <div class="card">
                        <div class="card-header">
                            <h1 class="text-center">{{ shop.info.name }}</h1>
                        </div>
                        <div class="card-body">
                            <div class="row mb-3">
                                <div class="col-1"><i class="fa-solid fa-envelope"></i></div>
                                <div class="col"><a href="mailto:" class="text-danger">{{ shop.info.email }}</a></div>
                            </div>
                            <div class="row">
                                <div class="col-1"><i class="fa-solid fa-phone"></i></div>
                                <div class="col"><a href="tel:+" class="text-dark">{{ shop.info.phone }}</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ------ Categories ------  -->
        <div class="container-fluid pt-5">
            <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span
                    class="bg-secondary pr-3">Categories</span></h2>
            <div class="row px-xl-5 pb-1">
                <div v-for="(category, index) in shop.categories" :key="index" class="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <span style="cursor:pointer" @click="filterByCategory(category.id)">
                        <div class="cat-item d-flex align-items-center mb-4" :class="{'bg-primary':selectCat == category.id}">
                            <div class="flex-fill pl-3 my-2">
                                <h6>{{ category.name }}</h6>
                                <small class="text-body">{{ getCountProducts(category.id) }} Products</small>
                            </div>
                        </div>
                    </span>
                </div>
                <div v-if="shop.products.length != shopPage.products.length" class="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <span style="cursor:pointer"  @click="getShop()">
                        <div class="cat-item img-zoom d-flex align-items-center mb-4">
                            <div class="flex-fill pl-3 my-2">
                                <h6>All Categories</h6>
                                <small class="text-body">all Produts</small>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        </div>
        <!-- -----------------Prouducts---------------------- -->
        <div class="container-fluid pt-5 pb-3">
            <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span
                    class="bg-secondary pr-3">Products</span></h2>
            <div class="row px-xl-5">
                <div class="col-md-3 pb-1" v-for="(product, index) in shop.products" :key="index">
                    <div class="product-item bg-light mb-4">
                        <div class="product-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" style="height:300px;object-fit:contain"
                                :src="imagePath + product.image" alt="">
                            <div class="product-action">
                                <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                <a class="btn btn-outline-dark btn-square" @click="productView(product.id)" href=""><i
                                        class="fa-solid fa-ellipsis"></i></a>
                                <!-- <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a> -->
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <a class="h6 text-decoration-none text-truncate" href="">{{ product.name }}</a>
                            <div class="d-flex align-items-center justify-content-center mt-2">
                                <h5>{{ getProductPrice(product.information) }} MMK</h5>
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
            <div class="d-flex justify-content-center">
                <!-- <nav aria-label="Page navigation example mt-5">
                    <ul class="pagination">
                        <li v-for="(link, index) in shop.products.links" :key="index" class="page-item"
                            :class="{ active: link.active, 'd-none': nextPrev(shop.products, index) }">
                            <span class="page-link text-dark" @click="getShop(link.url)" style="cursor:pointer">
                                <span v-if="index == 0">Back</span>
                                <span v-else-if="index + 1 == shop.products.links.length">Next</span>
                                <span v-else>{{ link.label }}</span>
                            </span>
                        </li>
                    </ul>
                </nav> -->
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
    name: 'ShopPageView',
    data() {
        return {
            shop: {
                products: [],
                info: {},
                slideShows: [],
                categories: [],
            },
            selectCat:'',
        }
    },
    methods: {
        productView(id) {
            event.preventDefault();
            this.$router.push('/shop/products/' + id)
        },
        getShop(link) {
            this.selectCat = ''
            let url = this.api + '/shop/shopPage/' + this.$route.params.id;
            if (link) {
                url = link;
            }
            axios.get(url).then(r => {
                this.shop.products = r.data.products;
                this.$store.state.shopPage.products = r.data.products;
                this.shop.info = r.data.info
                this.shop.slideShows = r.data.slides
                this.shop.categories = r.data.categories
            })
        },
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
        nextPrev(orders, index) {
            if (orders.current_page + index == 1) {
                return true;
            } else if (orders.current_page == orders.last_page && orders.links.length == index + 1) {
                return true;
            }
        },
        getCountProducts(id) {
            let array = this.shopPage.products.filter(e => e.category_id == id)
            return array.length
        },
        filterByCategory(id) {
            let array = this.shopPage.products.filter(e => e.category_id == id)
            this.shop.products = array;
            this.selectCat = id;
        }
    },
    computed: {
        ...mapState(['api', 'imagePath', 'shopPage'])
    },
    mounted() {
        this.getShop();
    },

}
</script>

<style lang="scss" scoped>

</style>