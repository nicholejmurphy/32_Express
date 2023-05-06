const ExpressError = require("./expressErrors");

function validateNums(str) {
  let arr = str.split(",");
  let nums = [];
  for (let i = 0; i < arr.length; i++) {
    let num = Number(arr[i]);
    if (!num) {
      throw new ExpressError(`Invalid Number: ${arr[i]}`, 400);
    }
    nums.push(num);
  }
  return nums;
}

function findMean(nums) {
  let sum = 0;
  for (let num of nums) {
    sum += num;
  }
  let mean = sum / nums.length;
  return mean;
}

function findMedian(nums) {
  nums.sort((a, b) => a - b);
  let median;
  let midIdx = Math.floor(nums.length / 2);
  if (nums.length % 2 === 0) {
    median = (nums[midIdx - 1] + nums[midIdx]) / 2;
  } else {
    median = nums[midIdx];
  }
  console.log(median);
  return median;
}

function numsFrequency(nums) {
  let numCount = nums.reduce((acc, next) => {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
  return numCount;
}

function findMode(nums) {
  const numCount = numsFrequency(nums);
  let count = 0;
  let freqNum;
  for (let num in numCount) {
    if (numCount[num] > count) {
      freqNum = num;
      count = numCount[num];
    }
  }
  return freqNum;
}

module.exports = {
  validateNums,
  findMean,
  findMedian,
  findMode,
};
