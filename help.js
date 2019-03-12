let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("result");
    }, 1000);
})

promise.than(result => {
    alert("Fulfilled: " + result);
},
error => {
    alert(error);
});
