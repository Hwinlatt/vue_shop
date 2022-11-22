
<template>
    <div style="min-height: 70vh;">
        <div class="container-fluid">
            <div class="row px-xl-5">
                <div class="col-12">
                    <nav class="breadcrumb bg-light mb-30">
                        <router-link to="/" class="breadcrumb-item text-dark">Home</router-link>
                        <router-link to="/shop" class="breadcrumb-item text-dark">Shop</router-link>
                        <router-link :to="'/shopPage/'+product.user_id+'/'+product.shop_name" class="breadcrumb-item text-dark">{{ product.shop_name }}</router-link>
                        <span class="breadcrumb-item active">Product Detail </span>
                    </nav>
                </div>
            </div>
        </div>
        <div v-if="status" class="container-fluid pb-5">
            <div class="row px-xl-5">
                <div class="col-lg-5 mb-30">
                    <div id="product-carousel" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner bg-light">
                            <div class="carousel-item active">
                                <img class="w-100 h-100" :src="imagePath + product.image" alt="Image">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-7 h-auto mb-30">
                    <div class="h-100 bg-light p-30">
                        <h3>{{ product.name }}</h3>
                        <div class="d-flex mb-3">
                            <div class="text-primary mr-2">
                                <small class="fas fa-star"></small>
                                <small class="fas fa-star"></small>
                                <small class="fas fa-star"></small>
                                <small class="fas fa-star-half-alt"></small>
                                <small class="far fa-star"></small>
                            </div>
                            <small class="pt-1">(99 Reviews)</small>
                        </div>
                        <h3 class="font-weight-semi-bold mb-4">{{ getProductInfo('price') }} MMK</h3>
                        <p class="mb-4">Remain : {{ product.qty }}</p>
                        <div class="d-flex mb-3" v-if="getProductInfo('size').length > 0">
                            <strong class="text-dark mr-3">Sizes:</strong>
                            <span>
                                <div class="custom-control custom-radio custom-control-inline"
                                    v-for="(size, index) in getSizes" :key="index">
                                    <input v-model="cart.size" type="radio" class="custom-control-input"
                                        :value="size.toLowerCase()" :id="'size' + index" name="size">
                                    <label class="custom-control-label text-capitalize" :for="'size' + index">{{ size
                                    }}</label>
                                </div>
                            </span>
                        </div>
                        <div class="d-flex mb-4" v-if="getProductInfo('color').length > 0">
                            <strong class="text-dark mr-3">Colors:</strong>
                            <span>
                                <div class="custom-control custom-radio custom-control-inline"
                                    v-for="(color, index) in getColors" :key="index">
                                    <input v-model="cart.color" :checked="index == 0" type="radio"
                                        class="custom-control-input" :value="color.toLowerCase()" :id="'color-' + index"
                                        name="color">
                                    <label class="custom-control-label text-capitalize" :for="'color-' + index">{{ color
                                    }}</label>
                                </div>
                            </span>
                        </div>
                        <div class="d-flex align-items-center mb-4 pt-2">
                            <div class="input-group quantity mr-3" style="width: 130px;">
                                <div class="input-group-btn">
                                    <button @click="cartQty('-')" :disabled="cart.qty == 1"
                                        class="btn btn-primary btn-minus">
                                        <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                <input type="text" v-model="cart.qty"
                                    class="form-control bg-secondary border-0 text-center">
                                <div class="input-group-btn">
                                    <button @click="cartQty('+')" :disabled="cart.qty == product.qty"
                                        class="btn btn-primary btn-plus">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <button v-if="cartBtnLoading" class="btn btn-primary" type="button" disabled>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                            <button v-else @click="addToCart()" class="btn btn-primary px-3"><i
                                    class="fa fa-shopping-cart mr-1"></i> Add To
                                Cart</button>
                        </div>
                        <div class="d-flex pt-2">
                            <strong class="text-dark mr-2">Share on:</strong>
                            <div class="d-inline-flex">
                                <a class="text-dark px-2" href="">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                                <a class="text-dark px-2" href="">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a class="text-dark px-2" href="">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                                <a class="text-dark px-2" href="">
                                    <i class="fab fa-pinterest"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row px-xl-5">
                <div class="col">
                    <div class="bg-light p-30">
                        <div class="nav nav-tabs mb-4">
                            <a class="nav-item nav-link text-dark active" data-toggle="tab"
                                href="#tab-pane-1">Description</a>
                            <a class="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-2">Information</a>
                            <a class="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-3">Reviews (0)</a>
                        </div>
                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="tab-pane-1">
                                <h4 class="mb-3">Product Description</h4>
                                <p>{{ product.description }}</p>
                            </div>
                            <div class="tab-pane fade" id="tab-pane-2">
                                <h4 class="mb-3">Additional Information</h4>
                                <table class="table table-striped">
                                    <tbody>
                                        <tr v-for="(info, index) in getProductAllInfo()" :key="index">
                                            <td class="col-4"><b>{{ info.key.toUpperCase() }}</b></td>
                                            <td> - {{ info.value }} <span v-if="info.key.toLowerCase() == 'price'">
                                                    MMK</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="tab-pane-3">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h4 class="mb-4">1 review for "Product Name"</h4>
                                        <div class="media mb-4">
                                            <img src="" alt="Image" class="img-fluid mr-3 mt-1" style="width: 45px;">
                                            <div class="media-body">
                                                <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                                                <div class="text-primary mb-2">
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star-half-alt"></i>
                                                    <i class="far fa-star"></i>
                                                </div>
                                                <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam
                                                    ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod
                                                    ipsum.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <h4 class="mb-4">Leave a review</h4>
                                        <small>Your email address will not be published. Required fields are marked
                                            *</small>
                                        <div class="d-flex my-3">
                                            <p class="mb-0 mr-2">Your Rating * :</p>
                                            <div class="text-primary">
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                            </div>
                                        </div>
                                        <form>
                                            <div class="form-group">
                                                <label for="message">Your Review *</label>
                                                <textarea id="message" cols="30" rows="5"
                                                    class="form-control"></textarea>
                                            </div>
                                            <div class="form-group">
                                                <label for="name">Your Name *</label>
                                                <input type="text" class="form-control" id="name">
                                            </div>
                                            <div class="form-group">
                                                <label for="email">Your Email *</label>
                                                <input type="email" class="form-control" id="email">
                                            </div>
                                            <div class="form-group mb-0">
                                                <input type="submit" value="Leave Your Review"
                                                    class="btn btn-primary px-3">
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center my-5 py-5" v-else>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapState } from 'vuex'
export default {
    name: 'ProductView',
    data() {
        return {
            status: false,
            product: {
                name: '',
                information: "[]",
                image: '',
                description: '',
                qty: '',
                id: ''
            },
            cart: {
                qty: 1,
                color: '',
                size: '',
            },
            cartBtnLoading: false,
        }
    },
    methods: {
        getProduct() {
            this.$store.state.productView.lastSeen = this.$route.params.id;
            axios.get(this.api + '/product/' + this.$route.params.id).then(r => {
                this.product = r.data;
                this.status = true;
                this.cart.color = this.getColors[0].toLowerCase();
                this.cart.size = this.getSizes[0].toLowerCase();
            })
        },
        getProductInfo(text) {
            let value = '';
            if (this.product.information != undefined && this.product.information != null) {
                const infos = JSON.parse(this.product.information);
                infos.forEach((info) => {
                    if (info.key.toLowerCase() == text) {
                        value = info.value;
                        return false;
                    }
                });
            }
            return value;
        },
        getProductAllInfo() {
            return JSON.parse(this.product.information);
        },
        cartQty(val) {
            if (val == '-') {
                this.cart.qty -= 1
            }
            if (val == '+') {
                if (this.product.qty > this.cart.qty) {
                    this.cart.qty += 1
                }
            }
        },
        addToCart() {
            this.cartBtnLoading = true;
            const cart = {
                qty: this.cart.qty,
                productId: this.product.id,
                color: this.cart.color,
                size: this.cart.size,
            }
            axios.post(this.api + '/cart/add', cart, this.authHeader).then(r => {
                this.cartBtnLoading = false;
                this.$store.dispatch('getCartQty');
                if (r.data.success) {
                    this.$swal.fire('Success', 'Add to Cart.', 'success');
                } else if (r.data.error) {
                    let errorText = ''
                    r.data.error.forEach(err => {
                        errorText += err;
                    });
                    this.$swal.fire('Error', errorText, 'error');
                } else if (r.data.change) {
                    this.$swal.fire({
                        icon: 'info',
                        title: 'Remove carts from other!',
                        text: 'You have been choose another shop.The Carts items will be remove if you want to continue!',
                        showDenyButton: true,
                        confirmButtonColor: '#FFCB0D',
                        denyButtonText: `No`,
                        confirmButtonText: '<span class="text-dark">Yes Remove</span>',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            axios.post(this.api + '/cart/delete', {}, this.authHeader).then(r => {
                                if (r.data.success) {
                                    this.$swal.fire('Success', 'Cart Items Removed', 'info');
                                    this.addToCart();
                                }
                            })
                        }
                    })
                }
            }).catch(err => {
                this.cartBtnLoading = false;
                if (err.response.status == 401) {
                    if (!this.userToken) {
                        this.$swal.fire({
                            icon: 'info',
                            title: 'Please Login First to Continue!',
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: '<span class="text-dark">Login</span>',
                            confirmButtonColor: '#FFCB0D',
                            denyButtonText: `Register`,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.$router.push('/login')
                            } else if (result.isDenied) {
                                this.$router.push('/register')
                            }
                        })
                    }
                }
            })
        },


    },
    computed: {
        ...mapState(['api', 'imagePath', 'userInfo', 'userToken']),
        ...mapGetters(['authHeader']),
        getColors() {
            let colors = this.getProductInfo('color').split(',');
            return colors;
        },
        getSizes() {
            let colors = this.getProductInfo('size').split(',');
            return colors;
        }
    },
    beforeMount() {
        this.getProduct();
        this.$store.state.activePage = 'productDetail'
    },

}
</script>

<style lang="scss" scoped>

</style>