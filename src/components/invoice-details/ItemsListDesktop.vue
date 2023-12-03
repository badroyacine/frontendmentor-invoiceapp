<script setup>
defineProps({
    items: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <div class="item header">
        <div class="item__name">Item Name</div>
        <div class="text-center">QTY.</div>
        <div>Price</div>
        <div>Total</div>
    </div>
    <div v-for="item in items" :key="item.name" class="item">
        <div class="item__name fw-bold">{{ item.name }}</div>
        <div class="text-secondary fw-bold text-center">{{ item.qty }}</div>
        <div class="text-secondary fw-bold">£{{ item.price }}</div>
        <div class="fw-bold">£{{ item.total }}</div>
    </div>
</template>

<style lang="scss" scoped>

.header{
    @include custom-text(fs(default), $input-label-color, 18px, -0.1px);
}

.item {
    @include flex(center, space-between);
    text-align: end;
    margin-bottom: 2rem;

    &:last-child {
        margin-bottom: 0.5rem;
    }

    > div {
        flex: 1;
    }

    &__name {
        flex: 3 !important;
        text-align: left;
    }
}

.text-secondary {
    @include custom-text(fs(default), $input-label-color, 15px, -0.25px);
}
</style>