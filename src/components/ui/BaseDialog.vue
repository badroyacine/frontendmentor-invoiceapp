<template>
    <div class="overlay">
        <div class="dialog">
            <h3 class="dialog__title">{{ title }}</h3>
            <p class="dialog__content mt-12 mb-14">{{ content }}</p>
            <div class="dialog__actions">
                <BaseButton
                    label="Cancel"
                    color="secondary-light"
                    @click="closeDialog"
                    :disabled="actionsDisabled"
                ></BaseButton>
                <BaseButton 
                    :color="actionBtnColor"
                    :label="actionBtnText"
                    @click="actionClick"
                    :disabled="actionsDisabled"
                ></BaseButton>
            </div>
        </div>
    </div>
</template>

<script setup>

const emit = defineEmits(['closeDialog', 'actionClick'])
defineProps({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    actionBtnText: {
        type: String,
        required: true
    },
    actionBtnColor: {
        type: String,
        default: 'primary'
    },
    actionsDisabled: {
        type: Boolean,
        default: false
    }
})

const closeDialog = () => emit('closeDialog')
const actionClick = () => emit('actionClick')

</script>

<style lang="scss" scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(#000000, 0.5);
    width: 100vw;
    height: 100vh;
}

.dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: $list-item-bg-color;
    width: 90%;
    max-width: 480px;
    border-radius: 8px;
    padding: 3em;

    &__title {
        @include custom-text(fs(xl), $main-color, 32px, -0.5px, 700);
    }

    &__content {
        @include custom-text(fs(sm), $main-text-color, 22px, -0.1px);
    }

    &__actions {
        @include flex(center, flex-end, 8px);
    }
}
</style>