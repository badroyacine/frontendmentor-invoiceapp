<template>
    <div :class="`status status--${invStatus.color} text-center fw-bold`">
        <div class="bullet-point mr-8"></div>
        <span class="status__label">{{ invStatus.label }}</span>
    </div>
</template>

<script setup>
import { computed } from "vue"
import { invoiceStatus } from '@/utils/invoice-status'

const props = defineProps({
    status: {
        type: String,
        required: true
    }
})

const invStatus = computed(() => invoiceStatus.find(invStatus => invStatus.name === props.status))

</script>

<style lang="scss" scoped>
.status {
    padding: 0.8125em 0;
    border-radius: 6px;
    width: 100%;
    max-width: 104px;

    .bullet-point {
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 50%;
    }

    &--success {
        color: $success-color;
        background-color: rgba($success-color, 0.05);

        .bullet-point {
            background-color: $success-color;
        }
    }

    &--warning {
        color: $warning-color;
        background-color: rgba($warning-color, 0.05);

        .bullet-point {
            background-color: $warning-color;
        }
    }

    &--secondary {
        color: $light-color;
        background-color: rgba($light-color, 0.05);

        .bullet-point {
            background-color: $light-color;
        }
    }
}


</style>