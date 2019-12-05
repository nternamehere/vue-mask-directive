import applyTheMask from './applyTheMask';
import demask from './demask';

export {
  applyTheMask,
  demask,
};

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

    const masked: string = applyTheMask(el.value, value);
    el.setAttribute('mask-raw-value', masked);
    el.value = masked;
    el.dispatchEvent(new CustomEvent('input'));
  },

  bind(el: HTMLInputElement, { value }: { value: string }): void {
    if (!(/input/i).test(el.tagName) || !(/text/i).test(el.type) || value.length === 0) { return; }

    el.addEventListener('input', (e: Event): void => {
      const { inputType, isTrusted } = e as InputEvent;
      if ((/(delete|backspace)/i).test(inputType) || !isTrusted) { return; }
      const masked: string = applyTheMask(el.value, value);
      el.setAttribute('mask-raw-value', masked);
      el.value = masked;
      el.dispatchEvent(new CustomEvent('input'));
    });
  },
};
