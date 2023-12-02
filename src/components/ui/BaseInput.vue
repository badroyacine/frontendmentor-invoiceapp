<script setup>

defineOptions({
    inheritAttrs: false
})

defineProps({
    label: {
        type: String,
        default: ''
    },
    modelValue: {
        type: [String, Number],
        default: ''
    },
    error: {
        type: String,
        default: ''
    }
})

</script>

<template>
    <div class="w-100" :class="{ error }">
        <label class="default-label mb-9" v-if="label" :for="label">{{ label }}</label>
        <div class="p-relative">
            <input 
                :id="label"
                class="field fw-bold"
                v-bind="$attrs"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
            >
            <div class="error__text" v-if="error">{{ error }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.field {
    font-size: $default-font-size;
    padding: 1.125em 1.25em 0.875em;
    border-radius: 4px;
    border: 1px solid $input-border-color;
    background-color: $list-item-bg-color;
    caret-color: $primary-light-color;
    color: $main-color;
    width: 100%;

    &:focus {
        border-color: $input-focus-border-color;
        outline: none;
    }
}

.error {
    .field{
        caret-color: $danger-color;
        border: 1px solid $danger-color;
    }

    label {
        color: $danger-color;
    }

    &__text {
        @include custom-text(fs(xs), $danger-color, 15px, -0.21px);
        position: absolute;
        top: 50px;
        left: 0;
    }
}
</style>