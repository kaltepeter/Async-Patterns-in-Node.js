const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

if (isMainThread) {
  console.log(`Starting the main thread...`);

  const worker = new Worker(__filename, {
      workerData: {
          outputPrefix: 'Received message',
          timeToWaste: 500
      }
  });

  worker.on("message", (msg) => {
    console.log(`WORKER: Message: ${msg}`);
  });

  worker.postMessage("Done with my work.");

  console.log("Still in the main thread...");
} else {
  parentPort.on("message", (msg) => {
    console.log(`${workerData.outputPrefix}: ${msg}`);
  });

  parentPort.postMessage("getting started");
  wasteTime(workerData.timeToWaste);
  parentPort.postMessage("in the middle");
  wasteTime(workerData.timeToWaste);
  parentPort.postMessage("all done");
}

function wasteTime(delay) {
  const end = Date.now() + delay;
  while (Date.now() < end) {}
}
