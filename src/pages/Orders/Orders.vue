<template>
<div class="page-container">
    <div class="container py-4">
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-lg-10 col-xl-8">

                <router-link class="card" :to="{ name: 'order', params: { id: 1} }">
                    <div class="card-header d-print-none">
                        <div class="d-flex flex-row">
                            <div class="d-flex"> 
                                <div class="badge bg-orange me-3">In progress</div>
                            </div>
                            <div class="ms-auto text-end">
                                <span v-if="invoice.invoiceAmount >= 0">-{{ formatCurrency(invoice.invoiceAmount) }}</span>
                                <span v-if="invoice.invoiceAmount < 0" class="text-green">+{{ formatCurrency(invoice.invoiceAmount) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body d-print-none">
                        <div class="d-flex flex-row">
                            <div class="d-flex flex-column"> 
                                <span>Invoice</span> 
                                <small>{{ invoice.invoiceID}}</small> 
                            </div>
                            <div class="ms-auto text-end d-flex flex-column">
                                <small class="meta">{{ invoice.invoiceDate }}</small>
                            </div>
                        </div>
                    </div>
                </router-link>

            </div>
        </div>
    </div>
</div>
</template>

<script>
    import { useRoute } from 'vue-router';
    
    export default {
        data () {
            return {
                invoice: {
                    customer: {},
                    handler: {},
                    order: {}
                }
            }
        },
        created () {
            this.$http
            .get('https://cloud.lessborders.com/api/orders.json')
            .then(response => (this.invoice = response.data))
        },
        setup () {
            const route = useRoute();  
            const id = route.params.id;
        },
        methods: {
            formatCurrency (amount) {
                return Intl.NumberFormat(
                    'de-DE', {
                    style: 'currency',
                    currency: 'EUR',
                    currencyDisplay: "code" 
                }).format(amount);
            }
        }
    };
</script>