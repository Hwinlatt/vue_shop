<template>
    <div>
        <div class="container-fluid">
            <div class="row px-xl-5">
                <div class="col-12">
                    <nav class="breadcrumb bg-light mb-30">
                        <router-link to="/" class="breadcrumb-item text-dark">Home</router-link>
                        <router-link to="/shop" class="breadcrumb-item text-dark">Shop</router-link>
                        <span class="breadcrumb-item active">My Orders</span>
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
                                <th>Order Id</th>
                                <th>Delivery Charge</th>
                                <th>Status</th>
                                <th>Ordered date</th>
                                <th>Deliver date</th>
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
                        <tbody v-else class="align-middle">
                            <tr v-for="(order, index) in orders.data" :key="index">
                                <td class="align-middle">
                                    <router-link :to="'orders/' + order.order_id">
                                        <h5>{{ order.order_id }}</h5>
                                    </router-link>
                                </td>
                                <td class="align-middle">{{ order.delivery_charges }} MMK</td>
                                <td class="align-middle">
                                    <span v-if="order.status == 'pending'"
                                        class="p-2 badge text-bg-warning text-capitalize">{{ order.status }}</span>
                                    <span v-else-if="order.status == 'accept'"
                                        class="p-2 badge text-bg-info text-capitalize">{{ order.status }}</span>
                                    <span v-else-if="order.status == 'reject'"
                                        class="p-2 badge text-bg-danger text-capitalize">{{ order.status }}</span>
                                    <span v-else-if="order.status == 'delivered'"
                                        class="p-2 badge text-bg-dark text-capitalize">{{ order.status }}</span>
                                    <span v-else-if="order.status == 'success'"
                                        class="p-2 badge text-bg-success text-capitalize">{{ order.status }}</span>
                                </td>
                                <td class="align-middle">{{ dateFmtChg(order.created_at) }}</td>
                                <td><span v-if="order.deliver_date != null">{{ dateFmtChg(order.deliver_date) }}</span></td>
                                <td class="align-middle">
                                    <button v-if="order.status == 'delivered'" @click="acceptOrder(order.order_id)" class="btn btn-success">Accept</button>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="float-end mt-2" v-if="!isLoading">
                        <nav aria-label="Page navigation example mt-5">
                            <ul class="pagination">
                                <li v-for="(link, index) in orders.links" :key="index" class="page-item"
                                    :class="{ active: link.active, 'd-none': nextPrev(orders, index) }">
                                    <span class="page-link text-dark" @click="getOrders(link.url)"
                                        style="cursor:pointer">
                                        <span v-if="index == 0">Back</span>
                                        <span v-else-if="index + 1 == orders.links.length">Next</span>
                                        <span v-else>{{ link.label }}</span>
                                    </span>
                                </li>
                            </ul>
                        </nav>
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
            orders: [],
            isLoading: true,
        }
    },
    methods: {
        getOrders(link) {
            let url = this.api + '/order';
            if (link) {
                url = link;
            }
            axios.get(url, this.authHeader).then(r => {
                this.orders = r.data
                this.isLoading = false;
            }).catch(err => {
                console.log(err);
                this.isLoading = false;
            })

        },
        dateFmtChg(data) {
            let date = new Date(data);
            let d = date.getDate();
            let M = this.month[date.getMonth()];
            let Y = date.getFullYear();
            return d + '-' + M + '-' + Y;
        },
        nextPrev(orders, index) {
            if (orders.current_page + index == 1) {
                return true;
            } else if (orders.current_page == orders.last_page && orders.links.length == index + 1) {
                return true;
            }
        },
        acceptOrder(order_id){
            const url = this.api+'/order/accept/'+order_id;
            axios.post(url,{},this.authHeader).then(r=>{
                if (r.data.success) {
                    this.$swal.fire('Success','Order is Accepted','success');
                    this.getOrders();
                }
            })
        }
    },
    computed: {
        ...mapState(['api', 'month']),
        ...mapGetters(['authHeader']),
    },
    mounted() {
        this.$store.state.activePage = 'orders';
        this.getOrders()
    },
}
</script>

<style lang="scss" scoped>

</style>