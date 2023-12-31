<template>
    <component
        :is="componentName"
        :class="componentClasses" 
        :disabled="disabled"
        v-bind="$attrs"
    >
        <div class="btn__content">
            <div v-if="icon" class="icon-container">
                <img :src="iconSrc" alt="Button icon">
            </div>
            <span class="btn__label fw-bold">{{ label }}</span>
        </div>
    </component>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: 'primary'
    },
    routerLink: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const componentName = computed(() => props.routerLink ? 'router-link' : 'button')
const componentClasses = computed(() => ([
    'btn', 
    props.color, 
    { 'icon-btn': !!props.icon },
]))

const iconSrc = computed(() =>  new URL(`../../assets/imgs/${props.icon}`, import.meta.url).href)

</script>

<style lang="scss" scoped>
.btn {
    display: flex;
    align-items: center;
    color: #fff;
    border-radius: 24px;
    padding: 1.5rem;
    border: none;
    height: 48px;
    cursor: pointer;
    transition: all .2s ease;
    text-decoration: none;

    &__content {
        @include flex(center, flex-start, 16px);
    }

    &__label {
        letter-spacing: -0.25px;
    }
}

.icon-btn {
    padding: 0.5rem 1.125rem 0.5rem 0.5rem;
}

.icon-container {
    @include flex-center;
    width: 32px;
    height: 32px;
    background-color: #fff;
    border-radius: 50%;
}

.primary {
    background-color: $primary-color;
    &:hover {
        background-color: $primary-light-color;
    }
}

.danger {
    background-color: $danger-color;
    &:hover {
        background-color: #FF9797;
    }
}

.secondary-light {
    background-color: #F9FAFE;
    color: $secondary-light-color;
    &:hover {
        background-color: $light-color;
    }
}

.secondary-dark {
    background-color: $secondary-dark-color;
    color: $secondary-color;
    &:hover {
        background-color: #0C0E16;
    }
}
</style>