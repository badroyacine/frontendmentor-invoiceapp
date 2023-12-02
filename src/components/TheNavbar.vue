<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const { getters, dispatch } = useStore()

const mode = computed(() => getters.getAppMode)

const updateMode = (mode) => {
    document.documentElement.setAttribute('data-theme', mode)
    dispatch('updateAppMode', mode)
}

</script>

<template>
    <nav class="navbar">
        <div class="navbar__logo">
            <img src="@/assets/imgs/logo.svg" alt="Logo icon">
        </div>
        <div class="navbar__actions">
            <div class="navbar-item">
                <img 
                    v-if="mode === 'light'"
                    src="@/assets/imgs/icon-moon.svg" 
                    @click="updateMode('dark')" 
                    alt="Moon Icon"
                    style="cursor: pointer;"
                >
                <img 
                    v-else
                    src="@/assets/imgs/icon-sun.svg" 
                    @click="updateMode('light')" 
                    alt="Sun Icon"
                    style="cursor: pointer;"
                >
            </div>
            <div class="spacer"></div>
            <div class="navbar-item">
                <img src="@/assets/imgs/image-avatar.jpg" class="navbar__avatar" alt="Avatar Icon">
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.navbar {
    @include flex(center, space-between, 40px);
    background-color: $navbar-bg-color;
    height: 80px;

    @include breakpoint(lg) {
        flex-direction: column;
        height: 100vh;
        width: 103px;
        border-radius: 0 20px 20px 0;
    }

    &__logo {
        @include flex-center;
        position: relative;
        width: 80px;
        height: 100%;
        background-color: $primary-color;
        border-radius: 0 20px 20px 0;
        overflow: hidden;

        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            background-color: $primary-light-color;
            width: 100%;
            height: 100%;
            z-index: 2;
            border-radius: 20px 0 0 20px;
        }

        img {
            width: 31px;
            z-index: 10;
            @include breakpoint(lg) {
                width: 40px;
            }
        }

        @include breakpoint(lg) {
            width: 100%;
            height: 103px;
        }
    }

    &__actions {
        display: flex;
        align-items: center;
        height: 100%;

        @include breakpoint(lg) {
            flex-direction: column;
            height: auto;
        }
    }

    &__avatar {
        border-radius: 50%;
        width: 32px;
        height: 32px;
        @include breakpoint(lg) {
            width: 40px;
            height: 40px;
        }
    }
}

.navbar-item {
    padding: 1.5em 2em;
}

.spacer {
    width: 1px;
    height: 100%;
    background-color: #494E6E;

    @include breakpoint(lg) {
        width: 100%;
        height: 1px;
    }
}
</style>