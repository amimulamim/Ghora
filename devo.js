var data = {
    key1: "value1",  key2: "value2"
  };
async function sendresponse() {
    console.log('before fetch ');
    await fetch('http://localhost:4000/user/requests', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: data,
    });
    console.log('after fetch ');
}
console.log('in devo');

sendresponse();