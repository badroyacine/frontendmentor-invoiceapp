<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineOptions({
    inheritAttrs: false
})

const emit = defineEmits(['update:modelValue'])

defineProps({
    label: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
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

const showDropdown = ref(false)
const select = ref(null)

onClickOutside(select, () => showDropdown.value = false)

const toggleDropDownMenu = () => {
    showDropdown.value = !showDropdown.value
}

const selectValue = (value) => {
    emit('update:modelValue', value)
    toggleDropDownMenu()
}


</script>

<template>
    <div class="w-100 p-relative" ref="select" :class="{ error }">
        <label class="default-label mb-9">{{ label }}</label>
        <div class="p-relative">
            <select 
                class="field fw-bold" 
                v-bind="$attrs"
                :value="modelValue" 
                @change="$emit('update:modelValue', $event.target.value)"
                @mousedown.prevent="toggleDropDownMenu()"
            >
                <option 
                    v-for="option in options" 
                    :key="option.value" 
                    :value="option.value"
                    :selected="option.value === modelValue"
                >{{ option.text }}</option>
        
            </select>
            <span class="error__text" v-if="error">{{ error }}</span>
            <img src="@/assets/imgs/icon-arrow-down.svg">
        </div>

        <ul v-if="showDropdown" class="dropdown w-100 mt-24">
            <li 
                v-for="option in options" 
                class="dropdown__item fw-bold"
                :key="option.value"
                @mousedown="selectValue(option.value)"
            >
                <span>{{ option.text }}</span>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.field {
    font-size: $default-font-size;
    padding: 1.125em 1.875em 0.875em 1.25em;
    border-radius: 4px;
    border: none;
    border: 1px solid $input-border-color;
    background-color: $list-item-bg-color;
    caret-color: $primary-light-color;
    color: $main-color;

    appearance: none;
    width: 100%;
    min-width: 150px;
    cursor: pointer;

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

img {
    position: absolute;
    top: 50%;
    right: 14px;
    pointer-events: none;
}

.dropdown {
    border-radius: 8px;
    background-color: $dropdown-bg-color;
    box-shadow: $dropdown-box-shadow;
    position: absolute;
    z-index: 10;

    &__item {
        list-style: none;
        line-height: 15px;
        padding: 1.0625em 1.5em 0.9375em;
        border-bottom: 1px solid $dropdown-border-color;
        cursor: pointer;

        &:last-child {
            border-bottom: none;
        }

        &:hover {
            > span {
                color: $primary-color;
            }
        }
    }
}

</style>