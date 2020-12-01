fe.file((f) => {
    var reader = new FileReader();
    reader.onloadend = () => {
        console.info(this.result)
    };
    reader.readAsText(f);
}, (e) => {
    console.info(e);
})