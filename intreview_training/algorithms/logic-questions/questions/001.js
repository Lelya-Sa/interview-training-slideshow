
/**
 * @param {number} nums the array of numbers
 * @returns {number} the missing number 
 * 
 */
function findMissingNumberXOR(nums){

    //type checking
    if(!Array.isArray(nums)){
        throw new TypeError('must be array'); 
    }

    if(!nums.every(num => typeof nume === 'number')){
        throw new TypeError('must ber numbers');
    }

    let missing = nums.length; 
    
    // Option 1: Traditional for loop (current approach - fixed syntax)
    // for (let i = 0; i < nums.length; i++) {
    //     missing ^= i ^ nums[i];
    // }
    
    // Option 2: for...of loop (modern, clean syntax)
    // let index = 0;
    // for (const num of nums) {
    //     missing ^= index ^ num;
    //     index++;
    // }
    
    // Option 3: forEach (functional style)
    // nums.forEach((num, index) => {
    //     missing ^= index ^ num;
    // });
    
    // Option 4: Using reduce (functional, but less intuitive for XOR)
    // missing = nums.reduce((acc, num, index) => acc ^ index ^ num, nums.length);
    
    // Using forEach (Option 3) - clean and readable
    nums.forEach((num, index) => {
        missing ^= index ^ num;
    });
    
    return missing; 
}