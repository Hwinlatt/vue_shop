<template>
    <div>
        <div class="container-fluid">
            <div class="row px-xl-5">
                <div class="col-12">
                    <nav class="breadcrumb bg-light mb-30">
                        <router-link to="/" class="breadcrumb-item text-dark" href="#">Home</router-link>
                        <router-link to="/shop" class="breadcrumb-item text-dark" href="#">Shop</router-link>
                        <span class="breadcrumb-item active">Shopping Cart</span>
                    </nav>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row px-xl-5">
                <div class="col-lg-8 table-responsive mb-5">
                    <table class="table table-light table-borderless table-hover text-center mb-0">
                        <thead class="thead-dark">
                            <tr>
                                <th></th>
                                <th>Products</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody class="align-middle" v-if="!isLoading">
                            <tr v-if="carts.length == 0">
                                <td colspan="8">There is no cart items <router-link class="btn btn-primary" to="/shop">Shop Now</router-link></td>
                            </tr>
                            <tr v-for="(cart, index) in carts" :key="index">
                                <td class="align-middle"><img :src="imagePath + cart.image" alt="" style="width: 50px;"></td>
                                <td class="align-middle text-start" @click="moreInfo(cart)" style="cursor:pointer"
                                    data-bs-toggle="modal" data-bs-target="#moreInfo">
                                    {{ cart.name }}</td>
                                <td class="align-middle">{{
                                        getProductInfo(cart.information, 'price')
                                }}</td>
                                <td class="align-middle">
                                    <div class="input-group quantity mx-auto" style="width: 100px;">
                                        <div class="input-group-btn">
                                            <button v-if="cart.qty > 0" @click="updateQty(cart, 'minus',index)"
                                                class="btn btn-sm btn-primary btn-minus">
                                                <i class="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input type="text"
                                            class="form-control form-control-sm bg-secondary border-0 text-center"
                                            :value=cart.qty>
                                        <div class="input-group-btn">
                                            <button v-if="cart.remain_qty > cart.qty" @click="updateQty(cart, 'plus',index)"
                                                class="btn btn-sm btn-primary btn-plus">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td class="align-middle">{{ getProductInfo(cart.information, 'price') * cart.qty }} MMK
                                </td>
                                <td class="align-middle">
                                    <button @click="removeCart(cart.id, index)" class="btn btn-sm btn-danger"><i
                                            class="fa fa-times"></i></button>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-if="isLoading">
                            <tr>
                                <td colspan="6">
                                    <div class="text-center my-5 py-5">
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-lg-4">
                    <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary pr-3">Cart
                            Summary</span></h5>
                    <div class="bg-light p-30 mb-5">
                        <div class="border-bottom pb-2">
                            <div class="d-flex justify-content-between mb-3">
                                <h6>Subtotal</h6>
                                <h6>{{ getsubTotal }} MMK</h6>
                            </div>
                        </div>
                        <div class="pt-2">
                            <router-link to="/checkout" v-if="getsubTotal != 0 " class="btn btn-block btn-primary font-weight-bold my-3 py-3">Proceed To
                                Checkout</router-link>
                            <button v-if="carts.length > 2" @click="removeAllCart()" class="btn btn-block  btn-danger font-weight-bold my-3 py-3">Remove All Carts</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="moreInfo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">{{ modal.title }}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="tab-pane fade active show" id="tab-pane-2">
                            <h4 class="mb-3">Cart information</h4>
                            <table class="table table-striped">
                                <tbody>
                                    <tr v-if="modal.color.length > 0">
                                        <td class="col-4"><b>Color</b></td>
                                        <td>{{ modal.color }}</td>
                                    </tr>
                                    <tr v-if="modal.color.length > 0">
                                        <td class="col-4"><b>Size</b></td>
                                        <td>{{ modal.size }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button class="btn btn-sm btn-link" @click="toToProduct(modal.more)"
                                data-bs-dismiss="modal">More information of {{ modal.title }}</button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
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
    name: 'CartView',
    data() {
        return {
            carts: [],
            isLoading: true,
            subTotal: 0,
            modal: {
                title: '',
                color: '',
                size: '',
                more: '',
            }
        }
    },
    methods: {
        getCarts() {
            axios.post(this.api + '/cart', {}, this.authHeader).then(r => {
                this.isLoading = false;
                this.carts = r.data;
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
        updateQty(cart, type,index) {
            let old_qty = cart.qty;
            if (type == 'plus') {
                cart.qty++
            }
            if (type == 'minus') {
                cart.qty--
            }
            let data = {
                id: cart.id,
                qty: cart.qty,
            }
            axios.post(this.api + '/cart/qty/change', data, this.authHeader).then(r=>{
                if (r) {
                    if (cart.qty == 0) {
                        this.removeCart(cart.id,index)
                    }
                }
            }).catch(err => {
                console.log(err);
                cart.qty = old_qty;
            })
        },
        removeCart(cid, index) {
            axios.delete(this.api + '/cart/delete/' + cid, this.authHeader).then(r => {
                if (r.data.success) {
                    console.log('success');
                    this.carts.splice(index, 1);
                }
            }).catch(err => console.log(err.response))
        },
        moreInfo(cart) {
            this.modal.title = cart.name;
            this.modal.color = cart.color;
            this.modal.size = cart.size;
            this.modal.more = '/shop/products/' + cart.product_id;
        },
        toToProduct(link) {
            this.$router.push(link);
        },
        removeAllCart(){
            axios.post(this.api + '/cart/delete',{},this.authHeader).then(r => {
                if (r.data.success) {
                this.$swal.fire('Success','Cart Items Removed','info');
                this.getCarts();
                }
            })
        }
    },
    computed: {
        ...mapState(['api', 'imagePath']),
        ...mapGetters(['authHeader',]),
        getsubTotal() {
            let value = 0;
            this.carts.forEach(cart => {
                value += cart.qty * this.getProductInfo(cart.information, 'price');
            });
            return value;
        }
    },
    mounted() {
        this.getCarts();
        this.$store.state.activePage = ''
    },
    updated () {
        this.$store.dispatch('getCartQty');
    },
}
</script>

<style lang="scss" scoped>

</style>