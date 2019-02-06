flow()


async function step1() {
    return new Promise((resolve, reject) => {
        resolve("test1")
    })
}
async function step2() {
    return new Promise((resolve, reject) => {
        reject("test1")
    })
}
async function step3() {
    return "test2"
}

async function flow() {
    let a
    let b
    let c
    try {
        a = await step1()
    }
    catch (e) {
        console.log("a:", e)
    }

    try {
        b = await step2()
    }
    catch (e) {
        console.log("b:", e)
    }

    try {
        c = await step3()
    }
    catch (e) {
        console.log("c:", e)
    }

    console.log("a-b-c", a, b, c)
}

