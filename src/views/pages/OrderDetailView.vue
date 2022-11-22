<template>
    <div>
        <div class="container-fluid">
            <div class="row px-xl-5">
                <div class="col-12">
                    <nav class="breadcrumb bg-light mb-30">
                        <router-link to="/" class="breadcrumb-item text-dark">Home</router-link>
                        <router-link to="/shop" class="breadcrumb-item text-dark">Shop</router-link>
                        <router-link to="/orders" class="breadcrumb-item text-dark">My Orders</router-link>
                        <span class="breadcrumb-item active"><span class="me-1">{{ this.$route.params.id }} </span>
                            <span v-if="order.status == 'pending'" class="p-2 badge text-bg-warning text-capitalize">{{
                                    order.status
                            }}</span>
                            <span v-else-if="order.status == 'accept'" class="p-2 badge text-bg-info text-capitalize">{{
                                    order.status
                            }}</span>
                            <span v-else-if="order.status == 'reject'"
                                class="p-2 badge text-bg-danger text-capitalize">{{ order.status }}</span>
                            <span v-else-if="order.status == 'delivered'"
                                class="p-2 badge text-bg-dark text-capitalize">{{ order.status }}</span>
                            <span v-else-if="order.status == 'success'"
                                class="p-2 badge text-bg-success text-capitalize">{{ order.status }}</span>

                        </span>
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
                                <th>More</th>
                            </tr>
                        </thead>
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
                        <tbody class="align-middle">
                            <tr v-for="(item, index) in items" :key="index">
                                <td class="align-middle"><img :src="imagePath + item.image" alt="" style="width: 50px;">
                                </td>
                                <td class="text-start align-middle">
                                    <router-link class="text-dark" :to="'/shop/products/' + item.product_id">{{
                                            item.name
                                    }}</router-link>
                                </td>
                                <td class="align-middle">{{ item.price }} MMK</td>
                                <td class="align-middle">{{ item.qty }}</td>
                                <td class="align-middle">{{ item.price * item.qty }} MMK</td>
                                <td class="align-middle">
                                    <span v-if="item.color">Color-{{ item.color }} </span> ,
                                    <span v-if="item.size">Size:{{ item.size }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h4 class="mt-5 pt-4 text-center">Order Status and Remarks by shop</h4>
                    <!-- -- Remark List --  -->
                    <ul class="list-group list-group-flush">
                        <li v-for="(remark, index) in remarks" :key="index" class="list-group-item">{{ remark }}</li>
                    </ul>
                </div>
                <div class="col-lg-4">
                    <h5 class="section-title position-relative text-uppercase mb-3"><span
                            class="bg-secondary pr-3">Order
                            Summary</span></h5>
                    <div class="bg-light p-30 mb-5">
                        <div class="border-bottom pb-2">
                            <div class="d-flex justify-content-between mb-3">
                                <h6>Subtotal</h6>
                                <h6>{{ getsubTotal }} MMK</h6>
                            </div>
                            <div class="d-flex justify-content-between mb-3">
                                <h6>Delivery Fee</h6>
                                <h6>{{ order.delivery_charges }} MMK</h6>
                            </div>
                        </div>
                        <div class="border-bottom mt-4">
                            <div class="d-flex justify-content-between mb-3">
                                <h6>Total</h6>
                                <h6>{{ order.delivery_charges + getsubTotal }} MMK</h6>
                            </div>
                        </div>
                        <div class="pt-2">
                            <button v-if="order.status == 'delivered'" @click="acceptOrder(order.order_id)"
                                class="btn btn-block btn-success font-weight-bold my-3 py-3">Accept</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapState } from 'vuex';
export default {
    data() {
        return {
            items: [],
            order: {},
            remarks: [],
            isLoading: true
        }
    },
    methods: {
        getOrders() {
            let url = this.api + '/order/info/' + this.$route.params.id;
            axios.post(url, {}, this.authHeader).then(r => {
                this.items = r.data.order_items;
                this.isLoading = false
                this.order = r.data.order,
                    this.remarks = JSON.parse(r.data.order.remark).reverse();
            })
        },
        acceptOrder(order_id) {
            const url = this.api + '/order/accept/' + order_id;
            axios.post(url, {}, this.authHeader).then(r => {
                if (r.data.success) {
                    this.$swal.fire('Success', 'Order is Accepted', 'success');
                    this.getOrders();
                }
            })
        }
    },
    computed: {
        ...mapState(['api', 'imagePath']),
        ...mapGetters(['authHeader']),
        getsubTotal() {
            let value = 0;
            this.items.forEach(cart => {
                value += cart.qty * cart.price;
            });
            return value;
        }
    },
    mounted() {
        this.getOrders();
        this.$store.state.activePage = 'orders';
    },
}
</script>

<style lang="scss" scoped>

</style>