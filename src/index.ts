import applyTheMask from './applyTheMask';

export default {
  inserted(el: HTMLInputElement, { value }: { value: string }): void {
    if (!(/input/i).test(el.tagName) || !(/text/i).test(el.type)) {
      console.warn('v-mask: Element with mask directive needs to be a text input to work appropriately.', el);
      return;
    }

    if (value.length === 0) {
      console.warn('v-mask: Element with mask directive needs a mask value to work appropriately.', el);
      return;
    }

    if (el.getAttribute('mask-placeholder') !== 'false') {
      el.placeholder = value;
    }

    el.value = applyTheMask(el.value, value);
    el.dispatchEvent(new CustomEvent('input'));
  },

  bind(el: HTMLInputElement, { value }): void {
    if (!(/input/i).test(el.tagName) || !(/text/i).test(el.type) || value === 0) { return; }

    el.addEventListener('input', (e: InputEvent): void => {
      if ((/(delete|backspace)/i).test(e.inputType) || !e.isTrusted) { return; }
      el.value = applyTheMask(el.value, value);
      el.dispatchEvent(new CustomEvent('input'));
    });
  },
};
