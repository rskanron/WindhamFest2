<template>
    <div>
        <p>Slug Page</p>
        <component v-bind:is="componentInstance" v-bind:page="page"></component>
    </div>
</template>

<script>
    export default {
        asyncData({params, error, payload}) {
            console.log("Is Server: " + process.server)
            console.log('PAYLOAD')
            console.log(payload)
            if (payload) {
                return {
                    page: payload                
                }
            } else if(process.server) {
                console.log(params)
                var pages = JSON.parse(require('fs').readFileSync('./butter_content/allSiteContent.json', 'utf8'));
                console.log(pages)
                return {
                    page: pages.data.find(p => p.slug == params.slug)
                }
            }
        },
        computed: {
            componentInstance () {
                console.log("COMPUTING INSTANCE")
                console.log(this.page)
                if (this.page && this.page.page_type) {
                    const pageType = this.page.page_type;
                    const moduleName = pageType[0].toUpperCase() + pageType.slice(1);
                    return () => import(`../components/${moduleName}.vue`)
                } 
            }
        }, 
    }
</script>