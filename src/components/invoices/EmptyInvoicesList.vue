<template>
    <div class="empty-invoices text-center">
        <img src="@/assets/imgs/illustration-empty.svg" alt="No invoices image">
        <h3 class="empty-invoices__title mt-65 mb-22 mb-md-42">There is nothing here</h3>
        <p class="empty-invoices__text">
            Create an invoice by clicking the <span class="fw-bold">New Invoice</span> button and get started
        </p>
    </div>
</template>

<style lang="scss" scoped>

.empty-invoices {
  width: 90%;
  max-width: 245px;
  margin: 0 auto;
  margin-top: calc((100vh - 150px - 350px - 32px) / 2);

  &__title {
    @include custom-text(fs(xl), $main-color, 1, -0.75px, 700);
  }

  &__text {
    @include custom-text(fs(sm), $main-text-color, 15px, -0.1px);
  }
}
</style>