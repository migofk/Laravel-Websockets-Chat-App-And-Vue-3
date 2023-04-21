<template>
<section class="h-100 h-custom bg-light min-h-content" >
    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col d-flex justify-content-center align-items-center">
                    
                <div class="card border-0 " style="min-width:350px; max-width:500px">
                    <div class="card-body">
                        <h3 class="mb-4">Sign up</h3>
                        <hr/>
                        
                       
                        <form @submit="onSubmit">
                            <!-- Input--------------------->
                            <div class="mb-3">
                                <label class="form-label">First name</label>
                                <input type="text" class="form-control"
                                    v-model.trim="form.first_name"
                                    @input="setTouched('first_name')"
                                    :class="v$.form.first_name.$error?'is-invalid':''"
                                >
                                <div v-for="error of v$.form.first_name.$errors" class="invalid-feedback"  :key="error.$uid"> 
                                    {{ error.$message }}
                                </div>
                               
                            </div>
                            <!-- Input--------------------->
                            <div class="mb-3">
                                <label class="form-label">Last name</label>
                                <input type="text" class="form-control"
                                    v-model.trim="form.last_name"
                                    @input="setTouched('last_name')"
                                    :class="v$.form.last_name.$error?'is-invalid':''"
                                >
                                <div v-for="error of v$.form.last_name.$errors" class="invalid-feedback"  :key="error.$uid"> 
                                    {{ error.$message }}
                                </div>

                            </div>
                            <!-- Input--------------------->
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control"
                                    v-model.trim="form.email"
                                    @input="setTouched('email')"
                                    :class="v$.form.email.$error?'is-invalid':''"
                                >
                                <div v-for="error of v$.form.email.$errors" class="invalid-feedback"  :key="error.$uid"> 
                                    {{ error.$message }}
                                </div>

                            </div>
                            <!-- Input--------------------->
                            <div class="mb-3">
                                <label class="form-label">Age</label>
                                <input type="number" step="1" class="form-control"
                                    v-model.trim="form.age"
                                    @input="setTouched('age')"
                                    :class="v$.form.age.$error?'is-invalid':''"
                                >
                                <div v-for="error of v$.form.age.$errors" class="invalid-feedback"  :key="error.$uid"> 
                                    {{ error.$message }}
                                </div>

                            </div>
                            <!-- Input--------------------->
                            <div class="mb-3">
                                <label class="form-label">Start date</label>
                                <input type="date" step="1" class="form-control"
                                    v-model.trim="form.startDate"
                                    @input="setTouched('startDate')"
                                    :class="v$.form.startDate.$error?'is-invalid':''"
                                >
                                <div v-for="error of v$.form.startDate.$errors" class="invalid-feedback"  :key="error.$uid"> 
                                    {{ error.$message }}
                                </div>

                            </div>
                            <!-- Input--------------------->
                            <div class="mb-3">
                                <label class="form-label">End Date</label>
                                <input type="date" class="form-control"
                                    v-model.trim="form.endDate"
                                    @input="setTouched('endDate')"
                                    :class="v$.form.endDate.$error?'is-invalid':''"
                                >
                                <div v-for="error of v$.form.endDate.$errors" class="invalid-feedback"  :key="error.$uid"> 
                                    {{ error.$message }}
                                </div>

                            </div>
                            <!-- Input--------------------->
                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <input type="password" class="form-control"
                                    v-model.trim="form.password"
                                    @input="setTouched('password')"
                                    :class="v$.form.password.$error?'is-invalid':''"
                                >
                                <div v-for="error of v$.form.password.$errors" class="invalid-feedback"  :key="error.$uid"> 
                                    {{ error.$message }}
                                </div>

                            </div>
                            <!-- Input--------------------->
                            <div class="mb-3">
                                <label class="form-label">Repeat your password</label>
                                <input type="password" class="form-control"
                                    v-model.trim="form.confirmPassword"
                                    @input="setTouched('confirmPassword')"
                                    :class="v$.form.confirmPassword.$error?'is-invalid':''"
                                >
                                <div v-for="error of v$.form.confirmPassword.$errors" class="invalid-feedback"  :key="error.$uid"> 
                                    {{ error.$message }}
                                </div>
                            </div>
                            <div class="mb-3 text-center">
                                <button class="btn btn-primary" type="submit">Submit</button>
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

import useVuelidate from '@vuelidate/core'
import { required, email, sameAs, between, minValue, maxValue, alpha, numeric, minLength ,maxLength, helpers} from '@vuelidate/validators'

const dateBefore = (value) => {
    console.log(value)
    return new Date(value) > new Date()
}

export default {
  name: 'Registration',
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        email: '',
        age:'',
        startDate:null,
        endDate:null,
        password: '',
        confirmPassword: '',
      },
    }
  },
  validations() {
        return {
          form: {
            first_name: {
                required,
                alpha,
                minLength: minLength(3),
                maxLength: maxLength(15)
            },
            last_name: {
                required,
                alpha:helpers.withMessage('seriously a number in your name', alpha),
                minLength: minLength(3),
                maxLength: maxLength(15)
            },
            email: {
                required,
                email
            },
            age: {
                required,
                between: between(18,45)
            },
            startDate: {
                required,
                dateAfter: helpers.withMessage('The date must be after today', dateBefore), 
            },
            endDate: {
                required,
                minValue: helpers.withMessage('End date must be after the start date', value => {
                console.log(value)
                return new Date(value) > new Date(this.form.startDate)
                }), 
            },
            password: {
                required,
            },
            confirmPassword: {
                required,
                confirmPassword: sameAs(this.form.password)
            },
          },
        }
  },
  methods: {
    setTouched(theModel) {
        if(theModel == 'first_name' || theModel == 'all'){this.v$.form.first_name.$touch()} 
        if(theModel == 'last_name' || theModel == 'all'){this.v$.form.last_name.$touch()} 
        if(theModel == 'email' || theModel == 'all' ){this.v$.form.email.$touch()}
        if(theModel == 'age' || theModel == 'all'){this.v$.form.age.$touch()} 
        if(theModel == 'startDate' || theModel == 'all'){this.v$.form.startDate.$touch()} 
        if(theModel == 'endDate' || theModel == 'all'){this.v$.form.endDate.$touch()} 
        if(theModel == 'password' || theModel == 'all'){this.v$.form.password.$touch()} 
        if(theModel == 'confirmPassword' || theModel == 'all'){this.v$.form.confirmPassword.$touch()}
    },
   async onSubmit(event) {
        event.preventDefault()
        this.setTouched('all');
        if (!this.v$.$invalid) 
        {
            alert('all Good')
        }
    },
  },
}
</script>