<script setup>
defineProps({
    items: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <div v-for="item in items" :key="item.name" class="item mb-24">
        <div>
            <div class="item__name fw-bold mb-8">{{ item.name }}</div>
            <div class="text-secondary fw-bold">{{ item.qty }} x £{{ item.price }}</div>
        </div>
        <div class="fw-bold">£{{ item.total }}</div>
    </div>   
</template>

<style lang="scss" scoped>
.item {
    @include flex(center, space-between);

    &:last-child {
        margin-bottom: 0.5rem;
    }

    &__name {
        @include custom-text(fs(default), $main-color, 15px, -0.25px, fw(bold));
    }
}

.text-secondary {
    @include custom-text(fs(default), $input-label-color, 15px, -0.25px);
}

</style>