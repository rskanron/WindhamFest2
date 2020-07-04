import Vue from 'vue'
import Router from 'vue-router'
import Butter from 'buttercms';
import SimplePage from '~/components/simple'

Vue.use(Router)

export async function createRouter() {    
    const butter = Butter('b3c9a561dcfeb322516598e4f037b0ffa65a3ef1');

    let simplePagesResponse = await butter.page.list("simple");
    let simplePageRoutes = mapPagesToRoutes(simplePagesResponse.data.data, SimplePage);

    return new Router({
        mode: 'history',
        routes: simplePageRoutes
    })
}

var mapPagesToRoutes = function(pages, component) {
    var pageRoutes = [];
  
    pages.forEach((page) => {
        let componentName = page.page_type; 
        let chunkName = `pages_${componentName}_${page.slug}`;  
        var route = {
          name: page.slug,
          path: '/' + page.slug,
          component: component,
          chunkName: chunkName,
          props: page.fields,
        };
    
        pageRoutes.push(route);
    });
  
    return pageRoutes;
}