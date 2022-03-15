<template>
<div class="page-container">
    <div class="container py-4">
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-lg-10 col-xl-8">
                <div class="card">

                    <div class="card-header d-print-none">
                        <div class="d-flex flex-row">
                            <div class="d-flex flex-column"> 
                                <span class="font-weight-bold">Invoice</span> 
                                <small>{{ invoice.invoiceID}}</small> 
                            </div>
                            <div class="ms-auto">
                                <button class="btn btn-light" onclick="window.print();">
                                    <i class="fa-regular fa-print"></i> &nbsp;Print
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 text-end">
                                <img class="invert-dark logo mb-3" height="48" width="48" alt="Less Borders Logo" src="https://static.lessborders.com/apps/lessborders/lessborders_logo.svg"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <p class="small">
                                    <small>
                                        <strong>{{ invoice.handler.name }}</strong> | 
                                        {{ invoice.handler.street }} | 
                                        {{ invoice.handler.zip }} {{ invoice.handler.city }}
                                    </small>
                                </p>
                                <p>
                                    {{ invoice.customer.name }} <br/>
                                    {{ invoice.customer.street }} <br/>
                                    {{ invoice.customer.zip }} {{ invoice.customer.city }} <br/>
                                    {{ invoice.customer.country }} 
                                </p>
                            </div>
                            <div class="col-sm-6 text-end">
                                <p>
                                    <strong>{{ invoice.handler.name }}</strong> <br/>
                                    {{ invoice.handler.street }} <br/>
                                    {{ invoice.handler.zip }} {{ invoice.handler.city }} <br/>
                                    {{ invoice.handler.country }} 
                                </p>
                                <p>
                                    Tax no.: <br/>{{ invoice.handler.taxNumber }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <h3>Invoice {{ invoice.invoiceID }}</h3>
                        <hr>
                        <div class="row">
                            <div class="col-md-3">
                                Invoice Number: <br class="d-none d-md-block me-4">
                                {{ invoice.invoiceID }}
                            </div>
                            <div class="col-md-3">
                                Invoice Date: <br class="d-none d-md-block me-4">
                                {{ invoice.invoiceDate }}
                            </div>
                            <div class="col-md-3">
                                Processed Date: <br class="d-none d-md-block me-4">
                                {{ invoice.invoiceDate }}
                            </div>
                        </div>
                    </div>

                    <hr>
                    <div class="card-body">
                      <div class="table table-striped">
                            <div class="table-header px-md-5 small">
                                <div class="row">
                                    <div class="col-1 d-none d-md-block d-print-block">
                                        #
                                    </div>
                                    <div class="col-7 col-md-6">
                                        Order
                                    </div>
                                    <div class="col-2 col-md-1">
                                        Qty
                                    </div>
                                    <div class="d-none d-md-block d-print-block col-md-2 text-end">
                                        Price
                                    </div>
                                    <div class="col-3 col-md-2 text-end">
                                        Total
                                    </div>
                                </div>
                            </div>
                            <div class="table-body px-md-5">
                                <div v-for="(product, index) in invoice.order" :key="index" class="row">
                                    <div class="col-1 d-none d-md-block d-print-block">
                                        {{ index }}.
                                    </div>
                                    <div class="col-7 col-md-6">
                                        <h6>{{ product.name }}</h6>
                                        <small>{{ product.description }}</small>
                                    </div>
                                    <div class="col-2 col-md-1">
                                        1
                                    </div>
                                    <div class="d-none d-md-block d-print-block col-md-2 text-end">
                                        {{ formatCurrency(product.amount) }}
                                    </div>
                                    <div class="col-3 col-md-2 text-end">
                                        {{ formatCurrency(product.amount) }}
                                    </div>
                                </div>
                            </div>
                            <div class="table-footer px-md-5">
                                <div class="row">
                                    <div class="col-9 col-md-10 text-end">
                                        Total:
                                    </div>
                                    <div class="col-3 col-md-2 text-end">
                                        {{ formatCurrency(invoice.invoiceAmount) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-none d-print-block">
                            <hr>
                            Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
                        </div>
                    </div>
                    
                    <div class="card-footer small">
                        <div class="row small">
                            <div class="col-md-3 col-lg-4 my-3">
                                {{ invoice.handler.name }}<br/>
                                {{ invoice.handler.street }}<br/>
                                {{ invoice.handler.zip }} {{ invoice.handler.city }}<br/>
                                {{ invoice.handler.country }}
                            </div>
                            <div class="col-md-5 col-lg-4 my-3">
                                Stadtsparkasse München<br/>
                                IBAN: DE80 7015 0000 1006 7742 42<br/>
                                BIC: SSKMDEMMXXX<br/>
                                Kto. Inh.: Billie Bell<br/>
                            </div>
                            <div class="col-md-4 col-lg-4 my-3">
                                Tel: +49 (0) 176 8344 1249<br/>
                                service@lessborders.com<br>
                                <br>
                                www.lessborders.com<br/>
                            </div>
                        </div>
                    </div>

                </div>
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
                    currency: 'EUR'
                }).format(amount);
            }
        }
    };
</script>