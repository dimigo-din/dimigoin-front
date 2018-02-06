<script>

const breakfast = new Date(new Date().setHours(7, 50, 0))
const lunch = new Date(new Date().setHours(13, 10, 0))
const dinner = new Date(new Date().setHours(18, 50, 0))

export default {
    name: 'DimiMealItem',

    props: {
        breakfast: Boolean,
        lunch: Boolean,
        dinner: Boolean,
        snack: Boolean
    },

    computed: {
        meal () {
            if (this.breakfast) return ['b', '아침']
            if (this.lunch) return ['l', '점심']
            if (this.dinner) return ['d', '저녁']
            if (this.snack) return ['s', '간식']
        },

        isCurrent () {
            const now = new Date()

            return true
        },

        computedClass () {
            return {
                'c-meal-item': true,
                'c-meal-item--current': this.isCurrent
            }
        },

        title () {
            return this.meal[1]
        },

        content () {
            return '고추참치 / 붕어빵 / 호떡 / 이천쌀밥 / 고무고무 / 꼬깔콘 / 도미노피자 1조각 / 프라랑스 야쿠르트 / 도완김'
        }
    }
}
</script>

<template>
    <div :class="computedClass">
        <h4 class="c-meal-item__title">
            {{ meal[1] }}
        </h4>
        <div class="c-meal-item__content">
            {{content}}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../scss/helpers/typography';

.c-meal-item {
    @extend .h-text-gray;
    word-break: keep-all;
    &:not(:last-child, :first-child) {
        margin: 1.5em 0 1.5em 0;
    }

    &__title {
        @extend .h-text-m;
        @extend .h-font-bold;
        margin-bottom: .5em;
    }
    &__content {
        @extend .h-font-regular;
        line-height: normal;
    }

    &--current {
        & .c-meal-item__title {
            @extend .h-text-red;
        }

        & .c-meal-item__content {
            @extend .h-text-black;
        }
    }
}

</style>
