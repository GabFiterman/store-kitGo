<template>
    <q-page padding>
        <q-form class="row justify-center" @submit.prevent="handleLogin">
            <div
                class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md q-mt-md text-secondary"
            >
                <p class="text-h5 text-center text-bold">Login</p>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
                <q-input label="Email" v-model="form.email" />

                <q-input label="Password" v-model="form.password" />

                <div class="full-width q-pt-md">
                    <q-btn
                        label="login"
                        color="primary"
                        class="full-width"
                        outline
                        rounded
                        type="submit"
                    />
                </div>

                <div class="full-width q-pt-md">
                    <q-btn
                        label="Register"
                        color="primary"
                        class="full-width"
                        flat
                        to="/register"
                    />
                </div>
            </div>
        </q-form>
    </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "../composables/UseAuthUser";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "IndexPage",

    onMounted() {
        console.log("Mounted LOGIN");
    },

    setup() {
        const router = useRouter();
        const { login } = useAuthUser();

        const form = ref({
            email: "",
            password: "",
        });

        const handleLogin = async () => {
            try {
                await login(form.value);
                router.push({ name: "me" });
            } catch (error) {
                throw new error(error.message);
            }
        };

        return {
            form,
            handleLogin
        };
    },
});
</script>
