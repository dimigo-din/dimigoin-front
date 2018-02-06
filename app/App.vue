<script>
import './scss/theme.scss'

import DimiButton from './components/DimiButton.vue'
import DimiCard from './components/DimiCard.vue'
import DimiMeal from './components/DimiMeal.vue'
import DimiInput from './components/DimiInput.vue'

export default {
    name: 'App',
    components: { DimiButton, DimiCard, DimiMeal, DimiInput }
}
</script>

<template>
    <div id="app">
        <div class="container">
            <dimi-card class="c-login" shadow style="width: 100%">
                <div class="c-login__section">
                    <h2 class="c-login__section__title">오늘의 급식</h2>
                    <div class="c-login__section__content">
                        <dimi-meal></dimi-meal>
                    </div>
                </div>
                <div class="c-login__section">
                    <h2 class="c-login__section__title">Login</h2>
                    <div class="c-login__section__content form">
                        <dimi-input placeholder="아이디"></dimi-input>
                        <dimi-input placeholder="비밀번호"></dimi-input>
                        <dimi-button large class="c-login__section__content__login-btn">LOGIN</dimi-button>
                    </div>
                </div>
            </dimi-card>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    margin: 0 auto;
    position: relative;
    max-width: 1024px;
    height: 100vh;
}

.c-login {
    display: flex;
    justify-content: center;
    &__section {
        width: 50%;
        padding: 4em;
        &:not(:last-child) {
            border-right: solid 1px $gray-light;
        }
        &__title {
            font-size: 2.25em;
            @include font-extra-bold;
        }
        &__content {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-top: 1em;
            min-height: 100%;
            // Due to css priority rules.
            & .c-login__section__content__login-btn {
                top: 2em;
                align-self: center;
                padding: .625em 2.75em;
            }
        }
    }
}
</style>
