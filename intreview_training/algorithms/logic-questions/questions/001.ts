function findMissingNumber(num_array: number[]): number {
    // validation if this is an array
    if(!Array.isArray(num_array)){
        throw new TypeError('it should be an array');
    }
    
    if(!num_array.every(n => typeof n === 'number')){
        throw new TypeError('all elements should be numbers');
    }


    // Your implementation here

    let missing = num_array.length;
    missing = missing ^ num_array.reduce((acc, num, index) => acc ^ index ^ num );

    return missing;
}

console.log(findMissingNumber([0, 1, 2, 3, 4, 5, 6, 8, 9]));