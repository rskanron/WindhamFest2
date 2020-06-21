// import Vue from 'vue'
// import _ from 'lodash'
// console.log("RUNNING COMPONENT LOADER")
// const components = require.context('@/components', false, /[a-zA-Z]\w+\.(vue)$/) 
// _.forEach(components.keys(), fileName => {
//     const componentConfig = components(fileName)
//     const componentName = fileName.split('/').pop().split('.')[0]
//     console.log("REGISTERING COMPONENT: " + componentName)
//     Vue.component(componentName, componentConfig.default || componentConfig) 
// })