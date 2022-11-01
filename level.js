const doTask = (taskName) => {
    const begin=Date.now();
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            const end= Date.now();
            const timeSpent=(end-begin)+ "ms";
            console.log('\x1b[36m', "[TASK] FINISHED: " + taskName + " in " +
                timeSpent ,'\x1b[0m');
            resolve(true);
        },(Math.random()*200));
    });
}

async function init() {
    const totalTasks = 20;
    const maxConcurrentTasks = 4;
    const taskList = [...Array(totalTasks)].map(() =>
        [...Array(~~(Math.random() * 10 + 3))].map(() =>
            String.fromCharCode(Math.random() * (123 - 97) + 97)
        ).join(''))

    let currentTaskIndex = 0;
    let currentTasks = 0
    console.log("[init] Concurrency Algo Testing...")
    console.log("[init] Tasks to process: ", taskList.length)
    console.log("[init] Task list: " + taskList)
    console.log("[init] Maximum Concurrency: ", maxConcurrentTasks, "\n")

    const levelTasks = () => {
        if(currentTasks < maxConcurrentTasks) {
            for(let i = currentTasks; i < maxConcurrentTasks; i++) {
                if (currentTaskIndex < taskList.length) {
                    doTask(taskList[currentTaskIndex]).then(() => {
                        currentTasks -= 1
                        levelTasks()
                    })
                    currentTaskIndex += 1
                    currentTasks += 1
                    console.log(`[EXE] Concurrency : ${currentTasks}`)
                    console.log(`[EXE] Task count: ${currentTaskIndex} of ${taskList.length}`)
                }
            }
        }
    }

    await levelTasks()
}

init()