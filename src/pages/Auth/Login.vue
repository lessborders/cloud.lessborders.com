<template>
    <div class="bg-div main-bg-animated d-flex col">
        <div class="page-container full-page d-flex col container-md p-4 p-sm-5 px-md-0 py-md-5">
            <div class="col-12 col-md-6 col-lg-7 col-xl-8 d-none d-md-block my-auto">
                <div class="h2">
                    <strong class="text-gradient">All</strong> your apps<br>
                    in <strong class="text-gradient">one</strong> place
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-5 col-xl-4 my-md-auto">
                <div class="text-center p-4 pb-5 card-bg d-flex position-relative rounded">
                    <div class="d-flex position-absolute top-bar p-2">  
                        <a v-if="previous_url" :href="previous_url" class="btn btn-transparent px-3 me-auto"><i class="fa-regular fa-arrow-left-long"></i></a>
                        <darkToggle class="ms-auto"/>
                    </div>
                    <div class="small-container col py-5">
                        <img class="invert-dark logo mt-5 mb-3" height="48" width="48" alt="Less Borders Logo" src="https://static.lessborders.com/apps/lessborders/lessborders_logo.svg"/>
                        <br>

                        <h5>Sign in</h5>
                        <p>With your <span class="text-gradient">Cloud</span> account</p>
                        
                        <p class="text-red small" v-if="error">{{ error }}</p>

                        <form v-if="currentStep == 1" v-on:submit.prevent="checkUser">
                            <div class="form-floating mb-2">
                                <input v-model="email" name="email" type="email" class="form-control" placeholder="Email" required/>
                                <label for="email">Email</label>
                            </div>

                            <div class="mt-3 text-end">
                                <button :disabled="loading" type="submit" class="btn btn-primary"><span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Next</button>
                            </div>
                        </form>

                        <form v-if="currentStep == 2" v-on:submit.prevent="login">

                            <div class="btn btn-sm btn-light mb-4" @click="currentStep--">
                                {{ email }} &nbsp;<i class="fa fa-angle-down"></i>
                            </div>

                            <div class="form-floating mb-2">
                                <input v-model="password" name="password" type="password" class="form-control" placeholder="Password" required/>
                                <label for="password">Password</label>
                            </div>
                            
                            <div class="mt-3 text-end">
                                <button :disabled="loading" type="submit" class="btn btn-primary"><span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
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
                previous_url: new URL(location.href).searchParams.get('previous_url'),
                email: '',
                password: '',
                error: null,
                loading: false,
                currentStep: 1,
            }
        },
        methods: {
            async checkUser () {
                try {
                    this.error = null
                    this.loading = true

                    const response = await authenticationService.checkUser({
                        email: this.email
                    })
                    if( !response.data.error ) {
                        setTimeout(() => {
                            this.currentStep++
                            this.error = null
                            this.loading = false
                        }, 200)
                    }else{
                        setTimeout(() => {
                            this.error = response.data.error
                            this.loading = false
                        }, 200)
                    }
                } catch (err) {
                    console.log(err)
                    this.loading = false
                }
            },
            async login () {
                try {
                    this.error = null
                    this.loading = true

                    const response = await authenticationService.login({
                        email: this.email,
                        password: this.password
                    })
                    if( !response.data.error ) {
                        //this.$store.dispatch('setToken', response.data.token)
                        //this.$store.dispatch('setUser', response.data.user)
                        setTimeout(() => {
                            this.error = null
                            this.loading = false
                            window.location.href = this.redirect_url
                        }, 200)
                    }else{
                        setTimeout(() => {
                            this.error = response.data.error
                            this.loading = false
                        }, 200)
                    }
                } catch (err) {
                    console.log(err)
                    this.loading = false
                }
            }
        },
        name: "Sign in"
    };
</script>
