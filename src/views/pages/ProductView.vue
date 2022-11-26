
<template>
    <div style="min-height: 70vh;">
        <div class="container-fluid">
            <div class="row px-xl-5">
                <div class="col-12">
                    <nav class="breadcrumb bg-light mb-30">
                        <router-link to="/" class="breadcrumb-item text-dark">Home</router-link>
                        <router-link to="/shop" class="breadcrumb-item text-dark">Shop</router-link>
                        <router-link :to="'/shopPage/' + product.user_id + '/' + product.shop_name"
                            class="breadcrumb-item text-dark">{{ product.shop_name }}</router-link>
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
                                <span v-for="(index) in 5" :key="index">
                                    <i v-if="product_rating >= index" class="fa-solid fa-star"></i>
                                    <i v-else class="fa-regular fa-star"></i>
                                </span>
                            </div>
                            <small class="pt-1">({{ comment_count }} Reviews)</small>
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
                            <a class="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-3">Reviews ({{
                                    comment_count
                            }})</a>
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

                            <!-- ---- Review for product ---- -->
                            <div class="tab-pane fade" id="tab-pane-3">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h4 class="mb-4">{{ comment_count }} review for "Product Name"</h4>
                                        <div class="media mb-4" v-for="(comment, index) in comments" :key="index">
                                            <img v-if="comment.profile_photo_path"
                                                :src="imagePath + comment.profile_photo_path" alt="Image"
                                                class="img-fluid mr-3 mt-1" style="width: 45px;">
                                            <img v-else :src="server + 'img/def_user.webp'" alt="Image"
                                                class="img-fluid mr-3 mt-1" style="width: 45px;">
                                            <div class="media-body">
                                                <h6>{{ comment.name }}<small> - <i>{{ dateFmtChg(comment.created_at)
                                                }}</i></small>
                                                    <button v-if="comment.user_id == userInfo.id"
                                                        @click="cmtDelete(comment.id)"
                                                        class="ms-5 btn btn-danger btn-sm rounded"><i
                                                            class="fa-solid fa-trash"></i></button>
                                                </h6>
                                                <div class="text-primary mb-2">
                                                    <i style="cursor:pointer" @click="chgRating(index)"
                                                        v-for="(index) in 5" :key="index" class="fa-star"
                                                        :class="{ 'far': index >= comment.rating, 'fa-solid': index <= comment.rating }"></i>
                                                </div>
                                                <p>{{ comment.comment }}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <button v-if="showMoreBtn" @click="cmtCountChg('more')"
                                                class="btn btn-link">Show
                                                More</button>
                                            <button v-if="showLessBtn" @click="cmtCountChg('less')"
                                                class="btn btn-link">Show
                                                Less</button>
                                        </div>
                                    </div>
                                    <div class="col-md-6" v-if="isActive">
                                        <h4 class="mb-4">Leave a review</h4>
                                        <small>Your email address will not be published. Required fields are marked
                                            *</small>
                                        <div class="d-flex my-3">
                                            <p class="mb-0 mr-2">Your Rating * :</p>
                                            <div class="text-primary">
                                                <i style="cursor:pointer" @click="chgRating(index)" v-for="(index) in 5"
                                                    :key="index" class="fa-star"
                                                    :class="{ 'far': index >= cmtForm.rating, 'fa-solid': index <= cmtForm.rating }"></i>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="message">Your Review *</label>
                                            <textarea v-model="cmtForm.comment" id="message" cols="30" rows="5"
                                                class="form-control"></textarea>
                                        </div>
                                        <div class="form-group mb-0">
                                            <button :disabled="cmtForm.comment.length < 1" @click="submitCmt()"
                                                class="btn btn-primary px-3">Submit</button>
                                        </div>
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
            cmtForm: {
                productId: this.$route.params.id,
                comment: '',
                rating: 5,
            },
            comments: [],
            comment_count: 0,
            cmt_limit: 5,
            product_rating: 0,
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
            this.getComments(5);
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
        chgRating(qty) {
            this.cmtForm.rating = qty;
        },
        submitCmt() {
            axios.post(this.api + '/cmt/add', this.cmtForm, this.authHeader).then(r => {
                if (r.data.success) {
                    this.$swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Submitted comment.',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    this.cmtForm.comment = '';
                    this.getComments()
                } else if (r.data.error) {
                    let errorText = '';
                    r.data.error.forEach(err => {
                        errorText += err;
                    });
                    this.$swal.fire('Error', errorText, 'error');
                }
            });
        },
        dateFmtChg(data) {
            let date = new Date(data);
            let d = date.getDate();
            let M = this.month[date.getMonth()];
            let Y = date.getFullYear();
            return d + '-' + M + '-' + Y;
        },
        getComments() {
            axios.post(this.api + '/cmt/get/' + this.$route.params.id, { limit: this.cmt_limit }).then(r => {
                this.comments = r.data.comments;
                this.comment_count = r.data.comment_count;
                this.product_rating =  Math.round(r.data.rating/this.comment_count);
            })
        },
        cmtCountChg(type) {
            if (type == 'more') {
                this.cmt_limit += 5;
            }
            if (type == 'less') {
                this.cmt_limit -= 5;

            }
            this.getComments()
        },
        cmtDelete(id) {
            this.$swal.fire({
                title: 'Are you sure to Delete this comment?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                axios.post(this.api + '/cmt/delete/' + id, {}, this.authHeader).then(r => {
                    if (r.data.success) {
                        if (result.isConfirmed) {
                            this.getComments();
                            this.$swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Comment Deleted.',
                                showConfirmButton: false,
                                timer: 1000
                            })
                        }
                    }
                    if (r.data.error) {
                        this.$swal.fire('Error', r.data.error, 'error');
                    }
                })

            })
        }


    },
    computed: {
        ...mapState(['api', 'imagePath', 'userInfo', 'userToken', 'server', 'month']),
        ...mapGetters(['authHeader', 'isActive']),
        getColors() {
            let colors = this.getProductInfo('color').split(',');
            return colors;
        },
        getSizes() {
            let colors = this.getProductInfo('size').split(',');
            return colors;
        },
        showMoreBtn() {
            if (this.comments.length < this.comment_count) {
                return true;
            }
            return false;
        },
        showLessBtn() {
            if (this.cmt_limit > 5) {
                return true;
            }
            return false
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