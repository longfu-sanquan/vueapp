<template>

    <Index></Index>

</template>

<script>
import Index from "./pages/Index";
export default {
  components: {
    Index
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
body {
  display: flex;
  flex-direction: column;
}
</style>
