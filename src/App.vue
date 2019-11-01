<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
html {
  background: #ebebeb;
  // height: 100%;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none !important;
  }
}

body {
  // min-height: 100vh;
}

body, p, div, ul, li, h2, h3 {
  padding: 0;
  margin: 0;
  text-align: left;
  color: #333;
}
li {
  list-style: none;
}
button {
  border: none;
  background: none;
}
table {
  caption {
    display: none;
  }
}

* {
  box-sizing: border-box;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  ::-webkit-scrollbar {
    display: none;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  // min-height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
