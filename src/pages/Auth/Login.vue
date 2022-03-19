<template>
    <div class="page-container full-page d-flex col">
        <div class="col-12 col-lg-6 col-xl-7 d-none d-lg-block my-auto ps-5">
            <div class="h2 small-container ms-5">
                <strong class="text-gradient">All</strong> your apps<br>
                in <strong class="text-gradient">one</strong> place
            </div>
        </div>
        <div class="col-12 col-lg-6 col-xl-5 text-center p-3 card-bg d-flex position-relative">
            <div class="d-flex position-absolute p-3" style="top:0;left:0;right:0;">  
                <darkToggle class="ms-auto"/>
            </div>
            <div class="small-container m-auto col pt-3 pb-5">
                <img class="invert-dark logo my-3" height="48" width="48" alt="Less Borders Logo" src="https://static.lessborders.com/apps/lessborders/lessborders_logo.svg"/>
                <br>

                <h5>Sign in</h5>
                <p>With your <span class="text-gradient">Cloud</span> account</p>
                <form v-on:submit.prevent="login">
                        
                    <div class="form-floating mb-2">
                        <input v-model="email" name="email" type="email" class="form-control" placeholder="Email"/>
                        <label for="email">Email</label>
                    </div>

                    <div class="form-floating mb-2">
                        <input v-model="password" name="password" type="password" class="form-control" placeholder="Password"/>
                        <label for="password">Password</label>
                    </div>
                    <div class="mt-3 text-end">
                        <button type="submit" class="btn btn-primary">Sign in <i class="fa-regular fa-angle-right ms-1"></i></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import authenticationService from '../../services/AuthenticationService'

    export default {
        data () {
            return {
                redirect_url: new URL(location.href).searchParams.get('redirect_url'),
                email: '',
                password: '',
                error: null
            }
        },
         methods: {
            async login () {
                try {
                    // Keep track of responses return from a server
                    // Set token and user based on those responses
                    const response = await authenticationService.login({
                        email: this.email,
                        password: this.password
                    })
                    // setToken and setUser based on whatever return from the login endpoint
                    this.$store.dispatch('setToken', response.data.token)
                    this.$store.dispatch('setUser', response.data.user)
                    window.location.href = this.redirect_url
                } catch (err) {
                    console.log(err)
                }
            }
        },
        name: "Sign in"
    };
</script>
