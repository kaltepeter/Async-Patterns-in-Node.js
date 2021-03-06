const { Worker, isMainThread } = require("worker_threads");

const firstWorker = new Worker("./threads.js");

const secondWorker = new Worker(`console.log('Do CPU instensive stuff here.')`, {
  eval: true,
});

if (isMainThread) {
  const thirdWorker = new Worker(__filename);
} else {
    // worker thread code goes here
}
