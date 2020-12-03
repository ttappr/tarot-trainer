
// --- Regular worker ---

// This call receives messages from the client.
function onmessage(e) {
    postMessage("done");
}

// Example function to attach from caller's code:
// worker.onerror = errorHandler;
function errorHandler(e) {
    // e.preventDefault();
    // e.message; e.filename; e.lineno
}

// --- Shared worker ---

// A worker that more than one client connects to supports this call.
// 
function onconnect(e) {
    let port = e.ports[0];
    port.onmessage = (e) => {
        let workerResult = "Result: "+ (e.data[0] * e.data[1]);
        port.postMessage(workerResult);
    }
}

// Dedicated worker: let  w = new Worker("worker.js");
// Shared worker   : let sw = new SharedWorker("worker.js");

