<template>
    {{ id }}
</template>

<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})
</script>