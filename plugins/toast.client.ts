import ToastService from "primevue/toastservice"

export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.use(ToastService)
    const toast = useToast()

    return {
        provide: {
            toast: toast
        }
    }
})