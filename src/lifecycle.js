import { patch } from './vdom/patch';
import Watcher from './observer/watcher';

export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vNode) {
    const vm = this;
    const preVNode = vm._vNode;
    vm._vNode = vNode;
    if (!preVNode) {
      vm.$el = patch(vm.$el, vNode);
    } else {
      vm.$el = patch(preVNode, vNode);
    }
  };
}

export function mountComponent (vm) {
  callHook(vm, 'beforeMount');

  function updateComponent () {
    vm._update(vm._render());
  }

  new Watcher(vm, updateComponent, () => {}, { render: true });
  callHook(vm, 'mounted');
}

export function callHook (vm, hook) {
  const handlers = vm.$options[hook];
  if (handlers) {
    handlers.forEach(handler => handler.call(vm));
  }
}
