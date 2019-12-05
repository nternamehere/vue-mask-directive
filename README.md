# vue-masked-directive

This is an updated package based off of [vue-the-mask](https://github.com/vuejs-tips/vue-the-mask). This is used for the purposes of directives as the favored usage in place of the component method.

## Usage
In main.js, add the following lines:
```
import mask from 'vue-masked-directive';

Vue.directive('mask', mask);
```

Then in your components you can access the directive by doing the following:
```
<input id="phone-number" v-mask="'###-###-####'" type="text" v-model="number" />
```

This will mask that input by adding hyphens where requested. The model will have the mask included in the value, so this package has a helper method to get you the raw version.

There are two ways to get the raw input:

### 1.

The directive will inject the raw value directly onto the element with the v-mask directive by the name of mask-raw-value:
```
const rawNumber = document.getElementById('phone-number').getAttribute('mask-raw-value');
```

### 2.

There is a helper function avaliable off of the package for the usage of de-masking:

```
import { demask } from 'vue-masked-directive';

const rawNumber = demask(this.number, '###-###-####');
```
