import './public-path';
import Vue, { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// createApp(App).use(store).use(router).mount("#app");
let instance: Vue.App<Element>

interface IRenderProps {
    container: Element | string
}
function render(props: IRenderProps) {
    const { container } = props
    instance = createApp(App)
    instance.use(store)
    instance.use(router)
    instance.mount(
        container instanceof Element ? (container.querySelector('#app') as Element) : '#app'
    )
}

// 独立运行时
// @ts-ignore: Unreachable code error
if (!window.__POWERED_BY_QIANKUN__) {
  render({ container: '#app'});
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props: IRenderProps) {
  console.log('[vue] props from main framework', props)
  render(props);
}
export async function unmount() {
  instance.unmount()
}