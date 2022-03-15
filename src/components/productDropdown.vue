<template>
    <div>
        <a class="btn px-3 btn-transparent dropdown-toggle custom-icon" href="#" data-bs-toggle="dropdown" data-bs-auto-close="outside" >
            <i class="fa-duotone fa-grid-2"></i>
        </a>
        <div class="dropdown-menu d-end" style="width:300px" role="menu">
            <div class="container">
                <div class="row">
                    <div v-for="product in products" :key="product" class="col-6 text-center">
                        <a class="btn btn-transparent px-2 py-4 d-block h-full" :href="product.link" :class="{ 'active' : product.active == 1}">
                        <img class="logo" height="48" width="48" alt="Bordfolio Logo" :src="product.image"/>
                        <small class="d-block mt-2">{{ product.name }}</small>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
const products = [
    {
        name: "Less Borders",
        image: "https://static.lessborders.com/apps/lessborders/lessborders_logo.svg",
        link: "https://lessborders.com/",
        active: 1
    },
    {
        name: "Bordfolio",
        image: "https://static.lessborders.com/apps/bordfolio/bordfolio_logo.svg",
        link: "https://bordfol.io/",
        active: 0
    }
];

export default {
    data() {
        return {
            products: products
        }
    }
}
</script>