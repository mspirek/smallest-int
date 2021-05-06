<script>
export default {

  data: () => ({
    arr: [1, 3, 6, 4, 1, 2],
    customArray: '',
    number: '',
    result: '',
    error: null,
    benchmark: null,
    testCase: 'standard',
  }),

  methods: {
    // This simply works thru the array. It is slightly more efficient when working with arrays
    smallestIntArray () {
      // find the max
      const max = Math.max(...this.arr);

      // return early if the max is negative
      if (max <= 0) {
        return 1;
      }

      // iterate through the array
      for (let i = 1; i <= max; i++) {
        if (!this.arr.includes(i)) {
          return i;
        }
      }

      // if the smallestInt is outside the array
      return max + 1;
    },
    // This method converts the array to a set
    // This works more efficiently on large set where the smallestInt can be late in the loop.
    // This is why I chose to use this one.
    smallestInt () {
      // find the max
      const max = Math.max(...this.arr);

      // return early if the max is negative
      if (max <= 0) {
        return 1;
      }

      // convert Array to Set
      const set = new Set(this.arr);

      // iterate through the Set
      for (let i = 1; i <= max; i++) {
        if (!set.has(i)) {
          return i;
        }
      }

      // if the smallestInt is outside the array
      return max + 1;
    },
    submit () {
      // Using native browser performance
      performance.mark('start');
      this.result = this.smallestInt();
      performance.mark('end');
      performance.measure('benchmark', 'start', 'end');
      this.benchmark = performance.getEntriesByName('benchmark');
      performance.clearMeasures('benchmark');
    },
    setArray () {
      if (this.testCase === 'standard') {
        this.arr = [1, 3, 6, 4, 1, 2];
      }

      if (this.testCase === 'negative') {
        this.arr = [-1, -3, -4, -1000];
      }

      if (this.testCase === 'longest') {
        this.createLongArray();
      }

      if (this.testCase === 'worst') {
        this.createWorstArray();
      }

      if (this.testCase === 'own') {
        this.error = null;

        if (!this.customArray.length > 0) {
          this.error = 'You must add numbers to array.';
          return;
        }

        // Normalize this data
        const customArray = this.customArray.replace(/\s/g, '').split(',').map(x => +x);
        let outOfBounds = false;

        customArray.forEach((item) => {
          if (item < -1000000 || item > 1000000) {
            outOfBounds = true;
          }
        });

        if (outOfBounds) {
          this.error = 'Numbers must be between -1000000 and 1000000.';
          return;
        }

        this.arr = customArray;
      }

      this.submit();
    },
    createWorstArray () {
      this.arr = Array.from({ length: 100000 }, (val, idx) => idx + 1);
    },
    createLongArray () {
      this.arr = Array.from({ length: 100000 }, () => Math.floor(Math.random() * (1000000 - -1000000) + -1000000));
    },
  },
};
</script>

<template>
  <div class="container py-8 flex flex-col items-center">
    <div class="font-bold pb-2">
      Choose your test case:
    </div>
    <fieldset class="pb-8">
      <div class="bg-white rounded-md -space-y-px">
        <label class="border-gray-200 rounded-tl-md rounded-tr-md relative border p-4 flex cursor-pointer">
          <input
            v-model="testCase"
            type="radio"
            name="test-case"
            value="standard"
            class="h-4 w-4 mt-0.5 cursor-pointer text-blue-600 border-gray-300 focus:ring-blue-500"
          >
          <div class="ml-3 flex flex-col">
            <span
              class="text-gray-900 block text-sm font-medium"
            >
              Standard case
            </span>
            <span
              class="text-gray-500 block text-sm"
            >
              [1, 3, 6, 4, 1, 2] should return 5
            </span>
          </div>
        </label>

        <label class="border-gray-200 relative border p-4 flex cursor-pointer">
          <input
            v-model="testCase"
            type="radio"
            name="test-case"
            value="negative"
            class="h-4 w-4 mt-0.5 cursor-pointer text-blue-600 border-gray-300 focus:ring-blue-500"
          >
          <div class="ml-3 flex flex-col">
            <span
              class="text-gray-900 block text-sm font-medium"
            >
              Negative case
            </span>
            <span
              class="text-gray-500 block text-sm"
            >
              [-1, -3, -4, -1000] should return 1
            </span>
          </div>
        </label>

        <label class="border-gray-200 relative border p-4 flex cursor-pointer">
          <input
            v-model="testCase"
            type="radio"
            name="test-case"
            value="longest"
            class="h-4 w-4 mt-0.5 cursor-pointer text-blue-600 border-gray-300 focus:ring-blue-500"
          >
          <div class="ml-3 flex flex-col">
            <span
              class="text-gray-900 block text-sm font-medium"
            >
              Longest Case
            </span>
            <span
              class="text-gray-500 block text-sm"
            >
              100000 entry array where N is a <br>
              random number between -1000000 and 1000000
            </span>
          </div>
        </label>
        <label class="border-gray-200 relative border p-4 flex cursor-pointer">
          <input
            v-model="testCase"
            type="radio"
            name="test-case"
            value="worst"
            class="h-4 w-4 mt-0.5 cursor-pointer text-blue-600 border-gray-300 focus:ring-blue-500"
          >
          <div class="ml-3 flex flex-col">
            <span
              class="text-gray-900 block text-sm font-medium"
            >
              Worst Case
            </span>
            <span
              class="text-gray-500 block text-sm"
            >
              A sequential array [1 to 100000] <br>
              the lowest number is outside the array so should return 100001
            </span>
          </div>
        </label>
        <label class="border-gray-200 rounded-bl-md rounded-br-md relative border p-4 flex cursor-pointer">
          <input
            v-model="testCase"
            type="radio"
            name="test-case"
            value="own"
            class="h-4 w-4 mt-0.5 cursor-pointer text-blue-600 border-gray-300 focus:ring-blue-500"
          >
          <div class="ml-3 flex flex-col">
            <span
              class="text-gray-900 block text-sm font-medium"
            >
              Enter your own
            </span>
            <span
              class="text-gray-500 block text-sm"
            >
              Use the input box to enter your own array.<br>
              Use comma separate values between -1,000,000 and 1,000,000.
            </span>
            <div
              v-if="testCase === 'own'"
              class="pt-4"
            >
              <label
                for="array"
                class="block text-sm font-medium text-gray-700"
              >
                Add your own array
              </label>
              <div class="mt-1">
                <input
                  v-model="customArray"
                  type="text"
                  name="test-case"
                  class="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 border py-2 px-2 rounded-md w-full"
                  placeholder="1,2,3,4"
                >
              </div>
              <div
                v-if="error"
                class="text-sm text-red-700 pb-4"
              >
                {{ error }}
              </div>
            </div>
          </div>
        </label>
      </div>
    </fieldset>

    <div
      v-if="result"
      class="pb-4"
    >
      <span class="font-semibold">result:</span> {{ result }}
    </div>
    <div
      v-if="benchmark"
      class="pb-4"
    >
      <span class="font-semibold">benchmark:</span> {{ benchmark[0].duration.toFixed(4) }}ms
    </div>

    <div class="pt-8">
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        @click="setArray"
      >
        Submit
      </button>
    </div>
  </div>
</template>
