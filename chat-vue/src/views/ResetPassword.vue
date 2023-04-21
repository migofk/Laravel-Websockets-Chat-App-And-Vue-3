<template>
  <section class="h-100 h-custom bg-light" >
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col d-flex justify-content-center align-items-center">
          
          <div class="card border-0 " style="min-width:350px; max-width:500px">
            <div class="card-body">
              <h3 class="mb-4">Reset Password</h3>
          <hr/>
          <p class="text-medium-emphasis">Use the OTP code that was sent to your email to reset your password
                  -  <button  @click="resendReset" class="btn btn-link px-0">
                        Resend  
                        <div v-if="isResendingEmail" class="spinner-border spinner-border-sm" role="status"> </div> 
                       
                      </button >
                </p>
              <div class="alert alert-success alert-dismissible fade show" v-if="ShowSuccess"  role="alert">
                {{ successMgs }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              <div class="alert alert-danger alert-dismissible fade show" v-if="ShowError"  role="alert">
                {{ errorMgs }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              <form @submit="onSubmit">
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control"
                    v-model.trim="form.email"
                    @input="setTouched('email')"
                    :class="v$.form.email.$error?'is-invalid':''"
                  required>
                  <div class="invalid-feedback"> Please provide a correct email </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">OTP</label>
                  <input type="number" class="form-control"
                    v-model.trim="form.otp"
                    @input="setTouched('otp')"
                    :class="v$.form.otp.$error?'is-invalid':''"
                    required>
                  <div class="invalid-feedback"> Please enter the otp </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input type="password" class="form-control"
                    v-model.trim="form.password"
                    @input="setTouched('password')"
                    :class="v$.form.password.$error?'is-invalid':''"
                    required>
                  <div class="invalid-feedback"> Please provide a password at least 6 characters </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Password confirmation</label>
                  <input type="password" class="form-control"
                    v-model.trim="form.confirmPassword"
                    @input="setTouched('confirmPassword')"
                    :class="v$.form.confirmPassword.$error?'is-invalid':''"
                    required>
                  <div class="invalid-feedback"> Please re-enter your password. </div>
                </div>
                <div class="mb-3 text-center">
                <SubmitButton
                    title="Reset"
                    :isSendingForm="isSendingForm"
                />
              </div>
              <hr/>
           
              </form>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </template>
<script>
/* eslint-disable */
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, email, sameAs, minLength } from '@vuelidate/validators'
import SubmitButton from '../components/SubmitButton.vue'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  name: 'ForgetPassword',
  components: { SubmitButton },
  data() {
    return {
      form: {
        email: this.$route.params.email.replace("--", "."),
        otp: '',
        password: '',
        confirmPassword: '',
        recaptcha_token:'',
      },
      errorMgs: '',
      ShowError: false,
      show: true,
      isSendingForm: false,
      isResendingEmail: false,
      ShowSuccess:false,
      successMgs: 'Your password has been reset successful',
    }
  },
  validations() {
    return {
      form: {
        email: {
          required,
          email,
        },
        otp: {
          required,
        },
        password: {
          required,
          minLength: minLength(6),
        },
        confirmPassword: {
          sameAsPassword: sameAs(this.form.password),
        },
      },
    }
  },
  methods: {
    setTouched(theModel) {
      if (theModel === 'email' || theModel === 'all') {
        this.v$.form.email.$touch()
      }
      if (theModel === 'otp' || theModel === 'all') {
        this.v$.form.otp.$touch()
      }
      if (theModel === 'password' || theModel === 'all') {
        this.v$.form.password.$touch()
      }
      if (theModel === 'confirmPassword' || theModel === 'all') {
        this.v$.form.confirmPassword.$touch()
      }
    },
    async onSubmit(event) {
      event.preventDefault()
      this.setTouched('all')
      await this.$recaptchaLoaded()
      this.form.recaptcha_token = await this.$recaptcha('resetPassword')
      if (!this.v$.$invalid) {
        this.isSendingForm = true
        axios
          .post(
            this.$store.state.backendUrl +'/'+ this.$store.state.localLang+ '/password/reset',
             this.form, 
            { headers: { 'Content-Type': 'application/json' } },
          )
          .then((response) => {
            console.log(response)
            this.show = false
            this.ShowSuccess = true
            this.isSendingForm = false
          })
          .catch((error) => {
            console.log(error)
            this.ShowError = true
            this.errorMgs = error.response.data.error.message
            this.isSendingForm = false
          })
      }
    },
    resendReset(event) {
      event.preventDefault()
        this.isResendingEmail = true
        axios
          .post(
            this.$store.state.backendUrl +'/'+ this.$store.state.localLang+ '/password/forgot-password',
            this.form,
            { headers: { 'Content-Type': 'application/json' } },
          )
          .then((response) => {
            console.log(response)
            this.isResendingEmail = false
          })
          .catch((error) => {
            console.log(error)
            this.ShowError = true
            this.errorMgs = error.response.data.message
            this.isResendingEmail = false
          })
      }
    },
  
}
</script>