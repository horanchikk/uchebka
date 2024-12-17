<script setup lang="ts">
import type { TForm } from '@/types/form'

import { Form } from '@primevue/forms';
import { yupResolver } from '@primevue/forms/resolvers/yup'
import { object, string } from 'yup';


const { api } = useApi()
const { $toast } = useNuxtApp()

const authSchema = object({
  login: string().min(3, 'Минимальное кол-во символов: 3.').max(15, 'Вы достигли максимального кол-во символов - 15.').required("Введите логин"),
  password: string().min(7, 'Минимальное кол-во символов: 7.').max(15, 'Вы достигли максимального кол-во символов - 15.').required("Введите пароль"),
})
const resolver = yupResolver(authSchema)

const isAuthorization = ref(true)
const isLoading = ref(false)

async function onFormSubmit(val: TForm) {
  $toast.removeAllGroups();

  if (val.valid) {
    isLoading.value = true
    await api(isAuthorization.value ? "/user/auth" : "/user/register", {
      method: "POST",
      body: {
        login: val.values.login,
        password: val.values.password,
      }
    })
      .then((res) => {
        $toast.add({
          severity: "success", summary: isAuthorization ? "Процесс авторизации завершён" : "Процесс регистрации завершён", detail: `JWT: ${res.response}`, life: 3000
        })
      })
      .catch(err => {
        if (err.status >= 400 && err.status < 500) {
          $toast.add({
            severity: "error", summary: "Ошибка запроса", detail: err.response._data.message, life: 3000
          })
        } else if (err.status >= 500) {
          $toast.add({
            severity: "error", summary: "Ошибка запроса", detail: "Возникла ошибка на сервере. Попробуйте позже.", life: 3000
          })
        } else {
          $toast.add({
            severity: "error", summary: "Ошибка запроса", detail: "Возникла ошибка запроса. Проверьте devtools для детальной информации.", life: 3000
          })  
        }
      })
      .finally(() => isLoading.value = false)
  } else {
    $toast.add({
      severity: "error", summary: "Ошибка формы", detail: "Проверьте все поля на соответствие.", life: 3000
    })
  }
}

const switchForm = () => isAuthorization.value = !isAuthorization.value
</script>

<template>
  <Toast />

  <div class="overflow-hidden">
    <Transition>
      <ProgressBar v-if="isLoading" mode="indeterminate" style="height: 2px" class="fixed top-0 left-0 w-screen" />
    </Transition>

    <div class="w-screen h-screen absolute top-0 left-0 flex flex-col items-center justify-center gap-3">
      <Form v-slot="$form" :resolver="resolver" :validateOnSubmit="['login', 'password']" @submit="onFormSubmit" class="w-2/3 md:w-1/3 flex flex-col items-center justify-center gap-3 text-center">
        <h1 class="font-bold text-3xl">Добро пожаловать в систему!</h1>
        <h3>Прежде чем начать работу, пожалуйста, {{ isAuthorization ? 'войдите' : 'зарегистрируйтесь' }}.</h3>
        <div class="w-full flex flex-col gap-1">
            <InputText name="login" type="text" placeholder="Логин" fluid />
            <Message v-if="$form.login?.invalid" severity="error" variant="simple">{{ $form.login.error?.message }}</Message>
        </div>
        <div class="w-full flex flex-col gap-1">
            <Password :feedback="false" name="password" placeholder="Пароль" fluid />
            <Message v-if="$form.password?.invalid" severity="error" variant="simple">{{ $form.password.error?.message }}</Message>
        </div>
        
        <Button type="submit" class="w-full" :label="isAuthorization ? 'Войти в аккаунт' : 'Зарегистрироваться'" severity="primary" />
        <Button @click="switchForm" type="button" class="w-full" :label="isAuthorization ? 'Впервые в системе?' : 'Есть аккаунт?'" severity="secondary" />
      </Form>

    </div>
  </div>
</template>

<style>
input {
  width: 100%;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 100ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>