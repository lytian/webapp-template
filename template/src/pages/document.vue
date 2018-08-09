<template>
  <div class="fixed-box">
    <mt-header title="文档" :style="{height: 40 + $paddingTop + 'px', paddingTop: $paddingTop + 'px'}">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>

    <p>文档</p>

  </div>
</template>

<style lang="stylus" scoped>
</style>
